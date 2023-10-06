import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AdminService } from 'src/app/services/admin.service';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { TestService } from 'src/app/services/test.service';



//import for calendar end


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  leaveForm!: any;
  showAdminLeaveTable!: any;
  leaveAdminData!: any;
  noOfDaysInput: any;
  wfhForm!: any;
  showWfhTable: any;
  wfhData!: any;
  showAttTable: any;
  showAllAttTable: any;
  AttData: any;
  AllAttData: any;
  showTeamLeaveTable!: any;
  TeamLeaveData: any;
  showTeamWfhTable!: any;
  TeamWfhData: any;
  showAllEmloyeeTable: any;
  EmployeeData: any;
  item: any;
  passwordForm: any;              //for change password
  showAllWfhTable: any;           // for show all wfh
  AllwfhData: any;                //for show all wfh
  showAllLeaveTable: any;         //for show all leave
  leaveAllData: any;              //for show all leave
  // for profile modal start
  profileDetails: any;
  phonenumber: any;
  imageUrl: SafeUrl | undefined;
  public address: string = '';
  public birthDay: string = '';
  public maritalStatus: string = '';
  public bloodGroup: string = '';
  public skills: string = '';
  public emergencyContact: string = '';

  // for profile modal end

  // for update page start
  user: any = {                                              // Object to store the user registration data
    dateofjoining: new Date().toISOString().split('T')[0],  //bydefault show current date in date of joining

  };
  updateDetails: any;
  employeeId!: string;
  // date of birth select only 18 years old only start
  dobError: boolean = false;
  id: any;
  role: any;

  totalleaves: any;
  sickLeavesPerMonth: any;
  casualLeavesPerMonth: any;
  permissions: any;

  validateDateOfBirth() {
    const currentDate = new Date();
    const selectedDate = new Date(this.user.dob);
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    this.dobError = selectedDate > eighteenYearsAgo;
  }
  // date of birth select only 18 years old only end


  // email id error start
  emailError: boolean = false;
  emailErrorMessage: string = '';

  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const existingEmails = ['existing@email.com']; // Replace with your existing email check logic

    if (!emailRegex.test(this.user.emailid)) {
      this.emailError = true;
      this.emailErrorMessage = 'Please enter a valid email address.';
    } else if (existingEmails.includes(this.user.emailid)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email already exists. Please enter a different email address.';
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }
  //eamil id error end 

  token: string = ''; // Variable to store the token
  teamlead: string[] = [];
  designation: string[] = [];
  departments: string[] = [];

  // disable date from date of joining start
  getMinDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 4);
    const minDate = currentDate.toISOString().split('T')[0];
    return minDate;
  }
  getMaxDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 0);
    const maxDate = currentDate.toISOString().split('T')[0];
    return maxDate;
  }
  // disable date from date of joining end
 

  // change password validation start
  showNewPassword: boolean = false;
  showoldPassword: boolean = false;
  showconfirmPassword: boolean = false;

  
// change password validation end

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public loginService: LoginService, private sanitizer: DomSanitizer, public dashboardService: DashboardService, public adminService: AdminService, public RegisterAndUpdate: RegisterAndUpdateService, public testService: TestService) {
    //for change password start
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
    // for change password end


  }

  

  // for view employee list start
  isModalOpen = false; // Variable to track the modal state
  // for view employee list end

 

  ngOnInit() {
   
    this.getRemainingLeaves();
    this.getUserPhoto();              // for show employee photo when view by specific id
   
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      noOfDays: ['', [Validators.required, Validators.min(1)]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: [null, Validators.required], // Add the reason field with Validators.required
    });
    this.wfhForm = this.formBuilder.group({
      noofday: ['', [Validators.required, Validators.min(1)]],
      fromdateWfh: ['', Validators.required],
      toDateWfh: ['', Validators.required],
    });

    this.loginService.getPermission();
  }



  toggleoldPasswordVisibility(field: string) {
    if (field === 'oldPassword') {
      this.showoldPassword = !this.showoldPassword;
    }
  }
  togglenewPasswordVisibility(field: string) {
    if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    }
  }
  toggleoldCnfPasswordVisibility(field: string) {
    if (field === 'confirmPassword') {
      this.showconfirmPassword = !this.showconfirmPassword;
    }
  }



  // refresh the form after close start
  closeForm() {
    this.leaveForm.reset(); // Reset the form and clear the input fields
  }
  // refresh the form after close end


  // close leave list start
  closeAdminleavelist(): void {
    this.showAdminLeaveTable = false;
  }
  // close leave list end


  // close WFH list start
  closewfhlist(): void {
    this.showWfhTable = false;
  }
  // close WFH list end

  // close Att list start
  closeAttlist(): void {
    this.showAttTable = false;
  }
  // close Att list end



  // click on more button to go on employee panel div start
  scrollToSection() {
    const targetElement = document.getElementById('icon-grid');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // click on more button to go on employee panel div end





  //  start date will not select privious date from current date start
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString();
    let day = currentDate.getDate().toString();
    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  }
  //  start date will not select privious date from current date end


  // end date automatic set according to no. of days and satart date start
  updateEndDate(): void {
    const noOfDays = this.leaveForm.get('noOfDays').value;
    const fromDate = this.leaveForm.get('fromDate').value;
    const leaveType = this.leaveForm.get('leaveType').value;              //for set end date when select halfday
    const startDate = new Date(this.leaveForm.get('fromDate').value);     //for set end date when select halfday

    if (noOfDays && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + noOfDays - 1);
      this.leaveForm.get('toDate').setValue(this.formatDate(toDate));
    }

    //for set end date when select halfday
    if (leaveType === 'HALFDAY' && startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate()); // Calculate the previous date
      this.leaveForm.patchValue({ toDate: endDate.toISOString().split('T')[0] });
    }
    //for set end date when select halfday
  }

  



  calculateEndDate(): string {
    const noOfDays = this.leaveForm.get('noOfDays').value;
    const fromDate = this.leaveForm.get('fromDate').value;


    if (noOfDays && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + noOfDays);
      return this.formatDate(toDate);
    }

    return ''; // Return an empty string if either noOfDays or fromDate is not valid
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {                   //The padZero() method is another helper function to add a leading zero to single-digit numbers for proper date formatting.
    return num < 10 ? `0${num}` : `${num}`;
  }
  // end date automatic set according to no. of days and satart date end




  // WFH logic start

  // end date automatic set according to no. of days and satart date start
  updateWFHEndDate(): void {
    const noofday = this.wfhForm.get('noofday').value;
    const fromdateWfh = this.wfhForm.get('fromdateWfh').value;

    if (noofday && fromdateWfh) {
      const toDateWfh = new Date(fromdateWfh);
      toDateWfh.setDate(toDateWfh.getDate() + noofday - 1);
      this.wfhForm.get('toDateWfh').setValue(this.formatDate(toDateWfh));
    }
  }

  calculateWFHEndDate(): string {


    const noofday = this.wfhForm.get('noofday').value;
    const fromdateWfh = this.wfhForm.get('fromdateWfh').value;


    if (noofday && fromdateWfh) {

      const toDateWfh = new Date(fromdateWfh);
      toDateWfh.setDate(toDateWfh.getDate() + noofday);

      return this.formatDate(toDateWfh);
    }

    return ''; // Return an empty string if either noOfDays or fromDate is not valid
  }

  // WFH logic end


  //API for show leave remaining start
  getRemainingLeaves() {
   
    this.dashboardService.getShowData().subscribe(
      (response: any) => {
        this.profileDetails = response;
       
      },
      (error) => {
       
      }
    );
  }

  //API for show leave remaining end

  


  // API for alert box check-in-out start
 
  checkin() {
   
    this.adminService.performCheckin().subscribe(
      () => {
        Swal.fire('Checked-In!', 'You are Checked-in successfully!', 'success');
       
      },
      (error: any) => {
        if (error.status === 400) {
          Swal.fire('Error', 'Trying to Check-In again before Check-Out.', 'error');
        } else {
          Swal.fire('Error', 'An unknown error occurred.', 'error');
        }
       
      }
    );
  }




    checkout() {
    
    // Call the service method to perform check-out
    this.adminService.performCheckout().subscribe(
      () => {
        Swal.fire('Checked-Out!', 'You are Checked-out successfully!', 'success');
      },
      (error: any) => {
        if (error.status === 400) {
          Swal.fire('Error', 'Trying to Check-Out before checking in or after already checking out.', 'error');
        } else {
          Swal.fire('Error', 'An unknown error occurred.', 'error');
        }
       
      }
    );
  }

  // API for alert box check-in-out end


  
  // close team leave list start
  closeleavelist(): void {
    this.showTeamLeaveTable = false;
  }
  // close team leave list end

  
  // close team wfh list start
  closeteamWfhlist(): void {
    this.showTeamWfhTable = false;
  }
  // close team wfh list end



  
  signOut() {
    this.loginService.SignOut().subscribe(
      () => {
      
      },
      (error) => {
        // Handle any errors that occur during the logout process.
       
      }
    );
  }
  // API for logout end

  
 
  getUserPhoto(): void {
    this.loginService.getCurrentPhoto().subscribe(
      (response: Blob) => {
        const objectURL = URL.createObjectURL(response);
        this.imageUrl = objectURL;
      },
      (error) => {
       
        // Handle the error here
      }
    );
  }
  // API for current image end

}
function updateEmployee(employeeId: any, number: any) {
  throw new Error('Function not implemented.');
}


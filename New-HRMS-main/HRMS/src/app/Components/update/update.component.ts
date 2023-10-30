import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FormBuilder} from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';




@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });
  forthFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });
  @ViewChild('stepper') stepper!: MatStepper;                 // go to document step after register

  user: any = {                                              // Object to store the user registration data
    firstname: '',
        lastname: '',
        emailid: '',
        phonenumber: '',
        teamlead: '',
        dateofjoining:'',
        designation: '',
        dob: '',
        department: '',
        username: '',
        password: '',
        totalleaves: 0,
        totalwfh: '',
        sickLeavesPerMonth: '',
        casualLeavesPerMonth: '',
        role: '',
        address: '',
        emergencyContact: '',
        jobType: '',
        totalDaysOfProbation: '',
        startDateOfProbation:'',
        endDateOfProbation: '',
        modeOfWorking: '',
        shifttimingstart: '',
        shifttimingend:'',
        accountNumber:'',
        ifsccode:'',
        holderName:'',
        bankName:'',
        esicno:'',
        pfno:'',
        academicDocument1:'',
        academicDocument2:'',
        academicDocument3:'',
        academicDocument4:'',
        identityDocument1:'',
        identityDocument2:'',
        assetName:[]

  };
  // user: any = {                                              // Object to store the user registration data
  //   dateofjoining: new Date().toISOString().split('T')[0],   //bydefault show current date in date of joining
  //   firstname: '',
  //       lastname: '',
  //       emailid: '',
  //       phonenumber: '',
  //       teamlead: '',
        
  //       designation: '',
  //       dob: '',
  //       department: '',
  //       username: '',
  //       password: '',
  //       totalleaves: '',
  //       totalwfh: '',
  //       sickLeavesPerMonth: '',
  //       casualLeavesPerMonth: '',
  //       role: '',
  //       address: '',
  //       emergencyContact: '',
  //       jobType: '',
  //       totalDaysOfProbation: '',
  //       startDateOfProbation:'',
  //       endDateOfProbation: '',
  //       modeOfWorking: '',
  //       shifttimingstart: '',
  //       shifttimingend:'',
  //       accountNumber:'',
  //       ifsccode:'',
  //       holderName:'',
  //       bankName:'',
  //       esicno:'',
  //       pfno:'',
  //       userImage:'',
  //       academicDocument1:'',
  //       academicDocument2:'',
  //       academicDocument3:'',
  //       academicDocument4:'',
  //       aadharCard:'',
  //       panCard:'',
  //       signature:'',
  //       offerLetter:'',
  //       resignationLetter:'',
  //       apprisalLetter:'',
  //       salarySlip1:'',
  //       assetName:[]

  // };

  username: any;
  registerId: any;
  profileDetails: any;
  employeeId!: string;
  // date of birth select only 18 years old only start
  dobError: boolean = false;
  id: any;
  role: any;

  totalleaves: any;
  response: any;

  validateDateOfBirth() {
    const currentDate = new Date();
    const selectedDate = new Date(this.user.dob);
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    this.dobError = selectedDate > eighteenYearsAgo;
  }
  // date of birth select only 18 years old only end

  // duration of probation count total days start
  calculateTotalDays() {
    if (this.user.startDateOfProbation && this.user.endDateOfProbation) {
      const startDate = new Date(this.user.startDateOfProbation);
      const endDate = new Date(this.user.endDateOfProbation);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Adding 1 to include the start date
      this.user.totalDaysOfProbation = daysDifference;
    } else {
      this.user.totalDaysOfProbation = null;
    }
  }
   // duration of probation count total days end

   // ifsc code start
   invalidIFSC = false;
   validateIFSC() {
    const ifscPattern = /^[A-Z]{4}[0][0-9A-Z]{6}$/; // Regular expression for IFSC code

    if (!ifscPattern.test(this.user.ifsccode)) {
      this.invalidIFSC = true;
    } else {
      this.invalidIFSC = false;
    }
  }
   // ifsc code end

  

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

  imageUrl: SafeUrl | undefined;
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; 
  
  errorMessage: string = '';    // pdf error
   // Function to handle file input change
   DocumentUpload(event: Event, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      // Here you can perform file validation and other checks

      // Assign the selected file to the user object or form control
      this.user[controlName] = file;
    }
  }

  // Function to submit the form with file uploads

  token: string = ''; // Variable to store the token
  teamlead: string[] = [];

  departments: string[] = [];
  designations: string[] = [];
  constructor(private http: HttpClient, public loginService: LoginService, public RegisterAndUpdate: RegisterAndUpdateService, public dashboardService: DashboardService, private route: ActivatedRoute, public testService: TestService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.Getrole();
    this.EmployeeProfile(this.id);
    this.department();
    this.designation();
    this.teamLead();
    this.updatedData();
    

  }

  //API for getting teamlead start
  
  teamLead() {
    // Call the getTeamLeads function from the service to fetch team leads
    this.RegisterAndUpdate.getTeamLeads().subscribe(
      (response: any) => {
        this.teamlead = response;
      
        this.token = response.token;
      },
      (error) => {
        
      }
    );
  }
  //API for getting teamlead end

  //API for getting department start
 
  department() {

    this.RegisterAndUpdate.getdepartment().subscribe(
      (response: any) => {
        this.departments = response; // Assuming the API response is an array of team leads
     
        this.token = response.token;
      },
      (error) => {
      
      }
    );
  }
  //API for getting department end

  //API for getting designation start
 
  designation() {

    this.RegisterAndUpdate.getdesignation().subscribe(
      (response: any) => {
        this.designations = response; // Assuming the API response is an array of team leads
       
        this.token = response.token;
      },
      (error) => {
        
      }
    );
  }
  //API for getting designation end

  //API for getting role start
  
  Getrole() {

    this.RegisterAndUpdate.getrole().subscribe(
      (response: any) => {
        this.role = response; // Assuming the API response is an array of team leads
      
        this.token = response.token;
      },
      (error) => {
      
      }
    );

  }
  //API for getting role end


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


  // API for show user data automatic when update him start
  // availableAssetOptions: string[] = [
    
  //   'Laptop',
  //   'Laptop Charger',
  //   'Mouse',
  //   'Keyboard',
  //   'Phone',
  //   'Phone Charger',
  //   'Head Phone'
  // ];

 
  updatedData(): void {

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
     


      if (id) {
        // Use the 'id' variable to fetch data
        this.RegisterAndUpdate.fetchData(+id).subscribe(
          (response) => {
          
            // Handle the response and update the input fields accordingly
            this.user = response;
          this.username = response.username
this.registerId = response.id
console.log("id", this.registerId);
            console.log(";;;;;",this.user);
            
          },
          (error) => {
   
            // Handle the error here
          }
        );
      } else {
     
      }
    });
  
  }
  

  // API for show user data automatic when update him end

  // API for show user profile  when click on email id start

  
  EmployeeProfile(item: any): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      if (id) {
        // Use the 'id' variable to fetch data
        this.RegisterAndUpdate.empdetails(id).subscribe(
        (response: any) => {
          const dataArray = Object.values(response);
       
          const reversedData = dataArray.reverse();
         
                // Set the reversed array as the data source
                this.profileDetails = reversedData;
          
          },
          (error) => {
           
            // Handle the error here
          }
        );
      } else {
       
      }
    });
  }
 
  // API for show user profile  when click on email id end

  // API for update user details start
 
  updateEmployeeData(): void {
    this.route.queryParams.subscribe(params => {
      const employeeId = params['id'];
    
     
      if (employeeId) {
        // const data = {
        //   firstname: this.user.firstname,
        //   lastname: this.user.lastname,
        //   emailid: this.user.emailid,
        //   phonenumber: this.user.phonenumber,
        //   teamlead: this.user.teamlead,
        //   dateofjoining: this.user.dateofjoining,
        //   designation: this.user.designation,
        //   dob: this.user.dob,
        //   role: this.user.role,
        //   department: this.user.department,
        //   totalleaves: this.user.totalleaves,
        //   totalwfh: this.user.totalwfh,
        // };

        console.log("update>>>>>>", this.user);
        // Use the 'employeeId' variable to fetch data
        this.RegisterAndUpdate.updateEmployee(employeeId, this.user).subscribe(
          (response) => {
            Swal.fire('Update!', 'User Update successfully!', 'success')
              .then(() => {
                // Refresh page 
                // location.reload();
                // this.router.navigate(['/test', 'employee']);
                // this.testService.getEmployeeList();
                // Move to the next step
this.stepper.next(); // Move to the next step
              });
       console.log("updated", response);
          },
          error => {
            // Handle the error if the API request fails
   
            // Add any error handling logic you need
          }
        );
      } else {
   
      }
    });
  }
  
  // API for update user details end

  // Function to submit the form with file uploads
  
  submitForm() {
    // Create a FormData object to send files to the server
    const formData = new FormData();
   
    // Append the selected files to the FormData object
    formData.append('username', this.username);
    formData.append('academicDocument1', this.user.academicDocument1);
    formData.append('academicDocument2', this.user.academicDocument2);
    formData.append('academicDocument3', this.user.academicDocument3);
    formData.append('academicDocument4', this.user.academicDocument4);
    formData.append('signature', this.user.signature);
    formData.append('aadharCard', this.user.aadharCard);
    formData.append('panCard', this.user.panCard);
    formData.append('offerLetter', this.user.offerLetter);
    formData.append('resignationLetter', this.user.resignationLetter);
    formData.append('apprisalLetter', this.user.apprisalLetter);
    formData.append('salarySlip1', this.user.salarySlip1);
    formData.append('salarySlip2', this.user.salarySlip2);
    formData.append('salarySlip3', this.user.salarySlip3);
    formData.append('userImage', this.user.userImage);
  

    // Make an HTTP POST request to the API endpoint
    this.RegisterAndUpdate.uploadDocs(formData, this.registerId).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'File Upload',
          text: 'File Upload Successfully',
        })
        // Move to the next step
this.stepper.next(); // Move to the next step
        console.log('Files uploaded successfully:', response);
      },
      (error) => {
        // Handle error
        console.error('Error uploading files:', error);
      }
    );
  }
  
}



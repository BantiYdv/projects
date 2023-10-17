import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';





@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
 
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
  };

  profileDetails: any;
  employeeId!: string;
  // date of birth select only 18 years old only start
  dobError: boolean = false;
  id: any;
  role: any;

  totalleaves: any;

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

  departments: string[] = [];
  designations: string[] = [];
  constructor(private http: HttpClient, public loginService: LoginService, public RegisterAndUpdate: RegisterAndUpdateService, public dashboardService: DashboardService, private route: ActivatedRoute, public testService: TestService, private router: Router) { }

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

  

  updatedData(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      if (id) {
        // Use the 'id' variable to fetch data
        this.RegisterAndUpdate.fetchData(+id).subscribe(
          (response) => {
          
            // Handle the response and update the input fields accordingly
            this.user = response;
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
                this.router.navigate(['/test', 'employee']);
                this.testService.getEmployeeList();
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
  
}



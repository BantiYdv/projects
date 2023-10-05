



import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent {
  user: any = {                                              // Object to store the user registration data
    dateofjoining: new Date().toISOString().split('T')[0],   //bydefault show current date in date of joining
    designation: ''
  };
  // @ViewChild('designationInput') designationInput: ElementRef | undefined;
  @ViewChild('designationInput') designationInput: any;
  @ViewChild('departmentInput') departmentInput: any;
  // date of birth select only 18 years old only start
  dobError: boolean = false;
  // router: any;
  isLoading = false;

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
    const existingEmails = ['']; // Replace with your existing email check logic


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
  role: string[] = [];
  // designation: any;
  designation: string[] = [];
  designationControl = new FormControl();
  // departments: string[] = [];
  // designationControl = new FormControl();
  userForm: FormGroup;
  constructor(private http: HttpClient, public loginService: LoginService,public RegisterAndUpdate: RegisterAndUpdateService, private router: Router) { 
    this.userForm = new FormGroup({
      designation: new FormControl('')
    });
  }


  //API for getting teamlead start
  ngOnInit() {
    
    this.Getrole();
   this.teamLead();
this.designations();
this.department();
  }

  //API for getting teamlead start

teamLead() {
  // Call the getTeamLeads function from the service to fetch team leads
  this.RegisterAndUpdate.getTeamLeads().subscribe(
    (response: any) => {
      this.teamlead = response;
      console.log('Team lead:', this.teamlead);
      this.token = response.token;
    },
    (error) => {
      console.error('Failed to fetch team leads:', error);
    }
  );
}
//API for getting teamlead end

//API for getting designation start

designations(){
 
  this.RegisterAndUpdate.getdesignation().subscribe(
      (response: any) => {
        this.designation = response; // Assuming the API response is an array of team leads
        console.log('Designation:', this.designation);
        this.token = response.token;
      },
      (error) => {
        console.error('Failed to fetch designation:', error);
      }
    );
}
//API for getting designation end
selectedDepartment: string = '';

departments: string[] = []; // Existing departments from API
  filteredDepartments: string[] = []; // Filtered departments for autocomplete
  departmentControl = new FormControl('');
//API for getting department start

department(){
 
  this.RegisterAndUpdate.getdepartment().subscribe(
      (response: any) => {
        this.departments = response; // Assuming the API response is an array of team leads
        console.log('Department:', this.departments);
        this.token = response.token;
      },
      (error) => {
        console.error('Failed to fetch Department:', error);
      }
    );
}
//API for getting department end


//API for getting role start

Getrole() {
 
  this.RegisterAndUpdate.getrole().subscribe(
      (response: any) => {
        this.role = response; // Assuming the API response is an array of team leads
        console.log('Role:', this.role);
        this.token = response.token;
      },
      (error) => {
        console.error('Failed to fetch team leads:', error);
      }
    );

}
//API for getting role end


onSubmit() {
  this.isLoading = true;
  console.log(">>>>>>>>>>>>>>>>",this.user);

  const registrationData = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        emailid: this.user.emailid,
        phonenumber: this.user.phonenumber,
        teamlead: this.user.teamlead,
        dateofjoining: this.user.dateofjoining,
        designation: this.designationInput.nativeElement.value,
        dob: this.user.dob,
        department: this.departmentInput.nativeElement.value,
        username: this.user.username,
        password: this.user.password,
        totalleaves: this.user.totalleaves,
        totalwfh: this.user.totalwfh,
        sickLeavesPerMonth: this.user.totalleaves / 2,
        casualLeavesPerMonth: this.user.totalleaves / 2,
        role: this.user.role,
        permissions: this.user.role.permissions
      };
     

  this.RegisterAndUpdate.registerUser(registrationData).subscribe(
    (response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: 'New User Registered Successfully',
      }).then(() => {
        const role = localStorage.getItem("role");
        if (role === "SUPERADMIN") {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/admin']);
        }
      });
      console.log("user data", response);
      this.isLoading = false;
    },
    (error) => {
      
        Swal.fire('Error', error.error, 'error');
        console.log("error signup", error);
       
        this.isLoading = false;
    }
  );
}
  getMaxDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 0);
    const maxDate = currentDate.toISOString().split('T')[0];
    return maxDate;
  }
  // disable date from date of joining end



}


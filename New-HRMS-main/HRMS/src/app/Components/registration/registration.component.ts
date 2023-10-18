
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent {
  
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


  user: any = {                                              // Object to store the user registration data
    dateofjoining: new Date().toISOString().split('T')[0],   //bydefault show current date in date of joining
    firstname: '',
        lastname: '',
        emailid: '',
        phonenumber: '',
        teamlead: '',
        
        designation: '',
        dob: '',
        department: '',
        username: '',
        password: '',
        totalleaves: '',
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


  };
  
  


  // date of birth select only 18 years old only start
  dobError: boolean = false;
  // router: any;
  // isLoading = false;

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

  
  // email id error end 

  token: string = ''; // Variable to store the token
  teamlead: string[] = [];
  role: string[] = [];
  // designation: any;
  designation: string[] = [];
  designationControl = new FormControl();
  // departments: string[] = [];
  // designationControl = new FormControl();
  userForm: FormGroup;
  constructor(private http: HttpClient, public loginService: LoginService,public RegisterAndUpdate: RegisterAndUpdateService, private router: Router, public testService: TestService, private _formBuilder: FormBuilder) { 
    this.userForm = new FormGroup({
      designation: new FormControl('')
    });
  }
  
  errorMessage: string = '';    // pdf error

  // upload pdf file formate start
handleFileInput(event: any) {
  const allowedExtensions = ['pdf', 'doc', 'docx'];
  const file = event.target.files[0];
  
  if (file) {
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop();

    if (extension && !allowedExtensions.includes(extension)) {
      // Display an error message
      this.errorMessage = 'Invalid file format. Please choose a PDF, DOC, or DOCX file.';
      
      // Clear the file input field
      event.target.value = null;
    } else {
      // Clear the error message if a valid file is selected
      this.errorMessage = '';
    }
  }
}
// upload pdf file formate end

  //API for getting teamlead start
  ngOnInit() {
    
    this.Getrole();
   this.teamLead();
this.designations();
this.department();
  }

  // email id already exist error start
  validateEmail() {
   
    this.testService.getEmployeeList().subscribe(
      (response: any) => {
        const existingEmails = response.map((employee: any) => employee.emailid);
        console.log("exist emails", existingEmails);

        if (existingEmails.includes(this.user.emailid)) {
          
          this.emailError = true;
          console.log("email error is true",this.emailError);
          this.emailErrorMessage = 'Email already exists. Please enter a different email address.';
        } else {
          this.emailError = false;
          this.emailErrorMessage = '';
          console.log("email error is false",this.emailError);
        }
        
        console.log("email error message", this.emailErrorMessage);
      },
      (error) => {
        console.error('Error fetching employee list:', error);
        // Handle the error as needed
      }
    );
  }
 
  
  // email id already exist error end
  
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

//API for getting designation start

designations(){
 
  this.RegisterAndUpdate.getdesignation().subscribe(
      (response: any) => {
        this.designation = response; // Assuming the API response is an array of team leads
       
        this.token = response.token;
      },
      (error) => {
       
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
       
        this.token = response.token;
      },
      (error) => {
       
      }
    );
}
//API for getting department end


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


onSubmit() {
  // this.isLoading = true;
  
 console.log("<<<<<<user>>>>>", this.user);
 
  
  this.RegisterAndUpdate.registerUser(this.user).subscribe(
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
     console.log("registered", response);
      // this.isLoading = false;
    },
    (error) => {
      
        Swal.fire('Error', error.error, 'error');
      
       
        // this.isLoading = false;
    }
  );


  
}

// disable date from date of joining start
  getMaxDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 0);
    const maxDate = currentDate.toISOString().split('T')[0];
    return maxDate;
  }
  // disable date from date of joining end



}


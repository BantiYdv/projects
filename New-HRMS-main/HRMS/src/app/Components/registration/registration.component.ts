
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { SafeUrl } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import * as saveAs from 'file-saver';




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
    // thirdCtrl: ['', Validators.required],
  });
  forthFormGroup = this._formBuilder.group({
    // forthCtrl: ['', Validators.required],
  });
  @ViewChild('stepper') stepper!: MatStepper;                 // go to document step after register


  // mandatory fields start
  showErrorAlert: boolean = false; // Flag to control error alert

  validateFields() {
    const mandatoryFields = ['firstname', 'lastname', 'gender', 'emailid', 'phonenumber', 'address', 'emergencyContact', 'dob', 'dateofjoining', 'role'];

    // Check if any mandatory field is empty
    const emptyFields = mandatoryFields.filter(field => !this.user[field]);

    if (emptyFields.length > 0) {
      alert('Mandatory fields are required. Please fill in all mandatory fields.');
    } else {
      this.stepper.next(); // Move to the next step if all mandatory fields are filled
      this.firstFormGroup;
    }
  }
  // mandatory fields end
  

  user: any = {                                              // Object to store the user registration data
    dateofjoining: new Date().toISOString().split('T')[0],   //bydefault show current date in date of joining
    firstname: '',
    lastname: '',
    gender:'',
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
    startDateOfProbation: '',
    endDateOfProbation: '',
    modeOfWorking: '',
    shifttimingstart: '',
    shifttimingend: '',
    accountNumber: '',
    ifsccode: '',
    holderName: '',
    bankName: '',
    esicno: '',
    pfno: '',
    userImage: '',
    academicDocument1: '',
    academicDocument2: '',
    academicDocument3: '',
    academicDocument4: '',
    aadharCard: '',
    panCard: '',
    signature: '',
    offerLetter: '',
    RelievingLetter: '',
    ExperienceLetter: '',
    salarySlip1: '',
    assetName: []
    
  };

 
  imageUrl: SafeUrl | undefined;
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';


  
  username: any;
  registerId: any;

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

  // yyyy is not exeed 4 digit start
  onDateInput(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); // Limit the input length to 10 characters (yyyy-mm-dd)
    }
  }
  // yyyy is not exeed 4 digit end

  // email id error start
  emailError: boolean = false;
  emailErrorMessage: string = '';


  // email id error end 
  isLoading = false;   // for loader
  token: string = ''; // Variable to store the token
  teamlead: string[] = [];
  role: string[] = [];
  // designation: any;
  designation: string[] = [];
  designationControl = new FormControl();
  // departments: string[] = [];
  // designationControl = new FormControl();
  userForm: FormGroup;

  currentDate: string;    // set probation start date


  constructor(private http: HttpClient, public loginService: LoginService, public RegisterAndUpdate: RegisterAndUpdateService, private router: Router, public testService: TestService, private _formBuilder: FormBuilder) {
    this.userForm = new FormGroup({
      designation: new FormControl(''),

    });
    this.currentDate = new Date().toISOString().split('T')[0]; // set probation start date

  }

  // set probation start date according to date of joining start
  syncProbationStartDate() {
    // Synchronize Probation start date with Date of joining
    this.user.startDateOfProbation = this.user.dateofjoining;
  }
  // set probation start date according to date of joining end

  // duration of probation count total days start
  // calculateTotalDays() {
  //   if (this.user.startDateOfProbation && this.user.endDateOfProbation) {
  //     const startDate = new Date(this.user.startDateOfProbation);
  //     const endDate = new Date(this.user.endDateOfProbation);
  //     const timeDifference = endDate.getTime() - startDate.getTime();
  //     const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Adding 1 to include the start date
  //     this.user.totalDaysOfProbation = daysDifference;
  //   } else {
  //     this.user.totalDaysOfProbation = null;
  //   }
  // }

  updateEndDate() {
    if (this.user.totalDaysOfProbation && this.user.startDateOfProbation) {
      const startDate = new Date(this.user.startDateOfProbation);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + this.user.totalDaysOfProbation);
      this.user.endDateOfProbation = endDate.toISOString().split('T')[0]; // Set end date in ISO format (YYYY-MM-DD)
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
          console.log("email error is true", this.emailError);
          this.emailErrorMessage = 'Email already exists. Please enter a different email address.';
        } else {
          this.emailError = false;
          this.emailErrorMessage = '';
          console.log("email error is false", this.emailError);
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

  designations() {

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
    this.isLoading = true;

    console.log("<<<<<<user>>>>>", this.user);

    // Check if this.user.assetName is an array before using join
    if (Array.isArray(this.user.assetName)) {
      this.user.assetName = this.user.assetName.join(', ');
    }

    this.RegisterAndUpdate.registerUser(this.user).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          text: 'New User Registered Successfully',
        })
        console.log("registered", response);

        this.username = response.username
        this.registerId = response.id
        console.log("user name", this.username);
        this.isLoading = false;

        // Move to the next step
        this.stepper.next(); // Move to the next step

      },
      (error) => {

        Swal.fire('Error', error.error, 'error');


        this.isLoading = false;
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


  // API for upload PDF start


  // DocumentUpload(event: any) {
  //   const file = event.target.files[0]; // Get the selected file (assuming single selection)
  //   if (file && file.type === 'application/pdf') {
  //     this.RegisterAndUpdate.uploadDocs(file);
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Can not uploaded!',
  //       text: 'Please select a valid PDF file.',
  //     });

  //   }
  // }
  // API for upload PDF end

  // Function to handle file input change
  // DocumentUpload(event: Event, controlName: string) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     // Here you can perform file validation and other checks

  //     // Assign the selected file to the user object or form control
  //     this.user[controlName] = file;
  //   }
  // }

  // Initialize errorMessage as an empty string in your component


  errorMessages: { [key: string]: string } = {};


  DocumentUpload(event: Event, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files && inputElement.files.length > 0 ? inputElement.files[0] : null;

    // Check if the file type is 'application/pdf'
    const isPDF = file && file.type === 'application/pdf';

    // Check if the file type is 'image/png'
    const isPNG = file && file.type === 'image/png';

    const isFileSizeValid = file && file.size <= 5 * 1024 * 1024 && file.size >= 20 * 1024;

    if ((controlName === 'signature' || controlName === 'userImage') && isPDF) {
      this.errorMessages[controlName] = "Please upload a PNG file.";
      inputElement.value = ''; // Clear the input field
      this.user[controlName] = null; // Clear the user data for this field
    } else if ((controlName !== 'signature' && controlName !== 'userImage') && isPNG) {
      this.errorMessages[controlName] = "Please upload a PDF file.";
      inputElement.value = ''; // Clear the input field
      this.user[controlName] = null; // Clear the user data for this field
    } else if (!isPDF && !isPNG || !isFileSizeValid) {
      if (!isPDF && !isPNG) {
        this.errorMessages[controlName] = "Please upload a valid file.";
      } else {
        this.errorMessages[controlName] = "Please upload a PDF file below 5MB and up to 20KB.";
      }
      inputElement.value = ''; // Clear the input field
      this.user[controlName] = null; // Clear the user data for this field

    } else {
      this.errorMessages[controlName] = ''; // Clear the error message
      this.user[controlName] = file; // Assign the selected file to the user object or form control
    }
  }










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
    formData.append('RelievingLetter', this.user.RelievingLetter);
    formData.append('ExperienceLetter', this.user.ExperienceLetter);
    formData.append('salarySlip1', this.user.salarySlip1);
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


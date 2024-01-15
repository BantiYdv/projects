import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, NgModel } from '@angular/forms';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { SafeUrl } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import { CountryCodeService } from 'src/app/services/country-code.service';

export interface AssetData {
  laptopModelInfo: string;
  identification: string;
  configuration: string;
  useHistory: string;
  description: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
[x: string]: any;
  @ViewChild('firstnameInput') firstnameInput: NgModel | any;
  @ViewChild('lastnameInput') lastnameInput: NgModel | any;
  @ViewChild('emailidInput') emailidInput: NgModel | any;
  @ViewChild('genderInput') genderInput: NgModel | any;
  @ViewChild('dobInput') dobInput: NgModel | any;
  @ViewChild('roleInput') roleInput: NgModel | any;
  @ViewChild('phonenumberInput') phonenumberInput: NgModel | any;
  @ViewChild('dateofjoiningInput') dateofjoiningInput: NgModel | any;
  @ViewChild('totalDaysOfProbationInput') totalDaysOfProbationInput:
    | NgModel
    | any;

  currentStep: number = 1;
  academicDocument1: any;
  countries: any[] = [];
  selectedCountryPhoneNo: string = 'IN';
  selectedCountryEmergencyNo: string = 'IN';
  flagSvgUrlPhoneNo: any;
  flagSvgUrlEmergencyNo: any;
  selectedFileName: any;
  selectedAssets: string[] = [];
  // assetDetailsList: { [key: string]: AssetData } = {};
  assetDetailsList: AssetData[] = [];
  activeSlideIndex = 0;

  assetDataListqw() {
    console.log('assetDetailsList', this.assetDetailsList);
  }
  address: {
    addressLine1: string;
    addressLine2: string;
    state_country: string;
    postalCode: string;
  } = {
    addressLine1: '',
    addressLine2: '',
    state_country: '',
    postalCode: '',
  };

  assetOptions = ['Laptop', 'Desktop', 'Monitor'];
  // saveAssetData(assetType: any, assetData: AssetData) {
  //   this.assetDetailsList[assetType] = assetData;
  //   console.log('Saved data for', this.assetDetailsList);
  // }
  saveAssetData( AssetData: any) {
    this.assetDetailsList.push(AssetData);
    console.log('Saved data for', this.assetDetailsList);
  }

//   add more assets start
  isEditMode = false;
  editedValue: any; // Modify the type accordingly
  enterEditMode() {
    this.isEditMode = true;
    this.editedValue = this.selectedAssets.join(', '); // You can modify this based on your requirements
  }

  saveDetails() {
    if (this.isEditMode) {
      // Save the edited value to assetOptions
      this.assetOptions.push(this.editedValue);

      // Reset the input field and exit edit mode
      this.selectedAssets = this.editedValue.split(', ').map((option: string) => option.trim());
      this.isEditMode = false;
    }
  }
  //   add more assets end

 
  onSelectedAssetsChange() {
    this.activeSlideIndex = 0;
  }

  getAssetData(AssetData: any): AssetData {
    if (!this.assetDetailsList[AssetData]) {
      this.assetDetailsList[AssetData] = {
        laptopModelInfo: '',
        identification: '',
        configuration: '',
        useHistory: '',
        description: '',
      };
    }
// console.log("asset data", this.assetDetailsList[assetType]);
    return this.assetDetailsList[AssetData];
    
  }

  numberCode(): void {
    this.countries = this.countryCode.countryCode();
  }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      if (this.isPDFFile(selectedFile)) {
        this.selectedFileName = selectedFile.name;
      } else {
        this.selectedFileName = 'Invalid file type. Please select a PDF file.';
        fileInput.value = '';
      }
    } else {
      this.selectedFileName = 'No file selected';
    }
  }
  isPDFFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  firstFormGroup = this._formBuilder.group({
  });
  secondFormGroup = this._formBuilder.group({
  });
  thirdFormGroup = this._formBuilder.group({
  });
  forthFormGroup = this._formBuilder.group({
  });
  @ViewChild('stepper') stepper!: MatStepper;

  showErrorAlert: boolean = false;

  validateFields() {
    const mandatoryFields = [
      'firstname',
      'lastname',
      'gender',
      'emailid',
      'phonenumber',
      'dob',
      'dateofjoining',
      'totalDaysOfProbation',
      'role',
    ];
    console.log('users => ', this.user);
    const emptyFields = mandatoryFields.filter((field) => !this.user[field]);
    console.log('emptyFields', emptyFields);

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all details(*).',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
      });
      if (!this.user.firstname) {
        this.firstnameInput.control.markAsTouched();
      }
      if (!this.user.lastname) {
        this.lastnameInput.control.markAsTouched();
      }
      if (!this.user.emailid) {
        this.emailidInput.control.markAsTouched();
      }
      if (!this.user.gender) {
        this.genderInput.control.markAsTouched();
      }
      if (!this.user.dob) {
        this.dobInput.control.markAsTouched();
      }
      if (!this.user.role) {
        this.roleInput.control.markAsTouched();
      }
      if (!this.user.phonenumber) {
        this.phonenumberInput.control.markAsTouched();
      }
      if (!this.user.dateofjoining) {
        this.dateofjoiningInput.control.markAsTouched();
      }
      if (!this.user.totalleaves) {
        this.totalDaysOfProbationInput.control.markAsTouched();
      }
    } else {
      this.nextStep(); 
      this.firstFormGroup;
    }
  }

  user: any = {
    dateofjoining: new Date().toISOString().split('T')[0], 
    firstname: '',
    lastname: '',
    gender: '',
    emailid: '',
    phonenumber: '',
    countryCode: this.selectedCountryPhoneNo,
    teamlead: '',
    paternity: '',
    maternity: '',
    designation: '',
    dob: '',
    department: '',
    username: '',
    password: '',
    totalleaves: '',
    totalwfh: '' || 0,
    sickLeavesPerMonth: '',
    casualLeavesPerMonth: '',
    role: '',
    addressLine1:  this.address.addressLine1,
    addressLine2: this.address.addressLine2, 
    state_country:  this.address.state_country, 
    postalCode: this.address.postalCode,
    emergencyContact: '',
    emergencyNumberCountryCode: this.selectedCountryEmergencyNo,
    jobType: '',
    totalDaysOfProbation: '',
    startDateOfProbation: new Date().toISOString().split('T')[0],
    endDateOfProbation: '',
    modeOfWorking: '',
    shiftTime: '',
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
    // assetDetailsMap: this.assetDetailsList,   
    assetDetailsList: this.assetDetailsList,   
  };

  imageUrl: SafeUrl | undefined;
  defaultImageURL: string =
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  username: any;
  registerId: any;
  dobError: boolean = false;

  validateDateOfBirth() {
    const currentDate = new Date();
    const selectedDate = new Date(this.user.dob);
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    this.dobError = selectedDate > eighteenYearsAgo;
  }

  formatDOB(): string {
    const date = new Date(this.user.dob);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  onDateInput(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); 
    }
  }

  emailError: boolean = false;
  emailErrorMessage: string = '';

  calculateTotalLeaves() {
    const sickLeaves = parseInt(this.user.sickLeavesPerMonth, 10) || 0;
    const casualLeaves = parseInt(this.user.casualLeavesPerMonth, 10) || 0;

    this.user.totalleaves = sickLeaves + casualLeaves;
  }

  isLoading = false; 
  token: string = ''; 
  teamlead: any[]= [];
  role: string[] = [];
  shiftTime: string[] = [];
  designation: string[] = [];
  designationControl = new FormControl();
  userForm: FormGroup;

  currentDate: string; 

  constructor(
    private http: HttpClient,
    public loginService: LoginService,
    public RegisterAndUpdate: RegisterAndUpdateService,
    private router: Router,
    public testService: TestService,
    private _formBuilder: FormBuilder,
    private countryCode: CountryCodeService
  ) {
    this.userForm = new FormGroup({
      designation: new FormControl(''),
    });
    this.currentDate = new Date().toISOString().split('T')[0]; 
  }

  syncProbationStartDate() {
    this.user.startDateOfProbation = this.user.dateofjoining;
  }
  updateEndDate() {
    if (this.user.totalDaysOfProbation && this.user.startDateOfProbation) {
      const startDate = new Date(this.user.startDateOfProbation);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + this.user.totalDaysOfProbation);
      this.user.endDateOfProbation = endDate.toISOString().split('T')[0]; // Set end date in ISO format (YYYY-MM-DD)
    } else {
      this.user.endDateOfProbation = '';
    }
  }

  invalidIFSC = false;
  validateIFSC() {
    const ifscPattern = /^[A-Z]{4}[0][0-9A-Z]{6}$/;

    if (!ifscPattern.test(this.user.ifsccode)) {
      this.invalidIFSC = true;
    } else {
      this.invalidIFSC = false;
    }
  }

  errorMessage: string = ''; 
  ngOnInit() {
    this.numberCode();
    this.Getrole();
    this.teamLead();
    this.designations();
    this.department();
    this. getShiftTime();
  }

  validateEmail() {
    this.testService.getEmployeeList().subscribe(
      (response: any) => {
        const existingEmails = response.map(
          (employee: any) => employee.emailid
        );
        console.log('exist emails', existingEmails);

        if (existingEmails.includes(this.user.emailid)) {
          this.emailError = true;
          console.log('email error is true', this.emailError);
          this.emailErrorMessage =
            'Email already exists. Please enter a different email address.';
        } else {
          this.emailError = false;
          this.emailErrorMessage = '';
          console.log('email error is false', this.emailError);
        }

        console.log('email error message', this.emailErrorMessage);
      },
      (error) => {
        console.error('Error fetching employee list:', error);
      }
    );
  }


  teamLead() {
    this.RegisterAndUpdate.getTeamLeads().subscribe(
      (response: any) => {
        this.teamlead = response;

        this.token = response.token;
        console.log("team lead", response);
      },
      (error) => {}
    );
  }

  designations() {
    this.RegisterAndUpdate.getdesignation().subscribe(
      (response: any) => {
        this.designation = response; 

        this.token = response.token;
      },
      (error) => {}
    );
  }
  selectedDepartment: string = '';

  departments: string[] = []; 
  filteredDepartments: string[] = []; 
  departmentControl = new FormControl('');


  department() {
    this.RegisterAndUpdate.getdepartment().subscribe(
      (response: any) => {
        this.departments = response; 

        this.token = response.token;
      },
      (error) => {}
    );
  }


  //API for getting role start

  Getrole() {
    this.RegisterAndUpdate.getrole().subscribe(
      (response: any) => {
        this.role = response; 

        this.token = response.token;

      },
      (error) => {}
    );
  }
  //API for getting role end

    //API for getting shift time start

    getShiftTime() {
      this.RegisterAndUpdate.viewShift().subscribe(
        (response: any) => {
          this.shiftTime = response; 
  
          this.token = response.token;
          console.log("get shift", response)
        },
        (error) => {}
      );
    }
    //API for getting shift time end

  onSubmit() {
    this.isLoading = true;

    console.log('<<<<<<user>>>>>', this.user);

    if (Array.isArray(this.user.assetName)) {
      this.user.assetName = this.user.assetName.join(', ');
    }
this.user.dob = this.formatDOB();
    this.RegisterAndUpdate.registerUser(this.user).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          text: 'New User Registered Successfully',
        }).then(() => this.nextStep());
        console.log('registered', response);

        this.username = response.username;
        this.registerId = response.id;
        console.log('user name', this.username);
        this.isLoading = false;

        this.stepper.next(); 
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

  errorMessages: { [key: string]: string } = {};

  DocumentUpload(event: Event, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    const file =
      inputElement.files && inputElement.files.length > 0
        ? inputElement.files[0]
        : null;

    const isPDF = file && file.type === 'application/pdf';

    const isPNG = file && file.type === 'image/png';

    const isFileSizeValid =
      file && file.size <= 5 * 1024 * 1024 && file.size >= 20 * 1024;

    if ((controlName === 'signature' || controlName === 'userImage') && isPDF) {
      this.errorMessages[controlName] = 'Please upload a PNG file.';
      inputElement.value = ''; 
      this.user[controlName] = null; 
    } else if (
      controlName !== 'signature' &&
      controlName !== 'userImage' &&
      isPNG
    ) {
      this.errorMessages[controlName] = 'Please upload a PDF file.';
      inputElement.value = ''; 
      this.user[controlName] = null; 
    } else if ((!isPDF && !isPNG) || !isFileSizeValid) {
      if (!isPDF && !isPNG) {
        this.errorMessages[controlName] = 'Please upload a valid file.';
      } else {
        this.errorMessages[controlName] =
          'Please upload a PDF file below 5MB and up to 20KB.';
      }
      inputElement.value = ''; 
      this.user[controlName] = null; 
    } else {
      this.errorMessages[controlName] = ''; 
      this.user[controlName] = file; 
    }
  }


  submitForm() {
    const formData = new FormData();

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

    this.RegisterAndUpdate.uploadDocs(formData, this.registerId).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'File Upload',
          text: 'File Upload Successfully',
        }).then(() => this.nextStep());
        this.stepper.next(); 
        console.log('Files uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }
}

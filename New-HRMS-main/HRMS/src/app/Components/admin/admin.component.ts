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
import { ProfileService } from 'src/app/services/profile.service';
import * as moment from 'moment';



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
  fillterWfhData: any;
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
  getHolidayData: any;
  // fillterGetHoliday: any;
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

  


  // selectedRating: number = 4;
  // stars: number[] = [0, 1, 2, 3, 4];

  // rateStar(index: number) {
  //   this.selectedRating = index + 1;
  // }

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public loginService: LoginService, private sanitizer: DomSanitizer, public dashboardService: DashboardService, public adminService: AdminService, public RegisterAndUpdate: RegisterAndUpdateService, public testService: TestService, public profileService: ProfileService) {
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

  checkedIn: boolean = false;
  checkedOut: boolean = false;

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


// check in and check out start

    // check in and check out end
    // this.viewattendance();
    this.currentDate = moment();
    this.generateCalendar();
    // this.toggleWfhTable();
    this.totalLeaveUser();
    this.remainingLeaveUser();
  this.takenLeaveUser();
    this.totalWfhUser();
    this.remainingWfhUser();
  this.takenWfhUser();
  this.birthdayUser();
  this.getHoliday();
  this.TodayAndUpcomingHolidays();
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

// for getting isCheckedOut variable start 
// viewattendance() {

//     this.testService.getAttendance().subscribe(
//       (response: any) => {
//        const checkIn = response
       
//         this.isCheckedOut = checkIn[checkIn.length-1].userChecked;
//         this.isCheckDate = this.todayDate();
//         this.todayDate();
//         console.log("checkin-out", this.isCheckedOut);
//         console.log("checkin att", response);
//       },
//       error => {
//         Swal.fire('Error', error.error, 'error');
       
//       }
//     );
  
// }
  // for getting isCheckedOut variable end 
  // isCheckedOut: any;
  // isCheckDate: any
// todayDate(){
//   const date = new Date();
//   this.testService.getAttendance().subscribe(
//     (response: any) => {
//      const lastDate = response
     
//       this.isCheckedOut = lastDate[lastDate.length-1].checkDate;
//       console.log("last date", lastDate);
//     });
//     const checkValidate = date == this.isCheckedOut;
//     return checkValidate;
// }
  // API for alert box check-in-out start
  startTime: string = '00:00:00';
  timerInterval: any;

  checkin() {
    this.startTime = '00:00:00';
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
    this.adminService.performCheckin().subscribe(
      () => {
        
        Swal.fire('Checked-In!', 'You are Checked-in successfully!', 'success');
        // this.viewattendance();
      },
      (error: any) => {
       
        Swal.fire('Error', error.error, 'error');
      }
    );
  }

  updateTimer() {
    // Update the startTime to the next second
    const timeArray = this.startTime.split(':').map(Number);
    const totalSeconds = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2] + 1;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.startTime = `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  
  




    checkout() {
    
    // Call the service method to perform check-out
    this.adminService.performCheckout().subscribe(
      () => {
        
        Swal.fire('Checked-Out!', 'You are Checked-out successfully!', 'success');
        // this.viewattendance();
      },
      (error: any) => {
       Swal.fire('Error', error.error, 'error');
       
      }
    );
  }

  // API for alert box check-in-out end
  // isCheckedOut: boolean = false;

  // viewattendance() {
  //   this.testService.getAttendance().subscribe(
  //     (response: any) => {
  //       const checkIn = response;
  //       this.isCheckedOut = checkIn[checkIn.length - 1].userChecked;
  //       // this.isCheckDate = this.todayDate();
  //       console.log("checkin-out", this.isCheckedOut);
  //       console.log("checkin att", response);
  //     },
  //     (error) => {
  //       Swal.fire('Error', error.error, 'error');
  //     }
  //   );
  // }
  
  // checkin() {
  //   this.adminService.performCheckin().subscribe(
  //     () => {
  //       Swal.fire('Checked-In!', 'You are Checked-in successfully!', 'success');
  //       this.isCheckedOut = true;
  //     },
  //     (error: any) => {
  //       Swal.fire('Error', error.error, 'error');
  //     }
  //   );
  // }
  
  // checkout() {
  //   this.adminService.performCheckout().subscribe(
  //     () => {
  //       Swal.fire('Checked-Out!', 'You are Checked-out successfully!', 'success');
  //       this.isCheckedOut = false;
  //     },
  //     (error: any) => {
  //       Swal.fire('Error', error.error, 'error');
  //     }
  //   );
  // }
  

  
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

  
// show dashboard calendar start
currentDate!: moment.Moment;
calendarData: any[][] | undefined;
weekNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
generateCalendar() {
  const startOfMonth = this.currentDate.clone().startOf('month');
  const endOfMonth = this.currentDate.clone().endOf('month');

  const days = endOfMonth.date();
  const startOfWeek = startOfMonth.clone().startOf('week');
  const endOfWeek = endOfMonth.clone().endOf('week');

  let currentDay = startOfWeek.clone();
  this.calendarData = [];

  while (currentDay.isBefore(endOfWeek)) {
    const week: any[] = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDay.clone(),
        isCurrentMonth: currentDay.isSameOrAfter(startOfMonth) && currentDay.isSameOrBefore(endOfMonth)
      });
      currentDay.add(1, 'day');
    }
    this.calendarData.push(week);
  }
}

goToNextMonth() {
  this.currentDate.add(1, 'month');
  this.generateCalendar();
}

goToPrevMonth() {
  this.currentDate.subtract(1, 'month');
  this.generateCalendar();
}
isToday(date: moment.Moment): boolean {
  return date.isSame(moment(), 'day');
}
// show dashboard calendar end

// when select halday then number of days show 0.5 start
selectedLeaveType: string = '';
updateNumberOfDays() {
  if (this.selectedLeaveType === 'HALFDAY') {
    this.leaveForm.controls.noOfDays.setValue(0.5);
  } else {
    // You can set the default value for other leave types here if needed
    this.leaveForm.controls.noOfDays.setValue(null); // Set to null for other types
  }
}
// when select halday then number of days show 0.5 end
 // API for Apply Leave start

 onSubmit() {
  // console.log("leave form", this.leaveForm);
      // Call the service method to apply leave with form data and token
      this.testService.applyLeave(this.leaveForm.value).subscribe(
        (response) => {
          // Handle the API response here
          Swal.fire('Applied!', 'Leave Applied successfully!', 'success');
          // Reset the form
          // this.leaveForm.reset();
          this.router.navigate(['/viewLeave']);
          this.showAdminLeaveTable = false;
          // this.toggleAdminLeaveTable();
          this.loginService.showTable('viewLeave')
  // console.log("leave apply", response);
  
  
        },
        (error: any) => {
          Swal.fire('Error', error.error, 'error');
  
        }
      );
    }
    // API for Apply Leave end

    // API for apply WFH start

  onWFHSubmit() {


    // Call the service method to apply for WFH
    this.testService.applyWfh(this.wfhForm.value).subscribe(
      () => {
        // handle the API response here
        Swal.fire('Success!', 'Work From Home Applied successfully, Waiting for response!', 'success');
        this.wfhForm.reset()
        this.router.navigate(['/viewWfh']);
        this.showWfhTable = false;
        // this.toggleWfhTable();
        this.loginService.showTable('viewWfh')
      },
      (error: any) => {
        Swal.fire('Error', error.error, 'error');
      }
    );
  }


  // API for apply WFH end

  // API for total leave of user start
  totalLeave: any;
  totalLeaveUser() {
   
      this.adminService.totalLeaveUser().subscribe(
        (response: any) => {
         this.totalLeave = response
          // console.log("total leave",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  // API for total leave of user end


  // API for taken leave of user start
  
  takenLeave: any;
  takenLeaveUser() {
   
      this.adminService.leaveTakenUser().subscribe(
        (response: any) => {
         this.takenLeave = response
          // console.log("taken leave",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  // API for taken leave of user end

  // API for remaining leave of user start
  remainingLeave: any;
  remainingLeaveUser() {
   
      this.adminService.remainingLeaveUser().subscribe(
        (response: any) => {
         this.remainingLeave = response
          // console.log("remaining leave",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  // API for remaining leave of user end
  
  
  // API for total wfh of user start
  totalWfh: any;
  totalWfhUser() {
   
      this.adminService.totalWfhUser().subscribe(
        (response: any) => {
         this.totalWfh = response
          // console.log("total Wfh",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  // API for total wfh of user end


  // API for taken wfh of user start
  
  takenWfh: any;
  takenWfhUser() {
   
      this.adminService.wfhTakenUser().subscribe(
        (response: any) => {
         this.takenWfh = response
          // console.log("taken wfh",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  // API for taken wfh of user end

  // API for remaining wfh of user start
  remainingWfh: any;
  remainingWfhUser() {
   
      this.adminService.remainingWfhUser().subscribe(
        (response: any) => {
         this.remainingWfh = response
          // console.log("remaining Wfh",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  // API for remaining wfh of user end

  // API for show birthday start
  birthday: any;
  birthdayUser() {
   
      this.adminService.birthday().subscribe(
        (response: any) => {
         this.birthday = response
          // console.log("birthday",response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');  
        
        }
      );
   
  }
  
  // API for show birthday end
  

  // view holiday start
  holidaysData: any;
  public currentYear: number = new Date().getFullYear();

  holidayPre() {
    this.currentYear--;
  }

  holidayNext() {
    this.currentYear++;
  }

      // get holiday start
      getHoliday() {
      
        this.testService.getHoliday().subscribe(
          (response: any) => {
        // const dataArray = Object.values(response);
           
        //     const reversedData = dataArray.reverse();
        //     this.getHolidayData = reversedData;
            this.getHolidayData = response;
            // this.fillterGetHoliday = reversedData;
            // console.log("get holiday",response);
          },
          error => {
            Swal.fire('Error', error.error, 'error');  
          
          }
        );
      
    }
// get holiday end

    // get month name and date start
    getMonthName(date: string): string {
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    
      const parts = date.split('-');
      const monthIndex = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript Date object
    
      return monthNames[monthIndex];
    }
    getDayFromDate(date: string): string {
      const parts = date.split('-');
      return parts[2];
    }
      // get month name and date start
      getMonthColor(month: string): string {
        const monthColorMap: { [key: string]: string } = {
          'Jan': 'green',
          'Feb': 'purple',
          'Mar': 'blue',
          'Apr': 'red',
          'May': 'black',
          'Jun': 'green',
          'Jul': 'red',
          'Aug': 'purple',
          'Sep': 'red',
          'Oct': 'black',
          'Nov': 'blue',
          'Dec': 'purple'
        };
      
        return monthColorMap[month] || 'gray'; // Default color for unknown months
      }
      
      
    
  // view holiday end

 // API for show Today And Upcoming Holidays start
 UpcomingHolidays: any;
 TodayAndUpcomingHolidays() {
  
     this.adminService.TodayAndUpcomingHolidays().subscribe(
       (response: any) => {
        this.UpcomingHolidays = response
        //  console.log("Today And Upcoming Holidays", this.UpcomingHolidays);
       },
       error => {
         Swal.fire('Error', error.error, 'error');  
       
       }
     );
  
 }
 
 getShortDayName(day: string): string {
  const dayMap: { [key: string]: string } = {
    'Monday': 'MON',
    'Tuesday': 'TUE',
    'Wednesday': 'WED',
    'Thursday': 'THU',
    'Friday': 'FRI',
    'Saturday': 'SAT',
    'Sunday': 'SUN'
  };

  return dayMap[day] || day; // Default to the original day if not found in the map
}

getMonthNameHoliday(date: string): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const parts = date.split('-');
  const monthIndex = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript Date object

  return monthNames[monthIndex];
}

 // API for show Today And Upcoming Holidays end
  
}
function updateEmployee(employeeId: any, number: any) {
  throw new Error('Function not implemented.');
}


import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';


import { Chart } from 'chart.js/auto';


import { DashboardService } from 'src/app/services/dashboard.service';
import { TestService } from 'src/app/services/test.service';

import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
  showTeamLeaveTable!: any;
  TeamLeaveData: any;
  showTeamWfhTable!: any;
  TeamWfhData: any;
  EmployeeData: any;
  showAllAdminTable: any;
  user: any;
  passwordForm: any;              //for change password
  leaveForm!: any;                //for change password

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

  //for create role start
  form: any;
  name: any;

  // for create role end

wfhCount: number | undefined;
presentCount: number | undefined;
absentCount: number | undefined;
casualCount: number | undefined;
sickCount: number | undefined;
totalEmpCount: number | undefined;
totalWorkingHours: number | undefined;
fullTimeCount: number | undefined;
fullTime = '';
partTime = '';
intern = '';
  // bar chart  start
  public chart: any;
  public chartPie: any;
  //bar chart end
  totalCheckOutEarly: any = {};
  totalCheckedInLate: any = {};
  presentLast7Days: any = {};
  // change password validation start
  showNewPassword: boolean = false;
  showoldPassword: boolean = false;
  showconfirmPassword: boolean = false;

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
  // change password validation end



  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, public dashboardService: DashboardService, public loginService: LoginService, public testService: TestService, public adminService: AdminService) {
    //for change password start
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      // newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordPatternValidator()]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
    // for change password end
    this.form = this.formBuilder.group({
      role: '',
      url: [],

    });
    
  }



 data: any;

  ngOnInit(): void {
    // this.createChart(this.data);
    this.checkOutEarly();
    this.checkedInLate();
    this.presentUsersLast7Days();
    this.fullTimeShow()
    this.partTimeShow();
    this.internShow();
    this.createChart();
    this.createLineChart();
    this.viewEmployeeProfile();
    // this.viewAllAttendance();
    this.currentDate = moment();
    this.generateCalendar();
    this.totalEmpCountShow();
    this.wfhCountShow();
    this.presentCountShow();
    this.absentShow();
    this.casualShow();
    this.sickShow();
    this.birthdayUser();
    this.workingHours();
    this.viewPresentUsersLast7Days();
    this.viewAllCheckOutEarly();
    this.viewAllCheckedInLate();
   this.TodayAndUpcomingHolidays();
  
    // this.createLineChart();
  }
 

  // for view employee list start
  isModalOpen = false; // Variable to track the modal state
  // for view employee list end

  // click on more button to go on employee panel div start
  scrollToHoliday() {
    const targetElement = document.getElementById('Holidaycal');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
 
  viewEmployeeProfile() {
    // Call the getShowData function from the service to fetch data
    this.dashboardService.getShowData().subscribe(
      (response: any) => {
        this.profileDetails = response;
       
      },
      (error) => {
        
      }
    );
  }
  // show profile name in top end


  // }
  //API for team WFH end
  // close team wfh list start
  closeteamWfhlist(): void {
    this.showTeamWfhTable = false;
  }
  // close team wfh list end


  // refresh the form after close start
  closeForm() {
    this.leaveForm.reset(); // Reset the form and clear the input fields
  }
  // refresh the form after close end

  
  redirectToUpdatePage(employeeId: number): void {
    this.router.navigateByUrl(`/update?id=${employeeId}`);

  }

 
//   createChart() {
//   if (this.presentLast7Days !== undefined && this.totalCheckOutEarly !== undefined) {
//     // Create an array to store the last 7 days' dates
//     const last7DaysDates = [];
//     const earlyDepartureData = [];

//     // Define an array of month names
//     const monthNames = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     // Populate the array with the last 7 days' dates excluding today
//     for (let i = 1; i <= 7; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       // Format the date as month name and date
//       const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`;
//       last7DaysDates.push(formattedDate);

//       // Check if there's data available for the current date in totalCheckOutEarly
//       const count = this.totalCheckOutEarly[formattedDate] || 0;
//       earlyDepartureData.push(count);
//     }

//     this.chart = new Chart("MyChart", {
//       type: 'bar',
//       data: {
//         labels: last7DaysDates, // Set the last 7 days' dates as labels
//         datasets: [
//           {
//             label: "present",
//             data: [this.presentLast7Days],
//             backgroundColor: '#421CDD'
//           },
//           {
//             label: "Late Arrival",
//             data: ['40', '90', '50', '30', '60', '40', '80'],
//             backgroundColor: '#FFCE62'
//           },
//           {
//             label: "Early Departure",
//             data: earlyDepartureData,
//             backgroundColor: '#F97165'
//           }
//         ]
//       },
//       options: {
//         aspectRatio: 1.5
//       }
//     });
//   }
// }

createChart() {
  if (this.presentLast7Days !== undefined && this.totalCheckOutEarly !== undefined && this.totalCheckedInLate !== undefined) {
    const last7DaysDates = [];
    const earlyDepartureData = [];
    const lateArrivalData = [];
    const presentLast7DaysData = [];

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDay = `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`;
      last7DaysDates.push(formattedDay);
     const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; 
      // last7DaysDates.push(formattedDate);

      const count = this.totalCheckOutEarly[formattedDate] || 0;
      earlyDepartureData.push(count);

      const lateArrival = this.totalCheckedInLate[formattedDate] || 0;
      lateArrivalData.push(lateArrival);

      const presentLast7Days = this.presentLast7Days[formattedDate] || 0;
      presentLast7DaysData.push(presentLast7Days);
    }

    // console.log("Last 7 Days Dates:", last7DaysDates);
    // console.log("Early Departure Data:", earlyDepartureData);
    // console.log("late  Arrival Data:", lateArrivalData);
    // console.log("present Last 7Days Data:", presentLast7DaysData);

    // Check if a chart instance already exists and destroy it
    if (this.chart) {
      this.chart.destroy();
    }

    // Create a new chart instance
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: last7DaysDates,
        datasets: [
          {
            label: "Present",
            data: presentLast7DaysData,
            backgroundColor: '#421CDD'
          },
          {
            label: "Late Arrival",
            data: lateArrivalData,
            backgroundColor: '#FFCE62'
          },
          {
            label: "Early Departure",
            data: earlyDepartureData,
            backgroundColor: '#F97165'
          }
        ]
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black', 
              
            },
            title: {
              font: {
                weight: 'bolder' 
              }
            }
          },
        
      }
    }
    });
  }
}

reloadChartData(){
  this.checkOutEarly();
  this.checkedInLate();
  this.presentUsersLast7Days();
}


  createLineChart() {
    // Check if data is available before creating the chart
    if (this.fullTime !== undefined && this.partTime !== undefined && this.intern !== undefined) {
      
    // Check if a chart instance already exists and destroy it
    if (this.chartPie) {
      this.chartPie.destroy();
    }

      this.chartPie = new Chart("MyPieChart", {
        type: 'pie',
        data: {
          labels: ['Full Time', 'Part Time', 'Intern/Trainee'],
          datasets: [
            {
              data: [`${this.fullTime}`, `${this.partTime}`, `${this.intern}`],
              backgroundColor: ['#FD7A8C', '#9747FF', '#FFCE62']
            }
          ]
        },
        options: {
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: false
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const clickedSegment = elements[0].index;
              switch (clickedSegment) {
                case 0: 
                  this.navigateToEmployee('fullTimeEmployee');
                  break;
                case 1: 
                  this.navigateToEmployee('PartTimeEmp');
                  break;
                case 2: 
                  this.navigateToEmployee('internEmp');
                  break;
              }
            }
          }
        }
      });
    }
  }

  reloadPieChartData(){
    this.fullTimeShow()
    this.partTimeShow();
    this.internShow();
  }

  // navigate full time part toime and intern table start
  navigateToEmployee(route: string) {
    // Use Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);
  
    // Optionally, you can also call your loginService function
    this.loginService.showTable(route);
  }
  // navigate full time part toime and intern table end
  
  // full time employee start
  fullTimeShow(){
    this.partTimeShow();
    this.internShow();
    this.dashboardService.fulltime().subscribe(
      (response: any) => {
        
        this.fullTime = response;
        this.createLineChart();
          console.log('full time Data:', response);
          

      },
      (error) => {
        
      }
    );
  }
  
  // full time employee end

  // part time employee start
  partTimeShow(){
    // this.fullTimeShow();
    // this.internShow();
    this.dashboardService.parttime().subscribe(
      (response: any) => {
       
        this.partTime = response;
          console.log('part time Data:', response);
          
      },
      (error) => {
        
      }
    );
  }
  // part time employee end

  // intern employee start
  internShow(){
    // this.fullTimeShow();
    // this.partTimeShow();
    this.dashboardService.interntime().subscribe(
      (response: any) => {
       
        this.intern = response;
          console.log('intern Data:', response);
          
      },
      (error) => {
        
      }
    );
  }
  // intern employee end


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

// total employee count start
totalEmpCountShow(){
  this.dashboardService.totalEmpCount().subscribe(
    (response: any) => {
      this.totalEmpCount = response;
      // console.log("total employee count", this.totalEmpCount)
    },
    (error) => {
      
    }
  );
}
// total employee count end

  // wfh count start
  wfhCountShow(){
    this.dashboardService.wfhCount().subscribe(
      (response: any) => {
        this.wfhCount = response;
        // console.log("wfh count", this.wfhCount)
      },
      (error) => {
        
      }
    );
  }
  // wfh count end

   // present count start
   presentCountShow(){
    this.dashboardService.presentCount().subscribe(
      (response: any) => {
        this.presentCount = response;
        // console.log("present count", this.presentCount)
      },
      (error) => {
        
      }
    );
  }
  // present count end

   // absent count start
   absentShow(){
    this.dashboardService.absentCount().subscribe(
      (response: any) => {
        this.absentCount = response;
        // console.log("absent count", this.absentCount)
      },
      (error) => {
        
      }
    );
  }
  // absent count end

   // casual leave count start
   casualShow(){
    this.dashboardService.casualCount().subscribe(
      (response: any) => {
        this.casualCount = response;
        // console.log("casual count", this.casualCount)
      },
      (error) => {
        
      }
    );
  }
  // casual leave count end

   // sick leave count start
   sickShow(){
    this.dashboardService.sickCount().subscribe(
      (response: any) => {
        this.sickCount = response;
        // console.log("casual count", this.sickCount)
      },
      (error) => {
        
      }
    );
  }
  // sick leave count end

  availablePermissionOptions: string[] = [
    "NO_ACCESS",
      "ALL_ACCESS",
      "ALL_EMPLOYEES_DATA",
      "NEW_REGISTRATION",
      "ALL_EMPLOYEES_ATTENDANCE",
      "LEAVE_SHOW_TEAMLEAD",
      "WFH_SHOW_TEAMLEAD",
      "ALL_WFH_EMPLOYEES",
      "VIEW_ALL_LEAVE"
  ];
  selectedPermissions: string[] = []; // Variable to store the selected permissions
  onPermissionSelectionChange() {
    if (this.selectedPermissions.includes("NO_ACCESS")) {
      // If "NO_ACCESS" is selected, set selectedPermissions to an array containing only "NO_ACCESS"
      this.selectedPermissions = ["NO_ACCESS"];
    } else if (this.selectedPermissions.includes("ALL_ACCESS")) {
      // If "ALL_ACCESS" is selected, set selectedPermissions to all available options except "NO_ACCESS"
      this.selectedPermissions = this.availablePermissionOptions.filter(option => option !== "NO_ACCESS");
    }
  }

  formatOption(option: string): string {
    return option.replace(/_/g, ' ');
  }
  

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

  // total Working Hours start
workingHours(){
  this.dashboardService.totalWorkingHours().subscribe(
    (response: any) => {
      this.totalWorkingHours = response.totalWorkingHours;
      // console.log("total Working Hours", this.totalWorkingHours)
    },
    (error) => {
      
    }
  );
}
// total Working Hours end

  // check Out Early start
// checkOutEarly(){
//   this.dashboardService.checkOutEarly().subscribe(
//     (response: any) => {
//       this.totalCheckOutEarly = response;
//       console.log("check Out Early", this.totalCheckOutEarly);
//       this.createChart();
//     },
//     (error) => {
      
//     }
//   );
// }
checkOutEarly() {
  this.dashboardService.checkOutEarly().subscribe(
    (response: any) => {
      this.totalCheckOutEarly = this.processCheckOutEarlyResponse(response);
      // console.log("check Out Early", this.totalCheckOutEarly);
      this.createChart();
      // Additional logic or function calls can be placed here
    },
    (error) => {
      // Handle error if needed
    }
  );
}

processCheckOutEarlyResponse(response: any[]): { [date: string]: number } {
  const result: { [date: string]: number } = {};

  response.forEach(item => {
    const date = item.date;
    const count = item.count;

    // If the date is not present in the result, initialize it to 0
    if (!result[date]) {
      result[date] = 0;
    }

    // Increment the count for the corresponding date
    result[date] += count;
  });

  return result;
}



// check Out Early end

  // check In Late start
checkedInLate(){
  this.dashboardService.checkedInLate().subscribe(
    (response: any) => {
      this.totalCheckedInLate = this.processCheckInEarlyResponse(response);
      // console.log("check In late", this.totalCheckedInLate);
     this.createChart();
    },
    (error) => {
      
    }
  );
}

processCheckInEarlyResponse(response: any[]): { [date: string]: number } {
  const result: { [date: string]: number } = {};

  response.forEach(item => {
    const date = item.date;
    const count = item.count;

    // If the date is not present in the result, initialize it to 0
    if (!result[date]) {
      result[date] = 0;
    }

    // Increment the count for the corresponding date
    result[date] += count;
  });

  return result;
}
// check In Late end

  // present Users Last 7Days start
  presentUsersLast7Days(){
  this.dashboardService.presentUsersLast7Days().subscribe(
    (response: any) => {
      this.presentLast7Days = this.processPresentUsersResponse(response);;
      // console.log("present Last 7Days", this.presentLast7Days);
      this.createChart();
    },
    (error) => {
      
    }
  );
}

processPresentUsersResponse(response: any[]): { [date: string]: number } {
  const result: { [date: string]: number } = {};

  response.forEach(item => {
    const date = item.date;
    const count = item.count;

    // If the date is not present in the result, initialize it to 0
    if (!result[date]) {
      result[date] = 0;
    }

    // Increment the count for the corresponding date
    result[date] += count;
  });

  return result;
}
// present Users Last 7Days end


// for view all user present Last 7Days start
viewPresentUsersLast7Days(){
  this.dashboardService.presentUsersLast7Days().subscribe(
    (response: any) => {
      this.presentLast7Days = response;
      console.log("view present Last 7Days", this.presentLast7Days);
 
    },
    (error) => {
      
    }
  );
}
// for view all user present Last 7Days end

// for view all user check Out Early start

viewAllCheckOutEarly() {
  this.dashboardService.checkOutEarly().subscribe(
    (response: any) => {
      this.totalCheckOutEarly = response;
      console.log("check Out Early", this.totalCheckOutEarly);
   
      // Additional logic or function calls can be placed here
    },
    (error) => {
      // Handle error if needed
    }
  );
}

// for view all user check Out Early end

// for view all user check In Late start
viewAllCheckedInLate(){
  this.dashboardService.checkedInLate().subscribe(
    (response: any) => {
      this.totalCheckedInLate = response;
      console.log("check In late", this.totalCheckedInLate);
   
    },
    (error) => {
      
    }
  );
}
// for view all user check In Late end

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


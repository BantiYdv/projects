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



  // bar chart  start
  public chart: any;
  //bar chart end


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



  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, public dashboardService: DashboardService, public loginService: LoginService, public testService: TestService) {
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
    this.createChart();
    this.createLineChart();
    this.viewEmployeeProfile();
    // this.viewAllAttendance();
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





  // bar chart start
  // createChart() {

  //   this.chart = new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart
  //     data: {// values on X-Axis
  //       labels: ['Jan', 'Fab', 'Mar', 'Apr',
  //         'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  //       datasets: [
  //         {
  //           label: "persent",
  //           data: ['31', '28', '31', '30', '31',
  //             '30', '31', '31', '30', '31', '30', '31'],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "absent",
  //           data: ['25', '22', '31', '29', '25',
  //             '30', '28', '25', '29', '22', '26', '27'],
  //           backgroundColor: 'limegreen'
  //         }
  //       ]
  //     },
  //     options: {
  //       aspectRatio: 1.5
  //     }

  //   });
  // }

 

  // viewAllAttendance() {
   
  //     // Call the service method to fetch all attendance data
  //     this.testService.getAllAttendance().subscribe(
  //       (response: any) => {
  //         const responseData: any[] = response as any[]; // Explicitly cast to any[]
  //         console.log('Attendance Data:', responseData);
  //         // Call the createChart function with the response data
  //         this.createChart(responseData);
  //         console.log("chart att", response);
  //       },
  //       error => {
  //         // Handle errors here
  //         console.error('Error fetching attendance data:', error);
      
  //       }
  //     );
    
  // }
  
  
  
  
  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Mon', 'Tue', 'Wed', 'Thu',
          'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: "present",
            data: ['50', '20', '40', '30', '60',
              '30', '60', '40', '60', '70', '50', '100'],
            backgroundColor: '#421CDD'
          },
          {
            label: "Late Arrival",
            data: ['40', '90', '50', '30', '60',
              '40', '80', '60', '30', '50', '90', '60'],
            backgroundColor: '#FFCE62'
          },
          {
            label: "Early Departure",
            data: ['30', '20', '80', '50', '80',
              '100', '40', '90', '60', '70', '30', '80'],
            backgroundColor: '#F97165'
          }
        ]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }
  
  
 
  // createChart(data: any[]) {
  //   // Ensure that data is an array before proceeding
  //   if (!data || !Array.isArray(data)) {
  //     console.error('Invalid or undefined data for chart.');
  //     return;
  //   }
  
  //   // Group data by month and count occurrences of each status
  //   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  //   const monthlyStatusCounts: Record<string, { present: number; absent: number }> = {};
  //   data.forEach(item => {
  //     const monthIndex = new Date(item.checkDate).getMonth();
  //     const monthName = monthNames[monthIndex];
  //     const status = item.status.toUpperCase(); // Convert to uppercase for consistency
  
  //     if (!monthlyStatusCounts[monthName]) {
  //       monthlyStatusCounts[monthName] = { present: 0, absent: 0 };
  //     }
  
  //     if (status === 'PRESENT') {
  //       monthlyStatusCounts[monthName].present += 1;
  //     } else if (status === 'ABSENT') {
  //       monthlyStatusCounts[monthName].absent += 1;
  //     }
  //   });
  
  //   // Create the chart
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar',
  //     data: {
  //       labels: monthNames,
  //       datasets: [
  //         {
  //           label: "Present",
  //           data: monthNames.map(month => monthlyStatusCounts[month]?.present || 0),
  //           backgroundColor: 'blue',
  //         },
  //         {
  //           label: "Absent",
  //           data: monthNames.map(month => monthlyStatusCounts[month]?.absent || 0),
  //           backgroundColor: 'limegreen',
  //         }
  //       ],
  //     },
  //     options: {
  //       aspectRatio: 1.5,
  //     },
  //   });
  // }
  
  
  // bar chart end

  //line chart start
  // createLineChart() {

  //   this.chart = new Chart("MyLineChart", {
  //     type: 'line', //this denotes the type of chart

  //     data: {// values on X-Axis
  //       labels: ['Jan', 'Fab', 'Mar', 'Apr',
  //         'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  //       datasets: [
  //         {
  //           label: "Sales",
  //           data: ['31', '28', '31', '30', '31',
  //             '30', '31', '31', '30', '31', '30', '31'],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "Profit",
  //           data: ['25', '22', '31', '29', '25',
  //             '30', '28', '25', '29', '22', '26', '27'],
  //           backgroundColor: 'limegreen'
  //         }
  //       ]
  //     },
  //     options: {
  //       aspectRatio: 1.5
  //     }

  //   });
  // }
  //line chart end

  createLineChart() {

    this.chart = new Chart("MyPieChart", {
      type: 'pie', //this denotes the type of chart

      data: {// values on X-Axis
        // labels: ['Full Time', 'Part Time', 'Intern/Trainee'],
        datasets: [
          {
            data: [70, 20, 50], // Adjust these values based on your data
            backgroundColor: ['#FD7A8C', '#9747FF', '#FFCE62']
          }
        ]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }

  
}


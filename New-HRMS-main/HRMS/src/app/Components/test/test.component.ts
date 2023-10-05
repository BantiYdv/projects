import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ParamMap } from '@angular/router';
import { filter } from 'rxjs/operators';    //for navbar don't show in login page
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TestService } from 'src/app/services/test.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import timeGridDay from '@fullcalendar/timegrid';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  showAdminLeaveTable!: any;
  leaveAdminData!: any;
  showTeamLeaveTable!: any;
  TeamLeaveData: any;
  showTeamWfhTable: any;
  TeamWfhData: any;
  EmployeeData: any;
  showAllAdminTable: any;
  user: any;
  isModalOpen: boolean | undefined;
  showAttTable: any;
  AttData: any;
  wfhForm!: any;
  showWfhTable: any;
  wfhData!: any;
  showAllAttTable: any;
  AllAttData: any;
  showAllWfhTable: any;           // for show all wfh
  AllwfhData: any;                //for show all wfh
  showAllLeaveTable: any;         //for show all leave
  leaveAllData: any;              //for show all leave
  route: any;
url: any;
profileDetails: any;
  //for create role start
  form: any;
name: any;

  // for create role end
  passwordForm: any;              //for change password
  leaveForm!: any;                //for change password

  showcalendar: any;            // for calendar
  roles: string[] = ['ADMIN', 'EMPLOYEE', 'MANAGER', 'TEAM LEAD'];
  roleControl = new FormControl();
  AllRoleData: any;

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
   
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer,public loginService: LoginService, public dashboardService: DashboardService, public testService: TestService, public RegisterAndUpdate: RegisterAndUpdateService) {
   //for change password start
   this.passwordForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    // newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordPatternValidator()]],
    newPassword: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
    confirmPassword: ['', Validators.required]
  });
  // for change password end
  this.openEmployee();
  this.teamleave();
  this.teamwfh();
  this.toggleAdminLeaveTable();
  this.viewattendance();
  this.toggleWfhTable();
  this.viewAllattendance();          // for view all attendance list
  this.toggleAllWfhTable();
  this.toggleAllLeaveTable();
  this.togglecalendar();

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

  this.form = this.formBuilder.group({
    role: '',
    url: [] ,
    
  });
  }



  // API for view employee list start
  
  openEmployee(): void {
    this.showAllAdminTable = !this.showAllAdminTable;
    this.isModalOpen = true;

    if (this.showAllAdminTable) {
     

      // Call the service method to fetch the list of employees
      this.testService.getEmployeeList().subscribe(
        (response: any) => {
          // Convert the response object to an array
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();

          // Set the reversed array as the data source
          this.EmployeeData = reversedData;
          console.log("employee Data>>", response);
        },
        error => {
          if (error.status === 403) {
            // Handle the 403 Forbidden error
            Swal.fire({
              icon: 'error',
              title: 'Token Expired!',
              text: 'Access denied. Please check your permissions.',
            });
            console.error('Access denied. Please check your permissions.');
          } else {
            // Handle other errors
            console.error(error);
          }
        }
      );
    }
  }
  // API for view employee list end


// close team wfh list start
close(): void {
  this.showAllAdminTable = false;
}
// close team wfh list end

 //API for team Leave start

teamleave(): void {
  this.showTeamLeaveTable = !this.showTeamLeaveTable;

  if (this.showTeamLeaveTable) {
    this.testService.getTeamLeaveData().subscribe(
      (response) => {
        // Assign the received data to the TeamLeaveData property
        this.TeamLeaveData = response;
        console.log("leave", response);
      },
      (error) => {
        if (error.status === 403) {
          // Handle the 403 Forbidden error
          Swal.fire({
            icon: 'error',
            title: 'Token Expired!',
            text: 'Access denied. Please check your permissions.',
          });
          console.error('Access denied. Please check your permissions.');
        } else {
          // Handle other errors
          console.error('API error:', error);
        }
        this.showTeamLeaveTable = false; // Hide the table if an error occurs
      }
    );
  }
}
//API for team Leave end
// close team leave list start
closeleavelist(): void {
  this.showTeamLeaveTable = false;
}
// close team leave list end

// API for approve team Leave start

approveLeave(id: number): void {
  
  this.testService.approveLeave(id).subscribe(
    (response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Approved',
        text: 'Leave Approved successfully!',
      });
      console.log('Leave approved:', response);
      // Handle success, update UI, etc.
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Approval Error',
        text: 'Failed to approve.',
      });
      console.error('Failed to approve leave:', error);
      // Handle error, show error message, etc.
    }
  );
}
// API for approve team Leave end

// API for reject team Leave start

rejectLeave(id: number): void {
  
  this.testService.rejectLeave(id).subscribe(
    (response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Rejected',
        text: 'Leave Rejected successfully!',
      });
      console.log('Leave approved:', response);
      // Handle success, update UI, etc.
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Reject Error',
        text: 'Failed to Rejected.',
      });
      console.error('Failed to reject leave:', error);
      // Handle error, show error message, etc.
    }
  );
}
// API for reject team Leave end


  //API for team WFH start
 
  teamwfh(): void {
    this.showTeamWfhTable = !this.showTeamWfhTable;
  
    if (this.showTeamWfhTable) {
      this.testService.getTeamWfhData().subscribe(
        (response) => {
          // Assign the received data to the TeamLeaveData property
          this.TeamWfhData = response;
          console.log("wfh", response);
        },
        (error) => {
          if (error.status === 403) {
            // Handle the 403 Forbidden error
            Swal.fire({
              icon: 'error',
              title: 'Token Expired!',
              text: 'Access denied. Please check your permissions.',
            });
            console.error('Access denied. Please check your permissions.');
          } else {
            // Handle other errors
            console.error('API error:', error);
          }
          this.showTeamWfhTable = false; // Hide the table if an error occurs
        }
      );
    }
  }
  //API for team WFH end
  // close team wfh list start
  closeteamWfhlist(): void {
    this.showTeamWfhTable = false;
  }
  // close team wfh list end


  // API for approve team WFH start
  
  ApproveWfh(id: number): void {
  
    this.testService.approveWfh(id).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Approved',
          text: 'WFH Approved successfully!',
        });
        console.log('WFH approved:', response);
        // Handle success, update UI, etc.
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Approval Error',
          text: 'Failed to approve.',
        });
        console.error('Failed to approve WFH:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  // API for approve team WFH end

  // API for reject team WFH start
  
  RejectWfh(id: number): void {
  
    this.testService.rejectWfh(id).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Rejected',
          text: 'WFH Rejected successfully!',
        });
        console.log('WFH approved:', response);
        // Handle success, update UI, etc.
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Reject Error',
          text: 'Failed to Rejected.',
        });
        console.error('Failed to reject WFH:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  // API for reject team WFH end


   // API create role start

  

  //  createRole() {
  
  createRole() {
    // const name = this.form.value.role;
    // console.log("form", this.form.value);
    
    // const permissionNames = this.form.value.permissionNames;
    const name = this.form.value.role;
    console.log("form", this.form.value);
    const permissionNames = this.form.value.url; // Updated property name to 'permissionNames'


    this.testService.createRole(name, permissionNames).subscribe(
      (response) => {
        // Handle the successful response here
        Swal.fire({
          icon: 'success',
          title: 'Created',
          text: 'Role and Permissions assigned successfully',
        }).then(() => {
          const role = localStorage.getItem("role");
          if (role === "SUPERADMIN") {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/admin']);
          }
        });

        console.log("response of role", response);
      },
      (error) => {
        // Handle the error of the API request here
        console.log(error);
      }
    );
  }
  closeForm() {
    const role = localStorage.getItem("role");
    if (role === "SUPERADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/admin']);
    }
    
  }
  


  //API for create role end

    // API for view role stat
    viewRole(): void {
      this.testService.ViewRole().subscribe(
        (response: any) => {
          this.AllRoleData = response; // Assign the fetched role data to AllRoleData
          console.log("view role", response);
          console.log("role all", this.AllRoleData);
        },
        (error: any) => {
          console.error('Error fetching role data:', error);
        }
      );
    }
    
    // API for view role end


   //API for change Password start
  
  changePassword() {
    
    const oldPassword = this.passwordForm.get('oldPassword').value;
    const newPassword = this.passwordForm.get('newPassword').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value;

    // Call the service method to change the password
    this.loginService.changePassword(oldPassword, newPassword, confirmPassword).subscribe(
      () => {
        console.log('Success!'); // Print success message in the console
        Swal.fire({
          title: 'Changed',
          text: 'Password changed successfully'
        }).then(() => {
          // Redirect based on user role
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('permissionLength');
          this.router.navigate(['/login']);
          // location.reload();
        });
      },
      (error) => {
        if (error.status === 400) {
          Swal.fire({
            title: 'Error',
            text: 'Old password is incorrect'
          });
        }
        // Handle the error response
        console.error('API error:', error);
        // Additional error handling...
      }
    );
  }
  //API for change Password end


  // API for download employee list in excel start

  
  getAllEmployees() {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    // Create the request headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.testService.getEmployeeListExcel(headers).subscribe((response: HttpResponse<Blob>) => {
      // Check if the response body is not null
      if (response.body) {
        const contentDisposition = response.headers.get('content-disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'employees.xlsx'; // Use the filename from content-disposition header or a default name

        saveAs(response.body, fileName); // Use the 'file-saver' library to save the file
      } else {
        console.error('Response body is null.');
      }
    }, (error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    });
  }
  // API for download employee list in excel end


  // API for download employee leave list in excel start

  
  getAllEmployeesLeave() {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    // Create the request headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.testService.getEmployeeLeaveExcel(headers).subscribe((response: HttpResponse<Blob>) => {
      // Check if the response body is not null
      if (response.body) {
        const contentDisposition = response.headers.get('content-disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'employeesLeave.xlsx'; // Use the filename from content-disposition header or a default name

        saveAs(response.body, fileName); // Use the 'file-saver' library to save the file
      } else {
        console.error('Response body is null.');
      }
    }, (error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    });
   
  }

  // API for download employee leave list in excel end


  // API for download employee Attendance list in excel start

 
  getAllEmployeesAtt() {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    // Create the request headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.testService.getEmployeeAttExcel(headers).subscribe((response: HttpResponse<Blob>) => {
      // Check if the response body is not null
      if (response.body) {
        const contentDisposition = response.headers.get('content-disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'employeesAtt.xlsx'; // Use the filename from content-disposition header or a default name

        saveAs(response.body, fileName); // Use the 'file-saver' library to save the file
      } else {
        console.error('Response body is null.');
      }
    }, (error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    });
   
  }
  // API for download employee Attendance list in excel end


  // API for download employee WFH list in excel start

  
  getAllEmployeesWfh() {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    // Create the request headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.testService.getEmployeeWfhExcel(headers).subscribe((response: HttpResponse<Blob>) => {
      // Check if the response body is not null
      if (response.body) {
        const contentDisposition = response.headers.get('content-disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'employeesWfh.xlsx'; // Use the filename from content-disposition header or a default name

        saveAs(response.body, fileName); // Use the 'file-saver' library to save the file
      } else {
        console.error('Response body is null.');
      }
    }, (error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    });
 
  }
  // API for download employee WFH list in excel end



// --------------for other user login start-------------

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

// API for Apply Leave start

onSubmit() {
    
  // Call the service method to apply leave with form data and token
  this.testService.applyLeave(this.leaveForm.value).subscribe(
    () => {
      // Handle the API response here
      Swal.fire('Applied!', 'Leave Applied successfully!', 'success');
      // Reset the form
      this.leaveForm.reset();
    },
    (error) => {
      // Handle different error cases as needed
      if (error.status === 400) {
        Swal.fire('Error!', 'Leave already Applied for this date!', 'error');
      } else if (error.status === 415) {
        Swal.fire({
          icon: 'error',
          title: 'Remaining Leaves',
          text: 'No casual leaves remaining.',
        });
      } else if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Remaining Leaves',
          text: 'No sufficient sick leave.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please try again.',
        });
      }
      // Handle any errors
      console.error(error);
    }
  );
}
// API for Apply Leave end

// API for view leave start

toggleAdminLeaveTable(): void {
    this.showAdminLeaveTable = !this.showAdminLeaveTable;

    if (this.showAdminLeaveTable) {
     

      // Call the service method to fetch admin leave data
      this.testService.getViewLeave().subscribe(
        (response: any) => {
          // Convert the response object to an array
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();

          // Set the reversed array as the data source
          this.leaveAdminData = reversedData;
        },
        error => {
          if (error.status === 403) {
            // Handle the 403 Forbidden error
            Swal.fire({
              icon: 'error',
              title: 'Token Expired!',
              text: 'Access denied. Please check your permissions.',
            });
            console.error('Access denied. Please check your permissions.');
          } else {
            // Handle other errors
            console.error(error);
          }
          // Hide the table if an error occurs
          this.showAdminLeaveTable = false;
        }
      );
    }
  }
// API for view leave end

// API for view Attendance start

viewattendance() {
  this.showAttTable = !this.showAttTable;

  if (this.showAttTable) {
   

    // Call the service method to fetch attendance data
    this.testService.getAttendance().subscribe(
      (response: any) => {
        // Convert the response object to an array
        const dataArray = Object.values(response);
        // Reverse the received array
        const reversedData = dataArray.reverse();

        // Set the reversed array as the data source
        this.AttData = reversedData;
      },
      error => {
        if (error.status === 403) {
          // Handle the 403 Forbidden error
          Swal.fire({
            icon: 'error',
            title: 'Token Expired!',
            text: 'Access denied. Please check your permissions.',
          });
          console.error('Access denied. Please check your permissions.');
        } else {
          // Handle other errors
          console.error(error);
        }
        // Hide the table if an error occurs
        this.showAttTable = false;
      }
    );
  }
}
// API for view Attendance end

// API for apply WFH start

onWFHSubmit() {
   

  // Call the service method to apply for WFH
  this.testService.applyWfh(this.wfhForm.value).subscribe(
    () => {
      // handle the API response here
      Swal.fire('Success!', 'Work From Home Applied successfully, Waiting for response!', 'success');
      this.wfhForm.reset()
    },
    (error: any) => {
      if (error.status === 400) {
        Swal.fire('Error', 'You have already applied for Work From Home on this date.', 'error');
      } else if (error.status === 500) {
        Swal.fire('Error', 'You have no sufficient days to apply for Work From Home.', 'error');
      } else {
        Swal.fire('Error', 'An error occurred while applying for WFH.', 'error');
      }
    }
  );
}


// API for apply WFH end

// API for view WFH start

toggleWfhTable(): void {
  this.showWfhTable = !this.showWfhTable;

  if (this.showWfhTable) {
  
    // Call the service method to fetch WFH data
    this.testService.getWfhData().subscribe(
      (response: any) => {
        // Convert the response object to an array
        const dataArray = Object.values(response);
        // Reverse the received array
        const reversedData = dataArray.reverse();

        // Set the reversed array as the data source
        this.wfhData = reversedData;
      },
      error => {
        if (error.status === 403) {
          // Handle the 403 Forbidden error
          Swal.fire({
            icon: 'error',
            title: 'Token Expired!',
            text: 'Access denied. Please check your permissions.',
          });
          console.error('Access denied. Please check your permissions.');
        } else {
          // Handle other errors
          console.error(error);
        }
        // Hide the table if an error occurs
        this.showWfhTable = false;
      }
    );
  }
}
// API for view WFH end



viewAllattendance() {
  this.showAllAttTable = !this.showAllAttTable;

  if (this.showAllAttTable) {
   

    // Call the service method to fetch all attendance data
    this.testService.getAllAttendance().subscribe(
      (response: any) => {
        // Convert the response object to an array
        const dataArray = Object.values(response);
        // Reverse the received array
        const reversedData = dataArray.reverse();

        // Set the reversed array as the data source
        this.AllAttData = reversedData;
      },
      error => {
        if (error.status === 403) {
          // Handle the 403 Forbidden error
          Swal.fire({
            icon: 'error',
            title: 'Token Expired!',
            text: 'Access denied. Please check your permissions.',
          });
          console.error('Access denied. Please check your permissions.');
        } else {
          // Handle other errors
          console.error(error);
        }
        // Hide the table if an error occurs
        this.showAllAttTable = false;
      }
    );
  }
}
// API for view All Attendance end

// API for view All WFH start

toggleAllWfhTable(): void {
  this.showAllWfhTable = !this.showAllWfhTable;

  if (this.showAllWfhTable) {
    
    // Call the service method to fetch all WFH data for administrators
    this.testService.getAllWfhData().subscribe(
      (response: any) => {
        // Convert the response object to an array
        const dataArray = Object.values(response);
        // Reverse the received array
        const reversedData = dataArray.reverse();

        // Set the reversed array as the data source
        this.AllwfhData = reversedData;
        console.log("wwewewe", response);
      },
      error => {
        if (error.status === 403) {
          // Handle the 403 Forbidden error
          Swal.fire({
            icon: 'error',
            title: 'Token Expired!',
            text: 'Access denied. Please check your permissions.',
          });
          console.error('Access denied. Please check your permissions.');
        } else {
          // Handle other errors
          console.error(error);
        }
        // Hide the table if an error occurs
        this.showAllWfhTable = false;
      }
    );
  }
}
// API for view All  WFH end

// API for view All leave start

toggleAllLeaveTable(): void {
    this.showAllLeaveTable = !this.showAllLeaveTable;

    if (this.showAllLeaveTable) {
     

      // Call the service method to fetch all leave data
      this.testService.getAllLeave().subscribe(
        (response: any) => {
          
          // Convert the response object to an array
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();

          // Set the reversed array as the data source
          this.leaveAllData = reversedData;
        },
        error => {
          if (error.status === 403) {
            // Handle the 403 Forbidden error
            Swal.fire({
              icon: 'error',
              title: 'Token Expired!',
              text: 'Access denied. Please check your permissions.',
            });
            console.error('Access denied. Please check your permissions.');
          } else {
            // Handle other errors
            console.error(error);
          }
          // Hide the table if an error occurs
          this.showAllLeaveTable = false;
        }
      );
    }
  }
// API for view All leave end

// API for show user details to admin / super admin start

EmployeeProfile(item: any): void {
  // Assuming 'item' has an 'id' property
  const id = item.id;
  console.log("id", id);
  this.RegisterAndUpdate.empdetails(id).subscribe(
    (response: any) => {
      // Convert the response object to an array
      const dataArray = Object.values(response);
      // Reverse the received array
      const reversedData = dataArray.reverse();
console.log("aaaaaaaa>>>>", response);
      // Set the reversed array as the data source
      this.profileDetails = reversedData;
      console.log(">>>>>>>>>>>>>>", this.profileDetails);
    },
    (error) => {
      console.error('Failed to fetch employee details:', error);
    }
  );
}
// API for show user details to admin / super admin end

// API for delete employee start

deleteEmployee(id: any): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure you want to delete this Employee?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.testService.deleteEmployee(id).subscribe(
        () => {
          console.log('Employee deleted successfully.');
          Swal.fire({
            title: 'Deleted!',
            text: 'Employee has been deleted.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.showAllAdminTable = false;
             this.openEmployee();
            }
          });
        },
        (error) => {
          console.error('An error occurred while deleting the employee:', error);
        }
      );
    }
  });
}
// API for delete employee end

// -------------for other user login end-----------------
 //calendar start
 Events: any[] = [
  {
    title: 'Makar Sankranti',
    start: '2023-01-14'
  },
  {
    title: 'Republic Day',
    start: '2023-01-26'
  },
  {
    title: 'Maha Shivaratri',
    start: '2023-02-18'
  },
  {
    title: 'Holi',
    start: '2023-03-07',
    end: '2023-03-08',
  },
  {
    title: 'Independence Day',
    start: '2023-08-15',
    icon: "https://cdn-icons-png.flaticon.com/128/5400/5400336.png",
  },
  {
    title: 'Raksha Bandhan',
    start: '2023-08-30',
    icon: 'https://cdn-icons-png.flaticon.com/128/4924/4924381.png',
  },
  {
    title: 'Janmashtami',
    start: '2023-09-06',
    icon: 'https://cdn-icons-png.flaticon.com/128/5108/5108679.png'
  },
  {
    title: 'Gandhi Jayanti',
    start: '2023-10-02',
    icon: 'https://cdn-icons-png.flaticon.com/128/2046/2046615.png'
  },
  {
    title: 'Dussehra',
    start: '2023-10-24',
    icon: 'https://cdn-icons-png.flaticon.com/128/3552/3552247.png',
  },
  {
    title: 'Deepawali',
    start: '2023-11-12',
    icon: 'https://cdn-icons-png.flaticon.com/128/4336/4336999.png',
  },
  {
    title: 'Govardhan Puja',
    start: '2023-11-13',
    icon: 'https://cdn-icons-png.flaticon.com/128/4223/4223348.png',
  },
  {
    title: 'Christmas',
    start: '2023-12-25',
    icon: 'https://cdn-icons-png.flaticon.com/128/2299/2299172.png',
  }
];
calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, timeGridWeek, timeGridDay],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  events: this.Events,
  eventContent: this.customEventContent           //for icon show in calendar
};

// for icon show in calendar start
customEventContent(info: any) {
  if (info.event.extendedProps.icon) {
    const iconElement = document.createElement('img');
    iconElement.src = info.event.extendedProps.icon;
    iconElement.classList.add('event-icon');

    // Set the size of the event icon
    iconElement.style.width = '50px'; // Adjust the width as per your requirements
    iconElement.style.height = '70px'; // Adjust the height as per your requirements


    const titleElement = document.createElement('div');
    titleElement.textContent = info.event.title;
    titleElement.classList.add('event-title');

    const containerElement = document.createElement('div');
    containerElement.appendChild(iconElement);
    containerElement.appendChild(titleElement);

    return { domNodes: [containerElement] };
  }

  return { domNodes: [document.createTextNode(info.event.title)] };
}
// for icon show in calendar end
httpClient: any;
//calendar end

togglecalendar(): void {
  this.showcalendar = !this.showcalendar;
}
}

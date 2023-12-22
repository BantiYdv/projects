import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ParamMap, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';    //for navbar don't show in login page
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TestService } from 'src/app/services/test.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import timeGridDay from '@fullcalendar/timegrid';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  role: any;
sortOrderSalary: any;
selectOption(_t52: string) {
throw new Error('Method not implemented.');
}
  showAdminLeaveTable!: any;
  leaveAdminData!: any;
  fillterLeaveData: any;
  showTeamLeaveTable!: any;
  TeamLeaveData: any;
  fillterTeamLeaveData: any;
  showTeamWfhTable: any;
  fillterTeamWfhData: any;
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
  fillterWfhData: any;
  showAllAttTable: any;
  AllAttData: any;
  showAllWfhTable: any;           // for show all wfh
  AllwfhData: any;                //for show all wfh
  showAllLeaveTable: any;         //for show all leave
  leaveAllData: any;              //for show all leave
  // route: any;
  url: any;
  profileDetails: any;
  //for create role start
  form: any;
  name: any;

  // for create role end
  passwordForm: any;              //for change password
  leaveForm!: any;                //for change password

  selectedRole: any;
  selectedPermissions: string[] = []; // Variable to store the selected permissions
  availablePermissions: string[] = [];

  showcalendar: any;            // for calendar
  roles: string[] = ['ADMIN', 'EMPLOYEE', 'MANAGER', 'TEAM LEAD'];
  roleControl = new FormControl();
  AllRoleData: any;
  id: any;
  permissionNames: any;


  // change password validation start
  showNewPassword: boolean = false;
  showoldPassword: boolean = false;
  showconfirmPassword: boolean = false;
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
isDropdownOpen: any;

  // remove underscore from permission name start
  formatOption(option: string): string {
    return option.replace(/_/g, ' ');
  }
// remove underscore from permission name end
  
  showAllDocsTable: any;
  
  imageUrl: SafeUrl | undefined;
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; 

  shiftform: any;
  // search start
  // editName: boolean = false;
  // editDesignation: boolean = false;
  // enterEditMode() {
  //   this.editName = true;
  //   this.editDesignation = true;
  // }

  // exitEditMode() {
  //   this.editName = false;
  //   this.editDesignation = false;
  // }
  // nameFilter: string = '';
  // nameDesignationFilter: string = '';

  // isItemVisible(item: any): boolean {
  //   const nameMatch = !this.nameFilter || (item.firstname + ' ' + item.lastname).toLowerCase().includes(this.nameFilter.toLowerCase());
  //   const designationMatch = !this.nameDesignationFilter || item.designation.toLowerCase().includes(this.nameDesignationFilter.toLowerCase());

  //   return nameMatch && designationMatch;
  // }

  // search end

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

   // employee list search start
  searchTerm: string = '';
  searchEmail: string = '';
  searchdesignation: string = '';
  
  filteredEmployeeData: any[] = [];

  applyFilter() {
    this.filteredEmployeeData = this.EmployeeData.filter((item: { firstname: string; lastname: string; }) =>
      item.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // || item.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // || item.emailid.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  applyFilterEmail() {
    this.filteredEmployeeData = this.EmployeeData.filter((item: { emailid: string; }) =>
     
      item.emailid.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  }

  applyFilterDesignation() {
    this.filteredEmployeeData = this.EmployeeData.filter((item: { designation: string; }) =>
    item.designation.toLowerCase().includes(this.searchdesignation.toLowerCase()) 
    );
    console.log("filter designation", this.filteredEmployeeData)
  }

  
  // employee list search start

  // role and permission  list search start
  searchRole: string = '';
  fillterAllRoleData: any[] = [];

  FilterRole() {
    this.fillterAllRoleData = this.AllRoleData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.searchRole.toLowerCase()) 
    );
  }

   // role and permission list search end

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, public loginService: LoginService, public dashboardService: DashboardService, public testService: TestService, public RegisterAndUpdate: RegisterAndUpdateService, private route: ActivatedRoute) {
    //for change password start
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      // newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordPatternValidator()]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
    // for change password end
  
    


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
      role: [''],
      url: [[]],

    });

// shift time start
    this.shiftform = this.formBuilder.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      workDuration: ['', Validators.required]
    });
    this.formArray = this.formBuilder.array([]);
    // shift time end
  }
 
  selectedPermission: any; 
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  
  ngOnInit() {
    this.viewRole();
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
    this.designations();
  }


 
  firstname: string = ''; // Replace with user's first name
  lastname: string = ''; // Replace with user's last name

  
  generateDefaultImageUser(): string {
    // console.log("f name", this.EmployeeData.firstname);
    // console.log("l name", this.EmployeeData.lastname)
    if (this.EmployeeData.firstname && this.EmployeeData.lastname) {
      const initials = this.EmployeeData.firstname.charAt(0) + this.EmployeeData.lastname.charAt(0);
      return `https://via.placeholder.com/150/8790bf/FFFFFF/?text=${initials}`;
    } else {
      return 'https://via.placeholder.com/150/8790bf/FFFFFF/?text=User';
    }
  }
  imageUser(firstname: any, lastname: any): string {
    // console.log("f name", this.EmployeeData.firstname);
    // console.log("l name", this.EmployeeData.lastname)
    if (firstname && lastname) {
      const initials = firstname.charAt(0) + lastname.charAt(0);
      return `https://via.placeholder.com/150/8790bf/FFFFFF/?text=${initials}`;
    } else {
      return 'https://via.placeholder.com/150/8790bf/FFFFFF/?text=User';
    }
  }
    // // after reload to show
    // isHashEqualTo(hash: string): boolean {
    //   return window.location.hash === `#${hash}`;
    // }
    // API for view employee list start

  // API for view employee list start

  openEmployee(): void {
    this.showAllAdminTable = !this.showAllAdminTable;
    this.isModalOpen = true;

    if (this.showAllAdminTable && '#/employee' === window.location.hash) {

   
      // Call the service method to fetch the list of employees
      this.testService.getEmployeeList().subscribe(
        (response: any) => {
          // Convert the response object to an array
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();

          // Set the reversed array as the data source
          this.EmployeeData = reversedData;
          this.filteredEmployeeData = reversedData; 
          console.log("employe>>>", response);
        },
        error => {
          if (error.status === 403) {
            // Handle the 403 Forbidden error
            Swal.fire({
              icon: 'error',
              title: 'Token Expired!',
              text: 'Access denied. Please check your permissions.',
            });

          } else {
            // Handle other errors

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

    if (this.showTeamLeaveTable && '#/teamleave' === window.location.hash) {
      this.testService.getTeamLeaveData().subscribe(
        (response: any) => {
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();
          // Assign the received data to the TeamLeaveData property
          this.TeamLeaveData = reversedData
          this.fillterTeamLeaveData = reversedData;
          console.log("leave", response);
        },
        (error) => {
          Swal.fire('Error', error.error, 'error');
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
        this.showTeamLeaveTable = false;
        this.teamleave();
      },
      (error) => {
        Swal.fire('Error', error.error, 'error');
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
        this.showTeamLeaveTable = false;
        this.teamleave();
        console.log('Leave Rejected:', response);
        // Handle success, update UI, etc.
      },
      (error) => {
        Swal.fire('Error', error.error, 'error');
        console.error('Failed to reject leave:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  // API for reject team Leave end


  //API for team WFH start

  teamwfh(): void {
    this.showTeamWfhTable = !this.showTeamWfhTable;

    if (this.showTeamWfhTable && '#/teamwfh' === window.location.hash) {
      this.testService.getTeamWfhData().subscribe(
        (response: any) => {
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();
          // Assign the received data to the TeamLeaveData property
          this.TeamWfhData = reversedData;
          this.fillterTeamWfhData = reversedData;
          console.log("wfh", response);
        },
        (error) => {
          Swal.fire('Error', error.error, 'error');
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
        this.showTeamWfhTable = false;
        this.teamwfh();
        console.log('WFH approved:', response);
        // Handle success, update UI, etc.
      },
      (error) => {
        Swal.fire('Error', error.error, 'error');
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
        this.showTeamWfhTable = false;
        this.teamwfh();
        console.log('WFH approved:', response);
        // Handle success, update UI, etc.
      },
      (error) => {
        Swal.fire('Error', error.error, 'error');
        console.error('Failed to reject WFH:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  // API for reject team WFH end


  // API create role start



  //  createRole() {

  createRole() {

    console.log('Form Value Before Create Role:', this.form.value);
    // const permissionNames = this.form.value.permissionNames;
    const name = this.form.value.role;
console.log("role name", name);
    const permissionNames = this.form.value.url; // Updated property name to 'permissionNames'

console.log("perission", permissionNames);
    this.testService.createRole(name, permissionNames).subscribe(
      (response) => {
        // Handle the successful response here
        Swal.fire({
          icon: 'success',
          title: 'Created',
          text: 'Role and Permissions assigned successfully',
        }).then(() => {
          // const role = localStorage.getItem("role");
          // if (role === "SUPERADMIN") {
          //   this.router.navigate(['/dashboard']);
          // } else {
          //   this.router.navigate(['/admin']);
          // }
          this.loginService.showTable('viewRole');
          this.router.navigate(['/viewRole']);
          this.viewRole();
        });


      },
      (error) => {
        // Handle the error of the API request here
        Swal.fire('Error', error.error, 'error');
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

  // API for view role with permission stat
  viewRole(): void {
    this.testService.ViewRolewithPermission().subscribe(
      (response: any) => {

        const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();
        this.AllRoleData = reversedData; // Assign the fetched role data to AllRoleData
        console.log("view role", response);
        console.log("role all", this.AllRoleData);
        this.fillterAllRoleData = reversedData; 
      },
      (error: any) => {
        console.error('Error fetching role data:', error);
      }
    );
  }

  // API for view role with permission end



  //  API for add permission start
  // AddPermission() {
  //   this.route.queryParams.subscribe(params => {
  //     const id = params['id'];

  //     if (id) {
  //       this.testService.AddPermissionName(id, this.selectedPermissions).subscribe(
  //         (response) => {
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'Added',
  //             text: 'Permissions added successfully',
  //           }).then(() => {
  //             this.loginService.showTable('viewRole');
  //             this.router.navigate(['/viewRole']);
  //             this.viewRole();

  //           });
  //           console.log("permission added", response);
  //         },
  //         (error) => {
  //           console.error('Error fetching role data:', error);
  //         }
  //       );
  //     } else {
  //       // Handle the case when 'id' is not available
  //     }
  //   });
  // }
  AddPermission(id: any) {
   
  
      if (id) {
        this.testService.AddPermissionName(id, this.selectedPermissions).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Added',
              text: 'Permissions added successfully',
            }).then(() => {
              this.loginService.showTable('viewRole');
              this.router.navigate(['/viewRole']);
              this.viewRole();
              // Clear query parameters after successful update
              this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {},
                queryParamsHandling: 'merge',
              });
            });
            console.log("permission added", response);
          },
          (error) => {
            console.error('Error fetching role data:', error);
          }
        );
      } else {
        // Handle the case when 'id' is not available
        console.log("No 'id' available");
      }
  
  }
  
  //  API for add permission end

  // API for delete permission start

  // deletePermission(id: any): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Are you sure you want to remove this permission?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, remove it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.testService.RemovePermission(id).subscribe(
  //         () => {
  //           console.log('Permission removed successfully.');
  //           Swal.fire({
  //             title: 'Removed!',
  //             text: 'Permission has been removed.',
  //             icon: 'success',
  //             showConfirmButton: false, 
  //           timer: 1500 
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               // location.reload();
  //               this.viewRole();
  //             }
  //           });
  //         },
  //         (error) => {
  //           Swal.fire('Error', error.error, 'error');
  //         }
  //       );
  //     }
  //   });
  // }
  deletePermission(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove these permissions?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove them!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.RemovePermission(id, this.selectedPermissions).subscribe(
          () => {
            console.log('Permissions removed successfully.');
            Swal.fire({
              title: 'Removed!',
              text: 'Permissions have been removed.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.loginService.showTable('viewRole');
              this.router.navigate(['/viewRole']);
              this.viewRole();


            });
          },
          (error) => {
            Swal.fire('Error', error.error, 'error');
          }
        );
      }
    });
  }

  // API for delete permission end

  // API for delete role start
  deleteRole(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this Role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.deleteRole(id).subscribe(
          (response) => {
            console.log('Role deleted successfully.');
            console.log("delete role", response);
            Swal.fire({
              title: 'Deleted!',
              text: 'Role has been deleted.',
              icon: 'success'
            }).then((result) => {
              if (result.isConfirmed) {
                this.loginService.showTable('viewRole');
                this.router.navigate(['/viewRole']);
                this.viewRole();
              }
            });
          },
          (error) => {
            Swal.fire('Error', error.error, 'error');
          }
        );
      }
    });
  }
  // API for delete role end

  //API for change Password start

  changePassword() {

    const oldPassword = this.passwordForm.get('oldPassword').value;
    const newPassword = this.passwordForm.get('newPassword').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value;

    // Call the service method to change the password
    this.loginService.changePassword(oldPassword, newPassword, confirmPassword).subscribe(
      () => {

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

        // Additional error handling...
      }
    );
  }
  //API for change Password end


  // API for download employee list in excel start


  getAllEmployees() {
    const token = localStorage.getItem('jwtToken');


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

      }
    }, (error) => {
      // Handle any errors that occurred during the API call

    });
  }
  // API for download employee list in excel end


  // API for download employee leave list in excel start


  getAllEmployeesLeave() {
    const token = localStorage.getItem('jwtToken');

    // Create the request headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.testService.getEmployeeLeaveExcel(headers).subscribe((response: HttpResponse<Blob>) => {
      // Check if the response body is not null
      if (response.body) {
        const contentDisposition = response.headers.get('content-disposition');

        // const fileName = contentDisposition
        //   ? contentDisposition.split('filename=')[1]
        //   : 'employeesLeave.xlsx'; // Use the filename from content-disposition header or a default name

        let fileName = 'employeesLeave.xlsx';

        if (contentDisposition) {
          const matches = /filename=([^;]+)/i.exec(contentDisposition);
          if (matches && matches[1]) {
            fileName = matches[1].trim();
          }
        }


        saveAs(response.body, fileName); // Use the 'file-saver' library to save the file
      } else {

      }
    }, (error) => {
      // Handle any errors that occurred during the API call

    });

  }

  // API for download employee leave list in excel end


  // API for download employee Attendance list in excel start


  getAllEmployeesAtt() {
    const token = localStorage.getItem('jwtToken');

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

      }
    }, (error) => {
      // Handle any errors that occurred during the API call

    });

  }
  // API for download employee Attendance list in excel end


  // API for download employee WFH list in excel start


  getAllEmployeesWfh() {
    const token = localStorage.getItem('jwtToken');


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

      }
    }, (error) => {
      // Handle any errors that occurred during the API call

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
console.log("leave form", this.leaveForm);
    // Call the service method to apply leave with form data and token
    this.testService.applyLeave(this.leaveForm.value).subscribe(
      (response) => {
        // Handle the API response here
        Swal.fire('Applied!', 'Leave Applied successfully!', 'success');
        // Reset the form
        // this.leaveForm.reset();
        this.router.navigate(['/viewLeave']);
        this.showAdminLeaveTable = false;
        this.toggleAdminLeaveTable();
        this.loginService.showTable('viewLeave')
console.log("leave apply", response);


      },
      (error: any) => {
        Swal.fire('Error', error.error, 'error');

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
          this.fillterLeaveData = reversedData;
        },
        error => {
          // Swal.fire('Error', error.error, 'error');  
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

    if (this.showAttTable){

      // Call the service method to fetch attendance data
      this.testService.getAttendance().subscribe(
        (response: any) => {
          // Convert the response object to an array
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();

          // Set the reversed array as the data source
          this.AttData = reversedData;
          console.log("attendance", response);
        },
        error => {
          Swal.fire('Error', error.error, 'error');
          // Hide the table if an error occurs
          // this.showAttTable = false;
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
        // this.wfhForm.reset()
        this.router.navigate(['/viewWfh']);
        this.showWfhTable = false;
        this.toggleWfhTable();
        this.loginService.showTable('viewWfh')
      },
      (error: any) => {
        Swal.fire('Error', error.error, 'error');
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
          this.fillterWfhData = reversedData;
        },
        error => {
          Swal.fire('Error', error.error, 'error');
          // Hide the table if an error occurs
          this.showWfhTable = false;
        }
      );
    }
  }
  // API for view WFH end


// API for view All Attendance start
  viewAllattendance() {
    this.showAllAttTable = !this.showAllAttTable;

    if (this.showAllAttTable && '#/viewAllAtt' === window.location.hash) {


      // Call the service method to fetch all attendance data
      this.testService.getAllAttendance().subscribe(
        (response: any) => {
          // Convert the response object to an array
          const dataArray = Object.values(response);
          // Reverse the received array
          const reversedData = dataArray.reverse();

          // Set the reversed array as the data source
          this.AllAttData = reversedData;
          console.log("atttttttt",response);
        },
        error => {
          // Swal.fire('Error', error.error, 'error');  
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

    if (this.showAllWfhTable && '#/viewAllWfh' === window.location.hash) {

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
          Swal.fire('Error', error.error, 'error');
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

    if (this.showAllLeaveTable && '#/viewAllLeave' === window.location.hash) {


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
          // Swal.fire('Error', error.error, 'error');  
          // Hide the table if an error occurs
          this.showAllLeaveTable = false;
        }
      );
    }
  }
  // API for view All leave end

  // API for show user details to admin / super admin start

  // EmployeeProfile(item: any): void {
  //   // Assuming 'item' has an 'id' property
  //   const id = item.id;
  //   console.log("id", id);
  //   this.RegisterAndUpdate.empdetails(id).subscribe(
  //     (response: any) => {
  //       // Convert the response object to an array
  //       const dataArray = Object.values(response);
  //       // Reverse the received array
  //       const reversedData = dataArray.reverse();
  //       console.log("aaaaaaaa>>>>", response);
  //       // Set the reversed array as the data source
  //       this.profileDetails = reversedData;

  //       console.log(">>>>>>>>>>>>>>", this.profileDetails);
  //     },
  //     (error) => {
  //       Swal.fire('Error', error.error, 'error');

  //     }
  //   );
  // }
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
                // location.reload();
                this.showAllAdminTable = false;
                this.openEmployee();

              }
            });
          },
          (error) => {
            Swal.fire('Error', error.error, 'error');
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


  // openAddPermission(item: any) {  
  //   this.selectedRole = item;       
  //   this.selectedPermissions = item.permissions.map((permission: { permissionName: any; }) => permission.permissionName);
  //   this.loginService.showTable('addPermission');
  // }

  


permissionId: any;

  // openAddPermission(item: any) {
  //   this.permissionId = item.id
  //   this.selectedRole = item;
  //   // Check if "NO_ACCESS" is in the permissions list
  // const hasNoAccess = item.permissions.some((permission: { permissionName: any; }) => permission.permissionName === 'NO_ACCESS');

  // if (hasNoAccess) {
  //   // If "NO_ACCESS" is present, remove all other permissions
  //   this.selectedPermissions = ['NO_ACCESS'];
  // } else {
  //   // If "NO_ACCESS" is not present, keep the existing permissions
  //   this.selectedPermissions = item.permissions.map((permission: { permissionName: any; }) => permission.permissionName);
  // }
  //   // Define an array of available permission options, excluding the selectedPermissions
  //   const availablePermissionOptions = [
  //     "NO_ACCESS",
  //     "ALL_ACCESS",
  //     "ALL_EMPLOYEES_DATA",
  //     "NEW_REGISTRATION",
  //     "ALL_EMPLOYEES_ATTENDANCE",
  //     "LEAVE_SHOW_TEAMLEAD",
  //     "WFH_SHOW_TEAMLEAD",
  //     "ALL_WFH_EMPLOYEES",
  //     "VIEW_ALL_LEAVE"
  //   ].filter(option => !this.selectedPermissions.includes(option));

  //   // Assign the available options to a new property (e.g., availablePermissionOptions)
  //   this.availablePermissionOptions = availablePermissionOptions;

  //   // this.loginService.showTable('addPermission');
  // }

  openAddPermission(item: any) {
    this.permissionId = item.id
    this.selectedRole = item;
    // Check if "NO_ACCESS" is in the permissions list
  const hasNoAccess = item.permissions.some((permission: { permissionName: any; }) => permission.permissionName === 'NO_ACCESS');

  if (hasNoAccess) {
    // If "NO_ACCESS" is present, remove all other permissions
    this.selectedPermissions = ['NO_ACCESS'];
  } else {
    // If "NO_ACCESS" is not present, keep the existing permissions
    this.selectedPermissions = item.permissions.map((permission: { permissionName: any; }) => permission.permissionName);
  }
    // Define an array of available permission options, excluding the selectedPermissions
    const availablePermissionOptions = [
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

    // Assign the available options to a new property (e.g., availablePermissionOptions)
    this.availablePermissionOptions = availablePermissionOptions;

  }


  // for click on cross to remove permission start
  removePermission(permission: any) {
    // Remove from selectedPermissions
    const index = this.selectedPermissions.indexOf(permission);
    if (index !== -1) {
      this.selectedPermissions.splice(index, 1);
    }

    // Uncheck from availablePermissionOptions
    const optionIndex = this.availablePermissionOptions.findIndex(opt => opt === permission);
    if (optionIndex !== -1) {
      this.form.get('url').patchValue([...this.form.get('url').value.filter((opt: any) => opt !== permission)]);
    }
  }
  
   // for click on cross to remove permission start
 
  // onPermissionSelectionChange() {
  //   if (this.selectedPermissions.includes("ALL_ACCESS")) {
  //     // If "ALL_ACCESS" is selected, set selectedPermissions to all available options except "NO_ACCESS"
  //     this.selectedPermissions = this.availablePermissionOptions.filter(option => option !== "NO_ACCESS");
  //   }
  // }

  onPermissionSelectionChange() {
    if (this.selectedPermissions.includes("NO_ACCESS")) {
      // If "NO_ACCESS" is selected, set selectedPermissions to an array containing only "NO_ACCESS"
      this.selectedPermissions = ["NO_ACCESS"];
    } else if (this.selectedPermissions.includes("ALL_ACCESS")) {
      // If "ALL_ACCESS" is selected, set selectedPermissions to all available options except "NO_ACCESS"
      this.selectedPermissions = this.availablePermissionOptions.filter(option => option !== "NO_ACCESS");
    }
  }
  

  isOptionDisabled(option: string): boolean {

    if (
      (this.selectedPermissions.includes('NO_ACCESS') && option !== 'NO_ACCESS') ||
      (this.selectedPermissions.includes('ALL_ACCESS') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('ALL_ACCESS') && option !== 'ALL_ACCESS') ||
      (this.selectedPermissions.includes('ALL_EMPLOYEES_DATA') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('NEW_REGISTRATION') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('ALL_EMPLOYEES_ATTENDANCE') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('LEAVE_SHOW_TEAMLEAD') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('WFH_SHOW_TEAMLEAD') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('ALL_WFH_EMPLOYEES') && option === 'NO_ACCESS') ||
      (this.selectedPermissions.includes('VIEW_ALL_LEAVE') && option === 'NO_ACCESS')

    ) {
      return true; // Disable the option
    } else {
      return false; // Enable the option
    }
  }










  openDeletePermission(item: any) {
    this.selectedRole = item;
    this.availablePermissions = item.permissions.map((permission: { permissionName: any; }) => permission.permissionName);
    this.loginService.showTable('removePermission');
  }



  //  shift time start
  formArray: FormArray;
  // shift time 
  addMore(): void {
    // Clone the form values and reset them
    const formValues = { ...this.shiftform.value };
    this.shiftform.reset();

    // Create a new set of form controls with the cloned values
    const newForm = this.formBuilder.group({
      startTime: [formValues.startTime, Validators.required],
      endTime: [formValues.endTime, Validators.required],
      role: [formValues.role, Validators.required]
    });

    // Add the new form group to the form array
    this.formArray.push(newForm);

    console.log("shift", this.formArray.value);
  }

  AssinShift(){

  }
// shift time end



// pagination for view role start
RoleperPage: number = 5;
currentPage: number = 1;



getPaginatedData(): any[] {
  const startIndex = (this.currentPage - 1) * this.RoleperPage;
  const endIndex = startIndex + this.RoleperPage;
  return this.fillterAllRoleData.slice(startIndex, endIndex);
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

getPageNumbersRole(): number[] {
  const totalPages = Math.ceil(
    this.fillterAllRoleData.length / this.RoleperPage
  );
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

changePageRole(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.getTotalPagesRole()) {
    this.currentPage = pageNumber;
  }
}


nextPageRole(): void {
  const totalPages = Math.ceil(
    this.fillterAllRoleData.length / this.RoleperPage
  );
  if (this.currentPage < totalPages) {
    this.currentPage++;
  }
}


getTotalPagesRole(): number {
  return Math.ceil(
    this.fillterAllRoleData.length / this.RoleperPage
  );
}
// pagination for view role end

// pagination for view Employee start
employeeperPage: number = 8;
currentemployeePage: number = 1;



getPaginatedEmpData(): any[] {
  const startIndex = (this.currentemployeePage - 1) * this.employeeperPage;
  const endIndex = startIndex + this.employeeperPage;
  return this.filteredEmployeeData.slice(startIndex, endIndex);
}

previousEmpPage(): void {
  if (this.currentemployeePage > 1) {
    this.currentemployeePage--;
  }
}

getPageNumbersEmp(): number[] {
  const totalPages = Math.ceil(
    this.filteredEmployeeData.length / this.employeeperPage
  );
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

changePageEmp(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.getTotalPagesEmp()) {
    this.currentemployeePage = pageNumber;
  }
}


nextPageEmp(): void {
  const totalPages = Math.ceil(
    this.filteredEmployeeData.length / this.employeeperPage
  );
  if (this.currentemployeePage < totalPages) {
    this.currentemployeePage++;
  }
}


getTotalPagesEmp(): number {
  return Math.ceil(
    this.filteredEmployeeData.length / this.employeeperPage
  );
}
// pagination for view Employee end

// pagination for view team leave start
TeamLeavePageperPage: number = 10;
currentTeamLeavePage: number = 1;



getPaginatedTeamLeaveData(): any[] {
  const startIndex = (this.currentTeamLeavePage - 1) * this.TeamLeavePageperPage;
  const endIndex = startIndex + this.TeamLeavePageperPage;
  return this.fillterTeamLeaveData.slice(startIndex, endIndex);
}

previousTeamLeavePage(): void {
  if (this.currentTeamLeavePage > 1) {
    this.currentTeamLeavePage--;
  }
}

getPageNumbersTeamLeave(): number[] {
  const totalPages = Math.ceil(
    this.fillterTeamLeaveData.length / this.TeamLeavePageperPage
  );
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

changePageTeamLeave(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.getTotalPagesTeamLeave()) {
    this.currentTeamLeavePage = pageNumber;
  }
}


nextPageTeamLeave(): void {
  const totalPages = Math.ceil(
    this.fillterTeamLeaveData.length / this.TeamLeavePageperPage
  );
  if (this.currentTeamLeavePage < totalPages) {
    this.currentTeamLeavePage++;
  }
}


getTotalPagesTeamLeave(): number {
  return Math.ceil(
    this.fillterTeamLeaveData.length / this.TeamLeavePageperPage
  );
}
// pagination for view team leave end

// pagination for view team wfh start
TeamWfhPageperPage: number = 10;
currentTeamWfhPage: number = 1;



getPaginatedTeamWfhData(): any[] {
  const startIndex = (this.currentTeamWfhPage - 1) * this.TeamWfhPageperPage;
  const endIndex = startIndex + this.TeamWfhPageperPage;
  return this.fillterTeamWfhData.slice(startIndex, endIndex);
}

previousTeamWfhPage(): void {
  if (this.currentTeamWfhPage > 1) {
    this.currentTeamWfhPage--;
  }
}

getPageNumbersTeamWfh(): number[] {
  const totalPages = Math.ceil(
    this.fillterTeamWfhData.length / this.TeamWfhPageperPage
  );
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

changePageTeamWfh(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.getTotalPagesTeamWfh()) {
    this.currentTeamWfhPage = pageNumber;
  }
}


nextPageTeamWfh(): void {
  const totalPages = Math.ceil(
    this.fillterTeamWfhData.length / this.TeamWfhPageperPage
  );
  if (this.currentTeamWfhPage < totalPages) {
    this.currentTeamWfhPage++;
  }
}


getTotalPagesTeamWfh(): number {
  return Math.ceil(
    this.fillterTeamWfhData.length / this.TeamWfhPageperPage
  );
}
// pagination for view team wfh end


isGridView = true; // Initial view is grid

listView() {
    this.isGridView = false;
  }

  gridView() {
    this.isGridView = true;
  }

   //API for getting designation start
   designation: string[] = [];
   designations() {

    this.RegisterAndUpdate.getdesignation().subscribe(
      (response: any) => {
        this.designation = response; // Assuming the API response is an array of team leads
console.log("serch designation", this.designation);
        // this.token = response.token;
      },
      (error) => {

      }
    );
  }
  //API for getting designation end


  // sort data in team leave table start
  sortTDate: 'asc' | 'desc' = 'asc';
  sortByToDate(): void {
    this.sortTDate =
      this.sortTDate === 'asc' ? 'desc' : 'asc';

    this.fillterTeamLeaveData.sort((a: any, b: any) => {
      const orderFactor = this.sortTDate === 'asc' ? 1 : -1;
      return (
        orderFactor *
        (new Date(a.toDate).getTime() - new Date(b.toDate).getTime())
      );
    });
  }



  sortFDate: 'asc' | 'desc' = 'asc';
  sortByFromDate(): void {
    this.sortFDate =
      this.sortFDate === 'asc' ? 'desc' : 'asc';

    this.fillterTeamLeaveData.sort((a: any, b: any) => {
      const orderFactor = this.sortFDate === 'asc' ? 1 : -1;
      return (
        orderFactor *
        (new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime())
      );
    });
  }

  sortBy: 'asc' | 'desc' = 'asc';

  sortByWhome(): void {
    // Toggle the sort order
    this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc';
  
    // Sort the positions array based on the approvedBy property
    this.fillterTeamLeaveData.sort((a: any, b: any) => {
      const approvedByA = a.approvedBy || ''; // Default to an empty string if null
      const approvedByB = b.approvedBy || ''; // Default to an empty string if null
  
      const orderFactor = this.sortBy === 'asc' ? 1 : -1;
      return orderFactor * approvedByA.localeCompare(approvedByB);
    });
  }
  
   // sort data in team leave table end

  //  search for team leave table start
   searchTeamLeave: string = '';

 
   FilterTeamLeave() {
    this.fillterTeamLeaveData = this.TeamLeaveData.filter((item: { firstname: string; lastname: string; }) =>
    item.firstname.toLowerCase().includes(this.searchTeamLeave.toLowerCase()) ||
    item.lastname.toLowerCase().includes(this.searchTeamLeave.toLowerCase()) 
     );
   }

   //  search for team leave table end

    // sort data in team wfh table start
  // sortTDate: 'asc' | 'desc' = 'asc';
  sortByTeamToDateWFH(): void {
    this.sortTDate =
      this.sortTDate === 'asc' ? 'desc' : 'asc';

    this.fillterTeamWfhData.sort((a: any, b: any) => {
      const orderFactor = this.sortTDate === 'asc' ? 1 : -1;
      return (
        orderFactor *
        (new Date(a.toDateWfh).getTime() - new Date(b.toDateWfh).getTime())
      );
    });
  }



  // sortFDate: 'asc' | 'desc' = 'asc';
  sortByTeamFromDateWFH(): void {
    this.sortFDate =
      this.sortFDate === 'asc' ? 'desc' : 'asc';

    this.fillterTeamWfhData.sort((a: any, b: any) => {
      const orderFactor = this.sortFDate === 'asc' ? 1 : -1;
      return (
        orderFactor *
        (new Date(a.fromdateWfh).getTime() - new Date(b.fromdateWfh).getTime())
      );
    });
  }

  // sortBy: 'asc' | 'desc' = 'asc';

  sortTeamByWhomeWFH(): void {
    // Toggle the sort order
    this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc';
  
    // Sort the positions array based on the approvedBy property
    this.fillterTeamWfhData.sort((a: any, b: any) => {
      const approvedByA = a.approvedBy || ''; // Default to an empty string if null
      const approvedByB = b.approvedBy || ''; // Default to an empty string if null
  
      const orderFactor = this.sortBy === 'asc' ? 1 : -1;
      return orderFactor * approvedByA.localeCompare(approvedByB);
    });
  }
  
   // sort data in team wfh table end

    // search for team wfh table start
    searchTeamWfh: string = '';
    
  FilterTeamWfh() {
    this.fillterTeamWfhData = this.TeamWfhData.filter((item: { firstname: string; lastname: string; }) =>
    item.firstname.toLowerCase().includes(this.searchTeamWfh.toLowerCase()) ||
    item.lastname.toLowerCase().includes(this.searchTeamWfh.toLowerCase()) 
     );
  }

   // search for team wfh table end


  //  view leave table function start

 // search for  leave table start
 searchLeave: string = '';
    
 FilterLeave() {
   this.fillterLeaveData = this.leaveAdminData.filter((item: { firstname: string; lastname: string; }) =>
   item.firstname.toLowerCase().includes(this.searchLeave.toLowerCase()) ||
   item.lastname.toLowerCase().includes(this.searchLeave.toLowerCase()) 
    );
 }

  // search for leave table end

   // pagination for view  leave start
LeavePageperPage: number = 10;
currentLeavePage: number = 1;



getPaginatedLeaveData(): any[] {
  const startIndex = (this.currentLeavePage - 1) * this.LeavePageperPage;
  const endIndex = startIndex + this.LeavePageperPage;
  return this.fillterLeaveData.slice(startIndex, endIndex);
}

previousLeavePage(): void {
  if (this.currentLeavePage > 1) {
    this.currentLeavePage--;
  }
}

getPageNumbersLeave(): number[] {
  const totalPages = Math.ceil(
    this.fillterLeaveData.length / this.LeavePageperPage
  );
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

changePageLeave(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.getTotalPagesLeave()) {
    this.currentLeavePage = pageNumber;
  }
}


nextPageLeave(): void {
  const totalPages = Math.ceil(
    this.fillterLeaveData.length / this.LeavePageperPage
  );
  if (this.currentLeavePage < totalPages) {
    this.currentLeavePage++;
  }
}


getTotalPagesLeave(): number {
  return Math.ceil(
    this.fillterLeaveData.length / this.LeavePageperPage
  );
}
// pagination for view  leave end

// sort data in leave table start
// sortTDate: 'asc' | 'desc' = 'asc';
sortByToDateLeave(): void {
  this.sortTDate =
    this.sortTDate === 'asc' ? 'desc' : 'asc';

  this.fillterLeaveData.sort((a: any, b: any) => {
    const orderFactor = this.sortTDate === 'asc' ? 1 : -1;
    return (
      orderFactor *
      (new Date(a.toDate).getTime() - new Date(b.toDate).getTime())
    );
  });
}



// sortFDate: 'asc' | 'desc' = 'asc';
sortByFromDateLeave(): void {
  this.sortFDate =
    this.sortFDate === 'asc' ? 'desc' : 'asc';

  this.fillterLeaveData.sort((a: any, b: any) => {
    const orderFactor = this.sortFDate === 'asc' ? 1 : -1;
    return (
      orderFactor *
      (new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime())
    );
  });
}

// sortBy: 'asc' | 'desc' = 'asc';

sortByWhomeLeave(): void {
  // Toggle the sort order
  this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc';

  // Sort the positions array based on the approvedBy property
  this.fillterLeaveData.sort((a: any, b: any) => {
    const approvedByA = a.approvedBy || ''; // Default to an empty string if null
    const approvedByB = b.approvedBy || ''; // Default to an empty string if null

    const orderFactor = this.sortBy === 'asc' ? 1 : -1;
    return orderFactor * approvedByA.localeCompare(approvedByB);
  });
}

 // sort data in leave table end


  //  view leave table function end



    //  view wfh table function start

    // search for  wfh table start
 searchWfh: string = '';
    
 FilterWfh() {
   this.fillterWfhData = this.wfhData.filter((item: { firstname: string; lastname: string; }) =>
   item.firstname.toLowerCase().includes(this.searchWfh.toLowerCase()) ||
   item.lastname.toLowerCase().includes(this.searchWfh.toLowerCase()) 
    );
 }

  // search for wfh table end

   // pagination for view  wfh start
WfhPageperPage: number = 10;
currentWfhPage: number = 1;



getPaginatedWfhData(): any[] {
  const startIndex = (this.currentWfhPage - 1) * this.WfhPageperPage;
  const endIndex = startIndex + this.WfhPageperPage;
  return this.fillterWfhData.slice(startIndex, endIndex);
}

previousWfhPage(): void {
  if (this.currentWfhPage > 1) {
    this.currentWfhPage--;
  }
}

getPageNumbersWfh(): number[] {
  const totalPages = Math.ceil(
    this.fillterWfhData.length / this.WfhPageperPage
  );
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

changePageWfh(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.getTotalPagesWfh()) {
    this.currentWfhPage = pageNumber;
  }
}


nextPageWfh(): void {
  const totalPages = Math.ceil(
    this.fillterWfhData.length / this.WfhPageperPage
  );
  if (this.currentWfhPage < totalPages) {
    this.currentWfhPage++;
  }
}


getTotalPagesWfh(): number {
  return Math.ceil(
    this.fillterWfhData.length / this.WfhPageperPage
  );
}
// pagination for view  wfh end

// sort data in wfh table start
// sortTDate: 'asc' | 'desc' = 'asc';
sortByToDateWfh(): void {
  this.sortTDate =
    this.sortTDate === 'asc' ? 'desc' : 'asc';

  this.fillterWfhData.sort((a: any, b: any) => {
    const orderFactor = this.sortTDate === 'asc' ? 1 : -1;
    return (
      orderFactor *
      (new Date(a.toDateWfh).getTime() - new Date(b.toDateWfh).getTime())
    );
  });
}



// sortFDate: 'asc' | 'desc' = 'asc';
sortByFromDateWfh(): void {
  this.sortFDate =
    this.sortFDate === 'asc' ? 'desc' : 'asc';

  this.fillterWfhData.sort((a: any, b: any) => {
    const orderFactor = this.sortFDate === 'asc' ? 1 : -1;
    return (
      orderFactor *
      (new Date(a.fromdateWfh).getTime() - new Date(b.fromdateWfh).getTime())
    );
  });
}

// sortBy: 'asc' | 'desc' = 'asc';

sortByWhomeWfh(): void {
  // Toggle the sort order
  this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc';

  // Sort the positions array based on the approvedBy property
  this.fillterWfhData.sort((a: any, b: any) => {
    const approvedByA = a.approvedBy || ''; // Default to an empty string if null
    const approvedByB = b.approvedBy || ''; // Default to an empty string if null

    const orderFactor = this.sortBy === 'asc' ? 1 : -1;
    return orderFactor * approvedByA.localeCompare(approvedByB);
  });
}

 // sort data in wfh table end

      //  view wfh table function end

}

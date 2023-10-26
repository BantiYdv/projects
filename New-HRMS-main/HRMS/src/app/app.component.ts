import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';    //for navbar don't show in login page
import { LoginService } from './services/login.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DashboardService } from './services/dashboard.service';
import { AdminService } from './services/admin.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HRMS';

id: any;
  // remove navbar from login page start...
  checkIfLoginPage: any;
  isLoggedIn!: boolean;
  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer, public loginService: LoginService, public dashboardService: DashboardService, public adminService: AdminService) {
    this.checkTokenExpiration();
    // Subscribe to route changes to update the navbar visibility
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check if the current route is the login page
        this.checkIfLoginPage;
      });


    //if user is not login then show only home page or login page start
    this.isLoggedIn = this.loginService.isLoggedIn();
    // if (!this.isLoggedIn) {
    //   if (window.location.pathname !== '' && window.location.pathname !== '/login') {
    //     this.router.navigate(['']);
    //   }
    // }
      //if user is not login then show only home page or login page end
  }



  isLoginPage(): boolean {
    return this.router.url === '/login';
    
  }


  isHomePage(): boolean {
    return this.router.url === '/';
  }


  // default image strat
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; 

  handleImageError(event: any) {
    event.target.src = this.defaultImageURL;
}
// default image end

  //for remove token from local storage in 5 hours start
  checkTokenExpiration() {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (expirationTime && new Date().getTime() > parseInt(expirationTime, 10)) {
      // Token has expired, remove it from local storage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('tokenExpiration');
      const permissionLength = localStorage.getItem('permissionLength');
      const permissionLengthNumber = Number(permissionLength);
      for (let i = 0; i < permissionLengthNumber; i++) {
        localStorage.removeItem("permissions" + `${i}`);
      }
      localStorage.removeItem('role');
      localStorage.removeItem('permissionLength');
      // location.reload();
      this.router.navigate(['/']);

      // Redirect the user to the login page or perform any other necessary action
    } else {
      // Token is still valid, continue checking
      setTimeout(() => this.checkTokenExpiration(), 5000); // Check every 5 seconds
    }
  }
  //for remove token from local storage in 5 hours end
  // remove navbar from login page end...
  showTeamLeaveTable!: any;
  TeamLeaveData:any;
  profileDetails: any;
  imageUrl: SafeUrl | undefined;
  // imageUrl: string = 'path-to-default-image.jpg'; // Set your default image path here

  // Default image URL
  isLoadingImage: boolean = true; // Track the loading state
  defaultImageUrl: string = 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg';

  // public loggedIn= false;
  // role: string ; // Add this line to define the role property

  // constructor(public loginService:LoginService, private http: HttpClient, private router: Router, private sanitizer: DomSanitizer){
  //   // this.role = 'EMPLOYEE';
  // }
// for show side nav bar according to user login with permission start
permissionSet = [
  { name: 'ALL_EMPLOYEES_DATA', router: '/test/employee', function: "employee", imgName: "All Employees", src: '/assets/Group 7.png'},
  { name: 'NEW_REGISTRATION', router: '/registration', function: "registration", imgName: "Registeration", src: '/assets/Group 8.png'},
  { name: 'ALL_EMPLOYEES_ATTENDANCE', router: '/test/viewAllAtt', function: "viewAllAtt", imgName: "All Attendance", src: '/assets/allAtt.png'},
  { name: 'LEAVE_SHOW_TEAMLEAD', router: '/test/teamleave', function: 'teamleave', imgName: "Team Leaves", src: '/assets/Group 9.png' },
  { name: 'WFH_SHOW_TEAMLEAD', router: '/test/teamwfh', function: 'teamwfh', imgName: "Team WFH", src: '/assets/Mask group.png'},
  { name: 'ALL_WFH_EMPLOYEES', router: '/test/viewAllWfh', function: 'viewAllWfh', imgName: "All WFH", src: '/assets/allWfh.png'},
  { name: 'ADMIN_LEAVES', router: '/test/', function: '', imgName: "Admin Leave", src: 'https://cdn-icons-png.flaticon.com/128/5590/5590545.png'},
  { name: 'ADMIN_WFH', router: '/test/', function: '', imgName: "Admin WFH", src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGwlYfdcbTYW72vNkR7gkq8iXUmDEtd0bl_ohNaZZA7RMq92QE'},
  { name: 'VIEW_ALL_LEAVE', router: '/test/viewAllLeave', function: 'viewAllLeave', imgName: "All Leaves", src: '/assets/allLeaves.png'},
]

// for show side nav bar according to user login with permission end
// for show side nav bar according to user login with permission start
userPermissions = this.loginService.getPermission(); // Example user permissions

filteredOptions = this.permissionSet.filter(permission =>
  this.userPermissions.includes(permission.name)

);
// for show side nav bar according to user login with permission end


// click on holiday button to go on holiday calendar div start
scrollToHoliday() {
  const targetElement = document.getElementById('Holidaycal');
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}
// click on holiday button to go on holiday calendar div end


  
  ngOnInit(): void {
    this.getUserPhoto();
    // this.teamleave();
  }

  // for changepassword and view profile not show when i am on profile page start
  isProfilePage():boolean{
    return this.router.url === '/profile';
  }
  // for changepassword and view profile not show when i am on profile page end

  // for changepassword and view profile not show when i am on registeration page start
  isRegisterationPage(): boolean{
    return this.router.url === '/registration';
  }
  // for changepassword and view profile not show when i am on registeration page end


  // isUpdatePage():boolean{
  //   return this.router.url === '/update';
  // }

// API for current image show in navbar start

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

// API for current image show in navbar end

  logoutUser() {
    this.loginService.logOut();
    location.reload();
  }

   //API for sign out end
  signOut() {
    this.loginService.SignOut().subscribe(
      () => {
      
      },
      (error) => {
        // Handle any errors that occur during the logout process.
      
      }
    );
  }
    
  //API for sign out end



// close team leave list start
closeleavelist(): void {
  this.showTeamLeaveTable = false;
}
// close team leave list end


// redirect to main home page according to which user login start
redirectTOHome(){
  const role = localStorage.getItem("role");
    if (role === "SUPERADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/admin']);
    }
}
// redirect to main home page according to which user login end

// API for upload PDF start


onFileChange(event: any) {
  const file = event.target.files[0]; // Get the selected file (assuming single selection)
  if (file && file.type === 'application/pdf') {
    this.dashboardService.uploadPdf(file);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Can not uploaded!',
      text: 'Please select a valid PDF file.',
    });
 
  }
}
// API for upload PDF end

// API for download leave policy start

LeavePolicyPdf() {

  this.adminService.DownloadLeavePolicy().subscribe((response: HttpResponse<Blob>) => {
    if (response.body) {
      const contentDisposition = response.headers.get('content-disposition');
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1]
        : 'LeavePolicy.pdf'; 

      saveAs(response.body, fileName); 
    } else {
      console.error('Response body is null.');
    }
  }, (error) => {
    Swal.fire('Error', error.error, 'error');  
    console.error(error);
  });
 
}

// API for download leave policy end

// API for get all personal docs start

// API for get all personal docs end

// // API for download Docs start

// DownloadDocs(id: number) {

//   this.adminService.DownloadDocs(1).subscribe((response: HttpResponse<Blob>) => {
//     if (response.body) {
//       const contentDisposition = response.headers.get('content-disposition');
//       const fileName = contentDisposition
//         ? contentDisposition.split('filename=')[1]
//         : 'Docs.pdf'; 

//       saveAs(response.body, fileName); 
//     } else {
//       console.error('Response body is null.');
//     }
//   }, (error) => {
//     Swal.fire('Error', error.error, 'error');  
//     console.error(error);
//   });
 
// }

// API for download Docs end


}


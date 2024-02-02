import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { FormBuilder } from '@angular/forms';
import * as saveAs from 'file-saver';
import { filter } from 'rxjs';

// interface BasicInfo{
//   phonenumber:any;
//    address: string;
//   birthDay: string ;
//   maritalStatus: string ;
//   bloodGroup: string ;
//   skills: string ;
//   emergencyContact: any ;
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

  showdocumentTable!: any;
  documentData: any;

  profileDetails: any;
  profileDetailsUser: any;
  // profileUpdateDetails:any;

  phonenumber:any;
  
  // address:any;
  imageUrl: SafeUrl | undefined;
   // Default image URL
   isLoadingImage: boolean = true; // Track the loading state
// default image strat
defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; 
  errorMessage: string = ''; // for invalid image formate

  EmployeeData: any;
  showAllAdminTable: any;

  public address: string = '';
  public birthDay: string = '';
  public maritalStatus: string = '';
  public bloodGroup: string = '';
  public skills: string = '';
  public emergencyContact: string = '';
  // router: any;
  item: any;
  id: any;

  // when add profile then show basic info in form start
  // @ViewChild('phonenumber') phonenumberInfo: ElementRef | any;
  @ViewChild('maritalStatus') maritalStatusInfo: ElementRef | any;
  @ViewChild('bloodGroup') bloodGroupInfo: ElementRef | any;
  @ViewChild('skills') skillsInfo: ElementRef | any;
  // @ViewChild('emergencyContact') emergencyContactInfo: ElementRef | any;
  // @ViewChild('address') addressInfo: ElementRef | any;


  // when add profile then show basic info in form end

  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public loginService: LoginService, public profileService: ProfileService, public dashboardService: DashboardService, public testService: TestService, private route: ActivatedRoute, public RegisterAndUpdate: RegisterAndUpdateService, private router: Router, private _formBuilder: FormBuilder) {

// Initialize the imageUrl with the default image URL as a SafeUrl object
// this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.defaultImageUrl);
this.getUserPhoto();
  }


  closeForm() {
    const role = localStorage.getItem("role");
    if (role === "SUPERADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/admin']);
    }

  }


  showEditForm: boolean = false;

  // when click on edit button then delete button disable start

  toggleEditForm(open: boolean): void {
    this.showEditForm = open;
  }
// when click on edit button then delete button disable end


  // API for show profile data start
 
  saveChanges() {
    // Implement saving changes functionality when the "Save" button is clicked
    console.log('Changes saved:', this.profileDetails);
    // You can add logic here to save the updated profileDetails
    // For example, call an API to update the user's data
    // this.userService.updateProfileDetails(this.profileDetails).subscribe(response => {
    //   // Handle the response after the data is updated
    // });
    this.showEditForm = false; // Hide the form after saving changes
  }

  ngOnInit() {
    this.viewProfile();
    this.fetchProfileDetails();
    this.getUserPhoto();
    // this.particulardetail();
    // this.EmployeeProfile(this.item);
    this.userProfile();
    this.BasicInfo();
    this.openEmployee();

     // data show change routing without reload start
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Call the method to load data on route change
      this.loadData();
    });
    // data show change routing without reload end


this.checkRouteAndLoadData();
  }

  // check routing for reload page start
  checkRouteAndLoadData(): void { 
    const currentRoute = this.router.url;
    const cleanedRoute = this.removeProfileAndQueryParams(currentRoute); // Remove "profile/" and query parameters
    console.log("check data url", cleanedRoute);
  
    if (currentRoute.includes(cleanedRoute)) {   
      this.loginService.showTable(cleanedRoute);
    }
  }
  
  removeProfileAndQueryParams(route: string): string {
    const parts = route.split('?'); // Split the route into path and query parameters
    const pathWithoutProfile = parts[0].replace('/profile/', ''); // Remove "profile/" from the path
    return pathWithoutProfile;
  }
  
  
  // check routing for reload page end

  // data show change routing without reload start
  loadData(): void {
    // Get the current route
    const currentRoute = this.router.url;
console.log("load data url",currentRoute)
    // Your logic to load data based on the route
    switch (currentRoute) {
      case '/profile/Profile':
        this.viewProfile();
        break;
      case '/profile/viewProfile':
        this.userProfile();
        break;
      
      default:
        // Handle any other routes or add additional logic as needed
        break;
    }
  }
  // data show change routing without reload end

  // viewProfile(){

  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);
  
  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  //      // Fetch the team leads from the API endpoint
  //      this.http.get('http://192.168.1.11:9191/show',{ headers })
  //      .subscribe(
  //        (response) => {
  //         this.profileDetails = response;
  //         // console.log("data",response);
          
          
  //        },
  //        (error) => {
  //          console.error('Failed to fetch team leads:', error);
  //        }
  //    );
  // }
     
  viewProfile() {
    // Call the getShowData function from the service to fetch data
    // if ('/profile/Profile' === this.router.url) {
    this.profileService.getShowData().subscribe(
      (response: any) => {
        this.profileDetails = response;
        console.log("data >>>>>>", response);
       
      },
      (error) => {
        console.error('Failed to fetch data:', error);
      }
    );
    // }
  }

 
// API for show profile data end

// API for show user Profile to admin / super admin start

userProfile(): void {
  this.route.queryParams.subscribe(params => {
    const id = params['id'];

    if (id) {
      // Use the 'id' variable to fetch data
      this.RegisterAndUpdate.fetchData(+id).subscribe(
        (response) => {
          console.log('User Profile:', response);
          // Handle the response and update the input fields accordingly
          this.profileDetailsUser = response;
          console.log("profile", this.profileDetailsUser);
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error here
        }
      );
    } else {
      console.error('Employee ID not found in URL');
    }
  });

}
// API for show user Profile to admin / super admin end



// DownloadDocs(id: number, filename: string) {

//   this.route.queryParams.subscribe(params => {
//     const id = params['id'];
//     const formData = new FormData();
   
//     // Append the selected files to the FormData object
   
//     formData.append('academicDocument1', this.profileDetailsUser.academicDocument1);
   

//     if (id) {
//       console.log("id docs", id);
//       this.profileService.DownloadDocs(id, filename).subscribe((response: HttpResponse<Blob>) => {
//         if (response.body) {
         
    
//           saveAs(response.body, filename); 
//           console.log("document", response);
//         } else {
//           console.error('Response body is null.');
//         }
//       }, (error) => {
//         Swal.fire('Error', error.error, 'error');  
//         console.error(error);
//       });
//     } else {
//       console.error('Employee ID not found in URL');
//     }
//   });

// }


DownloadDocs(id: number, filename: string) {
  // Fetch the user details to access first and last name
  const firstName = this.profileDetailsUser?.firstname || '';
  const lastName = this.profileDetailsUser?.lastname || '';

  // Concatenate the first name, last name, and desired filename extension
  const concatenatedFilename = filename + firstName + lastName + '.' + filename.split('.').pop();

  if (id) {
    console.log("id docs", id);
    this.profileService.DownloadDocs(id, filename).subscribe((response: HttpResponse<Blob>) => {
      if (response.body) {
        saveAs(response.body, concatenatedFilename);
        console.log("document", response);
      } else {
        console.error('Response body is null.');
      }
    }, (error) => {
      Swal.fire('Error', error.error, 'error');
      console.error(error);
    });
  } else {
    console.error('Employee ID not found in URL');
  }
}


    //  API for Edit profile data start
    // editProfile() {
    //   const token = localStorage.getItem('jwtToken');
    //   console.log('Token:', token);
    
    //   // Set the token in the request headers
    //   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
    
    //   // Prepare the data to be sent in the request body
    //   const requestBody = {
    //     phonenumber: this.phonenumber, 
    //     // birthDay: this.birthDay, 
    //     maritalStatus: this.maritalStatus,
    //     bloodGroup: this.bloodGroup, 
    //     skills: this.skills, 
    //     emergencyContact: this.emergencyContact, 
    //     address: this.address 
    //   };
    
    //   // Send the PUT request to update the user profile
    //   this.http.post('http://192.168.1.11:9191/edituser', requestBody, { headers })
    //     .subscribe(
    //       () => {
    //         // Swal.fire('Edit!', 'Your Basic Information Edited successfully!', 'success');
           
    //         // this.router.navigate(['/profile']);
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'Edit!',
    //           text: 'Your Basic Information Edited successfully!',
    //         })
    //         .then(() => {
    //           // Refresh page 
    //           location.reload();
    //         });
    //       },
    //       (error) => {
    //         if (error.status === 400) {
    //           Swal.fire('Error!', 'PhoneNumber and EmergencyContact cannot be the same!', 'error');
    //         }
    //         console.error('Failed to edit profile:', error);
    //       }
    //     );
    // }
    
// download one document end

    // download all docs start
    // AllDocsDownload() {

    //   this.route.queryParams.subscribe(params => {
    //     const id = params['id'];
   
      
    //       console.log("id docs", id);
    //       this.profileService.getAllDocs(id).subscribe((response) => {
    //         console.log("all docs", response);
    //       }, (error) => {
    //         Swal.fire('Error', error.error, 'error');  
    //         console.error(error.error.text);
    //       });
       
    //   });
    // }
    AllDocsDownload() {
      this.route.queryParams.subscribe(params => {
        const id = params['id'];
    
        if (id) {
          console.log("id docs", id);
          this.profileService.getAllDocs(id).subscribe((response: Blob) => {
            saveAs(response, 'allDocuments.zip'); // Save the received blob as a file
            console.log("all docs", response);
          }, (error) => {
            Swal.fire('Error', error.error, 'error');
            console.error(error.error.text);
          });
        } else {
          console.error('Employee ID not found in URL');
        }
      });
    }
    // download all docs end
    
    editProfile() {
   

      // Prepare the data to be sent in the request body
      const requestBody = {
        // phonenumber: this.phonenumberInfo.nativeElement.value,
        // birthDay: this.birthDayInfo.nativeElement.value,
        maritalStatus: this.maritalStatusInfo.nativeElement.value,
        bloodGroup: this.bloodGroupInfo.nativeElement.value,
        skills: this.skillsInfo.nativeElement.value,
        // emergencyContact: this.emergencyContactInfo.nativeElement.value,
        // address: this.addressInfo.nativeElement.value
      };
  console.log("request body", requestBody);
      // Call the service method to edit the user profile
      this.profileService.editUserProfile(requestBody).subscribe(
        (response) => {
          Swal.fire('Edit!', 'Your Basic Information Edited successfully!', 'success');
          this.router.navigate(['/profile', 'Profile']);
          this.profileDetails = true;
      this.viewProfile();
      this.loginService.showTable('Profile')
      console.log("hajsuyeuwyeu", response);
        },
        (error) => {
          console.error('Failed to edit profile:', error);
        }
      );
    }


    // API for show updated details start
    
    // fetchProfileDetails() {
    //   const token = localStorage.getItem('jwtToken');
    //   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
    
    //   this.http.get('http://192.168.1.11:9191/oneuserpersonalDetailes', { headers }).subscribe(
    //     (response: any) => {
    //       // this.profileUpdateDetails = response;
          
          
    //       this.phonenumber = response[0].phonenumber;
    //       this.maritalStatus = response[0].maritalStatus;
    //       this.bloodGroup = response[0].bloodGroup;
    //       this.skills = response[0].skills;
    //       this.emergencyContact = response[0].emergencyContact;
    //       this.address = response[0].address;
    //       console.log("<<<<<<<<<updated>>>>>>>>>",response);
          
    //     },
    //     (error) => {
    //       console.error('Failed to fetch data:', error);
    //     }
    //   );
    // }
    
    fetchProfileDetails() {
      this.profileService.personaldetail().subscribe(
        (response: any) => {
          this.maritalStatus = response[0].maritalStatus;
          this.bloodGroup = response[0].bloodGroup;
          this.skills = response[0].skills;
          console.log("<<<<<<<<<updated>>>>>>>>>", response);
         
        },
        (error) => {
          console.error('Failed to fetch data:', error);
        }
      );
    }
    // API for show updated details end

    // API for show user basic info start
    BasicInfo(){
      this.route.queryParams.subscribe(params => {
        const id = params['id'];
    console.log("User Basic Info id", id);
        if (id) {
          // Use the 'id' variable to fetch data
          this.profileService.userBasicInfo(id).subscribe(
            (response) => {
              
              // Handle the response and update the input fields accordingly
              this.profileDetailsUser = response;
              console.log("User Basic Info", response);
              console.log("profile Basic Info", this.profileDetailsUser);
            },
            (error) => {
              // Swal.fire('Error', error.error, 'error');  
              
            }
          );
        } else {
          console.error('Employee ID not found in URL');
        }
      });
    }
    // API for show user basic info end




    // API for upload image start
  //   handleFileInput(event: any) {
  //     const token = localStorage.getItem('jwtToken');
  //     console.log('Upload:', token);
    
  //     // Set the token in the request headers
  //     const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  //     const file: File = event.target.files[0];

  //      // Check if the file format is JPG, JPEG, or PNG
  // const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
  // if (!allowedFormats.includes(file.type)) {
  //   this.errorMessage = 'Invalid file format. Please upload a JPG, JPEG, or PNG image.';
  //   setTimeout(() => {
  //     this.errorMessage = ''; // Clear the error message after 2 seconds
  //   }, 2000); // Set the timeout to 2 seconds (2000 milliseconds)
  //   return;
  // }
  //     const formData: FormData = new FormData();
  //     formData.append('photo', file);
  //   console.log("formdata", formData);
  //     this.http.post('http://192.168.1.11:9191/upload-photo', formData, { headers }).subscribe(response => {
  //       // Handle the response from the server after image upload
  //       // this.router.navigate(['/profile', ' ']);
  //       console.log(response);
        
  //     }, (error) => {
  //       console.error('API error:', error);
  //       // Handle the error here
  //       location.reload();
  //       // this.router.navigate(['/profile', ' ']);
  //     }
  //     );
  //   }

  firstname: string = ''; // Replace with user's first name
  lastname: string = ''; // Replace with user's last name

  generateDefaultImage(): string {
    if (this.profileDetails.firstname && this.profileDetails.lastname) {
      const initials = this.profileDetails.firstname.charAt(0) + this.profileDetails.lastname.charAt(0);
      return `https://via.placeholder.com/150/8790bf/FFFFFF/?text=${initials}`;
    } else {
      return 'https://via.placeholder.com/150/8790bf/FFFFFF/?text=User';
    }
  }

  generateDefaultImageUser(): string {
    if (this.profileDetailsUser.firstname && this.profileDetailsUser.lastname) {
      const initials = this.profileDetailsUser.firstname.charAt(0) + this.profileDetailsUser.lastname.charAt(0);
      return `https://via.placeholder.com/150/8790bf/FFFFFF/?text=${initials}`;
    } else {
      return 'https://via.placeholder.com/150/8790bf/FFFFFF/?text=User';
    }
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];

    // Check if the file format is JPG, JPEG, or PNG
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedFormats.includes(file.type)) {
      this.errorMessage = 'Invalid file format. Please upload a JPG, JPEG, or PNG image.';
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 2 seconds
      }, 2000); // Set the timeout to 2 seconds (2000 milliseconds)
      return;
    }

    this.profileService.uploadPhoto(file).subscribe(
      (response) => {
        // Handle the response from the server after image upload
        Swal.fire('Success!', 'Image successfully uploaded!', 'success');
        
this.getUserPhoto();
        console.log("photo upload>>>>>>",response);
      },
      (error) => {
        console.error('API error:', error);
        // Handle the error here
        Swal.fire('Error', 'Image upload failed.', 'error');
      }
    );
  }
    // API for upload image end


  //   EmployeeProfile(item: any): void {
  //   this.route.queryParams.subscribe(params => {
  //     const id = params['id'];

  //     if (id) {
  //       // Use the 'id' variable to fetch data
  //       this.RegisterAndUpdate.empdetails(id).subscribe(
  //       (response: any) => {
  //         const dataArray = Object.values(response);
       
  //         const reversedData = dataArray.reverse();
  //         console.log("aaaaaaaa>>>>", response);
  //               // Set the reversed array as the data source
  //               this.profileDetails = reversedData;
  //               console.log(">>>>>>>>>>>>>>", this.profileDetails);
  //         },
  //         (error) => {
  //           console.error('Error:', error);
  //           // Handle the error here
  //         }
  //       );
  //     } else {
  //       console.error('Employee ID not found in URL');
  //     }
  //   });
  // }
    // EmployeeProfile(item: any): void {
    //   // Assuming 'item' has an 'id' property
    //   const id = item.id;
    //   console.log("id", id);
    //   this.testService.empdetails(id).subscribe(
    //     (response: any) => {
    //       // Convert the response object to an array
    //       const dataArray = Object.values(response);
    //       // Reverse the received array
    //       const reversedData = dataArray.reverse();
    // console.log("aaaaaaaa>>>>", response);
    //       // Set the reversed array as the data source
    //       this.profileDetails = reversedData;
    //       console.log(">>>>>>>>>>>>>>", this.profileDetails);
    //     },
    //     (error) => {
    //       console.error('Failed to fetch employee details:', error);
    //     }
    //   );
    // }
    
    // API for current image start
    // getUserPhoto(): void {
    //   const apiUrl = 'http://192.168.1.11:9191/photo/current';
    //   const token = localStorage.getItem('jwtToken');
    // console.log("current", token);

    //   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
    
    
    //   this.http.get(apiUrl, { headers, responseType: 'blob' }).subscribe(
    //     (response: Blob) => {
    //       const objectURL = URL.createObjectURL(response);
    //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.error('API error:', error);
    //       // Handle the error here
    //     }
    //   );
    // }
    getUserPhoto(): void {
      this.loginService.getCurrentPhoto().subscribe(
        (response: Blob) => {
          const objectURL = URL.createObjectURL(response);
          this.imageUrl = objectURL;
        },
        (error) => {
          console.error('API error:', error);
          // Handle the error here
        }
      );
    }
    // getUserPhoto(): void {
    //   const apiUrl = 'http://192.168.1.11:9191/photo/current';
    //   const token = localStorage.getItem('jwtToken');
    //   console.log("current", token);
  
    //   // if (token) {
    //   //   // If the token is not available, set the default image and stop loading
    //   //   this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.defaultImageUrl);
    //   //   this.isLoadingImage = false;
    //   //   return;
    //   // }
  
    //   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
    //   this.http.get(apiUrl, { headers, responseType: 'blob' }).subscribe(
    //     (response: Blob) => {
    //       if (response) {
    //         const objectURL = URL.createObjectURL(response);
    //         this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    //       } else {
    //         // If the API response is empty or null, set the default image and stop loading
    //         this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.defaultImageUrl);
    //       }
    //       this.isLoadingImage = false; // The image loading is complete
    //       console.log("photoshow",response);
    //     },
    //     (error) => {
    //       console.error('API error:', error);
    //       // If the API call fails, set the default image and stop loading
    //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.defaultImageUrl);
    //       this.isLoadingImage = false;
    //       // Handle the error here
    //     }
    //   );
    // }
    // API for current image end


    // API for delete personal information start
    // deletePersonalData(): void{
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: "Are you sure you want delete this data ?",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
        
    //       const token = localStorage.getItem('jwtToken'); 
    //       const headers = new HttpHeaders().set('Authorization', ` ${token}`);
    //       // const urlParams = new URLSearchParams(window.location.search);
    //       // const employeeId = urlParams.get('id')
    //       const updateUrl = `http://192.168.1.11:9191/deleteMydetail`;
    
    //       this.http.delete(updateUrl, { headers }).subscribe(
    //         () => {
    //           console.log('Basic Information deleted successfully.');
    //           Swal.fire({
    //             title: 'Deleted!',
    //             text: 'Basic Information has been deleted.',
    //             icon: 'success'
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               location.reload();
    //               this.router.navigate(['/profile']);
    //             }
    //           });
    //         },
    //         (error) => {
    //           console.error('An error occurred while deleting the Basic Information:', error);
    //         }
    //       );
    //     }
    //   });
    // }
    deletePersonalData(): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.profileService.deletePersonalDetails().subscribe(
            () => {
              console.log('Basic Information deleted successfully.');
              Swal.fire({
                title: 'Deleted!',
                text: 'Basic Information has been deleted.',
                icon: 'success'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/profile', 'Profile']);
          this.profileDetails = true;
      this.viewProfile();
      this.loginService.showTable('Profile')
                  
                }
              });
            },
            (error) => {
              console.error('An error occurred while deleting the Basic Information:', error);
            }
          );
        }
      });
    }
    // API for delete personal information end


    // API for download Docs start

// DownloadDocs(id: number) {

//   this.testService.DownloadDocs(1).subscribe((response: HttpResponse<Blob>) => {
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

openEmployee(): void {
  this.showAllAdminTable = !this.showAllAdminTable;
  

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

// show documnets of employee to admin start
isJoiningDetailsVisible: boolean = true;
isDocumentsVisible: boolean = false;

showJoiningDetails() {
    this.isJoiningDetailsVisible = true;
    this.isDocumentsVisible = false;
}

showDocuments() {
    this.isJoiningDetailsVisible = false;
    this.isDocumentsVisible = true;
}


documentsArray = [
  { property: 'academicDocument1', label: '10th marksheet', fileNamePrefix: '10th_Marksheet_', fileName: 'academicDocument1.pdf' },
  { property: 'academicDocument2', label: '12th marksheet', fileNamePrefix: '12th_Marksheet_', fileName: 'academicDocument2.pdf' },
  { property: 'academicDocument3', label: 'Gradutaion Marksheet', fileNamePrefix: 'Gradutaion_Marksheet_', fileName: 'academicDocument3.pdf' },
  { property: 'academicDocument4', label: 'Higher Education Marksheet', fileNamePrefix: 'Higher_Education_Marksheet_', fileName: 'academicDocument4.pdf' },
  { property: 'signature', label: 'Signature', fileNamePrefix: 'Signature_', fileName: 'signature.png' },
  { property: 'aadharCard', label: 'Aadhar Card', fileNamePrefix: 'AadharCard_', fileName: 'aadharCard.pdf' },
  { property: 'panCard', label: 'Pan Card', fileNamePrefix: 'PanCard_', fileName: 'panCard.pdf' },
  { property: 'offerLetter', label: 'offer Letter', fileNamePrefix: 'offerLetter_', fileName: 'offerLetter.pdf' },
  { property: 'relievingLetter', label: 'Relieving Letter', fileNamePrefix: 'Relieving_Letter_', fileName: 'RelievingLetter.pdf' },
  { property: 'experienceLetter', label: 'Experience Letter', fileNamePrefix: 'Experience_Letter_', fileName: 'ExperienceLetter.pdf' },
  { property: 'salarySlip1', label: 'Salary Slip', fileNamePrefix: 'Salary_Slip_', fileName: 'salarySlip1.pdf' },
  { property: 'userImage', label: 'User Image', fileNamePrefix: 'User_Image_', fileName: 'userImage.png' }
];

getDocumentsArray(): any[] {
  return this.documentsArray.filter(document => this.profileDetailsUser[document.property]);
}



getDocumentIndex(document: any): number {
  const filteredDocuments = this.getDocumentsArray();
  return filteredDocuments.indexOf(document) + 1;
}

getDocumentsArrayProfile(): any[] {
  return this.documentsArray.filter(document => this.profileDetails[document.property]);
}
getDocumentIndexProfile(document: any): number {
  const filteredDocuments = this.getDocumentsArrayProfile();
  return filteredDocuments.indexOf(document) + 1;
}
// show documnets of employee to admin end

// delete documents start

deleteDocs(id: any, documentType: any): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure you want to delete this document?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.profileService.deleteDocs(id, documentType).subscribe(
        () => {
          
          Swal.fire({
            title: 'Deleted!',
            text: 'Document has been deleted.',
            icon: 'success'
          }).then((result) => {
  //           if (result.isConfirmed) {
  //             this.router.navigate(['/profile', 'viewProfile']);
  //     this.profileDetails = true;
      this.userProfile();
  // this.loginService.showTable('viewProfile')
              
  //           }
          });
        },
        (error) => {
          console.error('An error occurred while deleting the document:', error);
        }
      );
    }
  });
}
// delete documents end

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';


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

  
  public address: string = '';
  public birthDay: string = '';
  public maritalStatus: string = '';
  public bloodGroup: string = '';
  public skills: string = '';
  public emergencyContact: string = '';
  // router: any;
  item: any;

  // when add profile then show basic info in form start
  @ViewChild('phonenumber') phonenumberInfo: ElementRef | any;
  @ViewChild('maritalStatus') maritalStatusInfo: ElementRef | any;
  @ViewChild('bloodGroup') bloodGroupInfo: ElementRef | any;
  @ViewChild('skills') skillsInfo: ElementRef | any;
  @ViewChild('emergencyContact') emergencyContactInfo: ElementRef | any;
  @ViewChild('address') addressInfo: ElementRef | any;


  // when add profile then show basic info in form end

  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public loginService: LoginService, public profileService: ProfileService, public dashboardService: DashboardService, public testService: TestService, private route: ActivatedRoute, public RegisterAndUpdate: RegisterAndUpdateService, private router: Router) {

// Initialize the imageUrl with the default image URL as a SafeUrl object
// this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.defaultImageUrl);
this.getUserPhoto();
  }


  


  // API for show profile data start

  ngOnInit() {
    this.viewProfile();
    this.fetchProfileDetails();
    this.getUserPhoto();
    // this.particulardetail();
    this.EmployeeProfile(this.item);
    this.userProfile();
    this.BasicInfo();
  
    // Get the token from localStorage
  }


  // viewProfile(){

  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);
  
  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
    this.dashboardService.getShowData().subscribe(
      (response: any) => {
        this.profileDetails = response;
        console.log("data >>>>>>", response);
       
      },
      (error) => {
        console.error('Failed to fetch data:', error);
      }
    );
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


    //  API for Edit profile data start
    // editProfile() {
    //   const token = localStorage.getItem('jwtToken');
    //   console.log('Token:', token);
    
    //   // Set the token in the request headers
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
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
    
    
    editProfile() {
   

      // Prepare the data to be sent in the request body
      const requestBody = {
        phonenumber: this.phonenumberInfo.nativeElement.value,
        // birthDay: this.birthDayInfo.nativeElement.value,
        maritalStatus: this.maritalStatusInfo.nativeElement.value,
        bloodGroup: this.bloodGroupInfo.nativeElement.value,
        skills: this.skillsInfo.nativeElement.value,
        emergencyContact: this.emergencyContactInfo.nativeElement.value,
        address: this.addressInfo.nativeElement.value
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
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
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
          this.phonenumber = response[0].phonenumber;
          this.maritalStatus = response[0].maritalStatus;
          this.bloodGroup = response[0].bloodGroup;
          this.skills = response[0].skills;
          this.emergencyContact = response[0].emergencyContact;
          this.address = response[0].address;
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
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
        Swal.fire('Success!', 'Image uploaded successfully!', 'success');
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


    EmployeeProfile(item: any): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      if (id) {
        // Use the 'id' variable to fetch data
        this.RegisterAndUpdate.empdetails(id).subscribe(
        (response: any) => {
          const dataArray = Object.values(response);
       
          const reversedData = dataArray.reverse();
          console.log("aaaaaaaa>>>>", response);
                // Set the reversed array as the data source
                this.profileDetails = reversedData;
                console.log(">>>>>>>>>>>>>>", this.profileDetails);
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

    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    
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
  
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
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
    //       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
}

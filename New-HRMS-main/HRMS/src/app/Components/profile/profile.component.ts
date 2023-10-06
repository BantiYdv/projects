import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';


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
  router: any;
  item: any;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public loginService: LoginService, public profileService: ProfileService, public dashboardService: DashboardService, public testService: TestService, private route: ActivatedRoute, public RegisterAndUpdate: RegisterAndUpdateService) {

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
  
    // Get the token from localStorage
  }


 
     
  viewProfile() {
    // Call the getShowData function from the service to fetch data
    this.dashboardService.getShowData().subscribe(
      (response: any) => {
        this.profileDetails = response;
    
       
      },
      (error) => {
      
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
        
          // Handle the response and update the input fields accordingly
          this.profileDetailsUser = response;
         
        },
        (error) => {
         
          // Handle the error here
        }
      );
    } else {
     
    }
  });

}
// API for show user Profile to admin / super admin end

// API for show user basic info start
BasicInfo(){
  this.route.queryParams.subscribe(params => {
    const id = params['id'];

    if (id) {
      // Use the 'id' variable to fetch data
      this.profileService.userBasicInfo(id).subscribe(
        (response) => {
          
          // Handle the response and update the input fields accordingly
          this.profileDetailsUser = response;
         
        },
        (error) => {
          // Swal.fire('Error', error.error, 'error');  
          
        }
      );
    } else {
     
    }
  });
}
// API for show user basic info end

   
    
    editProfile() {
   

      // Prepare the data to be sent in the request body
      const requestBody = {
        phonenumber: this.phonenumber,
        birthDay: this.birthDay,
        maritalStatus: this.maritalStatus,
        bloodGroup: this.bloodGroup,
        skills: this.skills,
        emergencyContact: this.emergencyContact,
        address: this.address
      };
  
      // Call the service method to edit the user profile
      this.profileService.editUserProfile(requestBody).subscribe(
        () => {
          Swal.fire('Edit!', 'Your Basic Information Edited successfully!', 'success');
          // Optionally, you can reload the profile data or perform any other action after the update
        },
        (error) => {
        
        }
      );
    }


    
    fetchProfileDetails() {
      this.profileService.personaldetail().subscribe(
        (response: any) => {
          this.phonenumber = response[0].phonenumber;
          this.maritalStatus = response[0].maritalStatus;
          this.bloodGroup = response[0].bloodGroup;
          this.skills = response[0].skills;
          this.emergencyContact = response[0].emergencyContact;
          this.address = response[0].address;
        
          
        },
        (error) => {
         
        }
      );
    }
    // API for show updated details end

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
       
      },
      (error) => {
       
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
         
                // Set the reversed array as the data source
                this.profileDetails = reversedData;
               
          },
          (error) => {
           
            // Handle the error here
          }
        );
      } else {
        
      }
    });
  }
    
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
             
            }
          );
        }
      });
    }
    // API for delete personal information end
}



import { Component, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hide = true;
  login = {
    username: '',
    password: ''
  }
  showPassword: boolean = false;
  togglePasswordVisibility(event: Event) {
    const target = event.target as HTMLInputElement;
    this.showPassword = target.checked;
  }
  constructor(private loginService: LoginService, private router: Router, private http: HttpClient, private snack: MatSnackBar,private formBuilder: FormBuilder, private elementRef: ElementRef) {
     //for change password modal start
     this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      // newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordPatternValidator()]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
    // for change password modal end
   }

  // for change password modal start
  passwordForm: any;              //for change password
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

  // for change password modal end
  ngAfterViewInit() {
    // Get the animated images
    const animatedImages = this.elementRef.nativeElement.querySelectorAll('.animated-image');

    // Add a class to pause the animation after it runs once
    animatedImages.forEach((img: HTMLElement) => {
      img.addEventListener('animationiteration', () => {
        img.classList.add('paused-animation');
      });
    });
  }
   //API for change Password start

   changePassword() {

    const oldPassword = this.passwordForm.get('oldPassword').value;
    const newPassword = this.passwordForm.get('newPassword').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value;

    // Call the service method to change the password
    this.loginService.changePassword(oldPassword, newPassword, confirmPassword).subscribe(
      () => {
        this.isChangePasswordModalOpen = false;
        Swal.fire({
          title: 'Changed',
          text: 'Password changed successfully',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          // Redirect based on user role

          localStorage.removeItem('jwtToken');
          localStorage.removeItem('permissionLength');
          this.router.navigate(['/login']);
          location.reload();
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

  isChangePasswordModalOpen = false;
  // onSubmit() {
  //   if (
  //     this.login.username.trim() == '' ||
  //     this.login.username == null
  //   ) {
  //     this.snack.open('Username is required !!', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  //   if (
  //     this.login.password.trim() == '' ||
  //     this.login.password == null
  //   ) {
  //     this.snack.open('Pasword is required !!', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }

  //   if (this.login.username && this.login.password) {
  //     this.loginService.signin(this.login.username, this.login.password).subscribe(
  //       (response: any) => {
         
  //         const token = response.jwtToken;
  //         localStorage.setItem("jwtToken", token);
  //         const role = response.registration.role;
  //         localStorage.setItem("role", role.name);
  //         const userLoggedIn = response.registration.userLoggedIn; // Correct property access
  //       // localStorage.setItem("isUserLogin", userLoggedIn.toString()); // Store as a string
  //       console.log("is user login", userLoggedIn);

  //         localStorage.setItem("permissionLength", role.permissions.length);
  //         for (let i = 0; i < role.permissions.length; i++) {
  //           localStorage.setItem("permissions"+ `${i}`, role.permissions[i].permissionName);
  //         }
  //        console.log("login response", response);

        
  //             // Redirect based on user role

  //             if (!userLoggedIn && role.name != 'SUPERADMIN') {
               
  //               this.isChangePasswordModalOpen = true;
  //             } else {
  //               Swal.fire({
  //                 icon: 'success',
  //                 title: 'Successfully Login',
  //                 text: 'You have successfully logged in!',
  //                 showConfirmButton: false,
  //                 timer: 1000 // Display for 1 second
  //               }).then(() => {

  //                 // Redirect based on user role
  //                 this.redirectBasedOnRole(role.name);
  //               })
  //             }
  //             // this.redirectBasedOnRole(role.name);
              

           

  //       },

  //     //   if (userLoggedIn) { // Display success message only if user is logged in
  //     //     Swal.fire({
  //     //       icon: 'success',
  //     //       title: 'Successfully Login',
  //     //       text: 'You have successfully logged in!',
  //     //       showConfirmButton: false,
  //     //       timer: 1000 // Display for 1 second
  //     //     }).then(() => {
  //     //       // Redirect based on user role
  //     //       console.log("role", role.name);
  //     //       if (!userLoggedIn) {
  //     //         this.isChangePasswordModalOpen = true;
              
  //     //       } else {
  //     //         // Redirect based on user role
  //     //         this.redirectBasedOnRole(role.name);
  //     //       }
  //     //     });
  //     //   } 
  //     //   else {
  //     //     if (!userLoggedIn) {
  //     //       this.isChangePasswordModalOpen = true;
  //     //     }
  //     //   }
  //     // },
  //       (error: any) => {
  //         if (error.status === 400) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Internal Server Error',
  //             text: 'Oops! Something went wrong on the server. Please try again later.',
  //           });
  //         } else if (error.status === 500) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Failed to Login',
  //             text: 'Invalid Username or Password. Please try again.',
  //           });
  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'An error occurred. Please try again.',
  //           });
  //         }
  //       }
  //     );

  //   } else {
  //     alert('Fields are empty');
  //   }
    
  // }
  onSubmit() {
    if (
      this.login.username.trim() == '' ||
      this.login.username == null
    ) {
      this.snack.open('Username is required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (
      this.login.password.trim() == '' ||
      this.login.password == null
    ) {
      this.snack.open('Pasword is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.login.username && this.login.password) {
      this.loginService.signin(this.login.username, this.login.password).subscribe(
        (response: any) => {
          const token = response.jwtToken;
          localStorage.setItem("jwtToken", token);
          const role = response.registration.role;
          this.redirectBasedOnRole(role.name);
          localStorage.setItem("role", role.name);
          const userLoggedIn = response.registration.userLoggedIn; // Correct property access
       
        console.log("is user login", userLoggedIn);

        
        if (!userLoggedIn && role.name != 'SUPERADMIN') {
               
          this.isChangePasswordModalOpen = true;
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Login',
            text: 'You have successfully logged in!',
            showConfirmButton: false,
            timer: 1000 // Display for 1 second
          })
        }

          localStorage.setItem("permissionLength", role.permissions.length);
          for (let i = 0; i < role.permissions.length; i++) {
            localStorage.setItem("permissions"+ `${i}`, role.permissions[i].permissionName);
          }
         console.log("login response", response);


        },

   
        (error: any) => {
          if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Internal Server Error',
              text: 'Oops! Something went wrong on the server. Please try again later.',
            });
          } else if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Failed to Login',
              text: 'Invalid Username or Password. Please try again.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred. Please try again.',
            });
          }
        }
      );

    } else {
      alert('Fields are empty');
    }
    
  }

  //forget password popup strat


  async forgetpassword() {
    const { value: emailid } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    })


    if (emailid) {
      // Make a request to the forgot password API
      const requestBody = { emailid: emailid };

      this.loginService.forgetPass(requestBody).subscribe(
        () => {
          Swal.fire({
            title: 'Password Successfully Changed',
            text: `Your password reset have been sent to your email: ${emailid}`,
            showConfirmButton: false,
            timer: 2000 // Display for 1 second
          }).then(() => {
            // Redirect based on user role
            this.router.navigate(['/login']);
          });

        },
        (error: any) => {
        
          // Handle the error case
          if (error.status === 400) {
            Swal.fire({
              // icon: 'error',
              title: 'Email id not found!',
              text: 'Failed to reset password. Please try again later.',
            });
          } else if (error.status === 500) {
            Swal.fire({
              // icon: 'error',
              title: 'Error',
              text: 'Please enter the valid Email id.',
            });
          }
        }
      );
    }
  }


  //forget password popup end

  redirectBasedOnRole(name: string) {
    switch (name) {
      case 'SUPERADMIN':
        this.router.navigate(['/dashboard'])
          .then(() => {
            location.reload();
          });
        break;
      default:
        // For any other role, redirect to the admin page
        this.router.navigate(['/admin'])
        .then(() => {
          location.reload();
        });
        break;
     
    }
  }
}

function then(arg0: () => void) {
  throw new Error('Function not implemented.');
}


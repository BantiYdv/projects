

import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private loginService: LoginService, private router: Router, private http: HttpClient, private snack: MatSnackBar) { }

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
          localStorage.setItem("role", role.name);
          
          localStorage.setItem("permissionLength", role.permissions.length);
          for (let i = 0; i < role.permissions.length; i++) {
            localStorage.setItem("permissions"+ `${i}`, role.permissions[i].permissionName);
          }
         

          Swal.fire({
            icon: 'success',
            title: 'Successfully Login',
            text: 'You have successfully logged in!',
            showConfirmButton: false,
            timer: 1000 // Display for 1 second
          })
            .then(() => {
              // Redirect based on user role
              this.redirectBasedOnRole(role.name);
              

            });

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


  async changepassword() {
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


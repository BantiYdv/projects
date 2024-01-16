import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login: any = {};
  reSendData : any = {
    email: this.login.email,
  }
  constructor(private apiService: ApiServiceService, private router: Router) {}

  //login code start here
  signIn(userData: any) {
    this.apiService.signIn(userData).subscribe(
      (r: any) => {
        console.log(r);
        localStorage.setItem('token', r.token);
        localStorage.setItem('userId', r.data._id);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'User logged in successfully.',
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            localStorage.setItem('role', r.data.role);
            // this.router.navigate(['/home'])
            this.getRouteUrl(r.data.role);
          }
          // window.location.reload();
        });
      },
      (e: any) => {
        console.error(e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  getRouteUrl(role: any) {
    switch (role) {
      case 'user':
        this.router.navigate(['/home']).then( () => {
          window.location.reload();
        })
        break;
      case 'admin':
        this.router.navigate(['/project']).then( () => {
          window.location.reload();
        })
        break;
      case 'team member':
        this.router.navigate(['/employee-project']).then( () => {
          window.location.reload();
        })
        break;
      default:
        this.router.navigate(['/home']).then( () => {
          window.location.reload();
        })
        break;
    }
  }
  //login code end here

  sendOTPForForgetPassword() {
    this.apiService.sendOTPForForgetPassword(this.reSendData).subscribe(
      (r) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'OTP Resent',
          text: 'We have resent the OTP to your email.',
          confirmButtonText: 'OK',
        });
      },
      (e) => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Resend OTP Failed',
          text: 'There was an error resending the OTP. Please make sure you have filled in a valid email address.',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}

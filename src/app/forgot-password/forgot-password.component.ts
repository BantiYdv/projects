import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   this.verifyOTP.email = params['email'] || '';
    // });
  }
  sendData: any = {
    email: '',
  };
  verifyOTP: any = {
    email: this.sendData.email,
    otp: '',
  };
  
  otpValue1: any;
  otpValue2: any;
  otpValue3: any;
  otpValue4: any;
  password: any;
  confirmPassword: any;

  currentStep = 1;
  showPassword: boolean = false;

  move(e: any, p: any, c: any, n: any) {
    c.value = c.value.replace(/[^0-9]/g, '');
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != '') {
        n.focus();
      }
    }
    if (e.key == 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
    this.verifyOTP.otp = `${this.otpValue1 || ''}${this.otpValue2 || ''}${
      this.otpValue3 || ''
    }${this.otpValue4 || ''}`;

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  timer: any;
  defaultCountdown: number = 300; // 24 hours in seconds
  countdown: number = this.defaultCountdown;
  timerRunning: boolean = false;

  startTimer(): void {
    if (this.verifyOTP.email != '') {
      // Swal.fire({
      //   icon: 'success',
      //   title: 'OTP Resent',
      //   text: 'We have resent the OTP to your email.',
      //   confirmButtonText: 'OK',
      // });
      // this.sendOTPForForgetPassword();

      this.clearTimer();

      // Reset countdown to default value
      this.countdown = this.defaultCountdown;

      this.timerRunning = true;
      this.timer = setInterval(() => {
        this.countdown--;

        if (this.countdown <= 0) {
          this.clearTimer();
          this.timerRunning = false;

          // Handle the logic after the timer reaches zero (e.g., enable "Resend" button)
        }
      }, 1000);
    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Resend OTP Failed',
      //   text: 'There was an error resending the OTP. Please make sure you have filled in a valid email address.',
      //   confirmButtonText: 'OK',
      // });
    }
  }

  clearTimer(): void {
    clearInterval(this.timer);
    this.timer = null;
  }

  getFormattedTime(): string {
    const hours = Math.floor(this.countdown / 3600);
    const minutes = Math.floor((this.countdown % 3600) / 60);
    const seconds = this.countdown % 60;

    return `${this.formatDigit(minutes)}:${this.formatDigit(seconds)}`;
  }

  private formatDigit(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  sendOTP() {
    this.verifyOTP.email = this.sendData.email;
    this.apiService.sendOTPForForgetPassword(this.sendData).subscribe(
      (r:any) => {
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent',
          text: r.message,
          confirmButtonText: 'OK',
        });
        this.currentStep = 2;
        this.startTimer();
       
      },
      (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Send OTP Failed',
          text: e.error.message,
          confirmButtonText: 'OK',
        });
      }
    );
  }

  verificationOTP() {
    this.apiService.verifyOtpUsers(this.verifyOTP).subscribe(
      (r: any) => {
        localStorage.setItem('savePasswordId', r.data[0]._id);
        Swal.fire({
          icon: 'success',
          title: 'OTP Verified',
          text: r.message,
          confirmButtonText: 'OK',
        }).then(() => {
          this.currentStep = 3;
        });
      },
      (e) => {

        Swal.fire({
          icon: 'error',
          title: 'OTP Verification Failed',
          text: e.error.message,
          confirmButtonText: 'OK',
        });
      }
    );
  }

  savePassword() {
    this.apiService.savePassword(this.password).subscribe(
      (r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Saved',
          text: r.message,
          // text: 'Your password has been saved successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/log-in']);
        });
      },
      (e) => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Error Saving Password',
          text: e.error.message,
          // text: 'There was an error saving your password. Please try again.',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  // sendOTPForForgetPassword() {

  // }
}

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../service/api-service.service';
import { FormsModule } from '@angular/forms';
// import {MatSliderModule} from '@angular/material/slider';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-how-it-work',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, FormsModule, RouterLink],
  providers: [ApiServiceService],
  templateUrl: './how-it-work.component.html',
  styleUrl: './how-it-work.component.css',
})
export class HowItWorkComponent implements OnInit {
  //registration var code
  register: any = {};
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  emailMismatch: boolean = false;
  //registration var code

  activeMenuItem: string = 'Brief Us';
  isSticky: boolean = false;
  offset: number = 580;
  scaleTransform: string = 'scale(1)';
  transitionDuration: string = '0.5s';
  chipData = [
    'Stock Footage AV',
    'Another Chip',
    'Yet Another Chip',
    'Stock Footage',
    'Another',
    'Yet Another',
    'Stock Foo',
    'Chips',
    'Yet',
    'Stock',
    'Another 1',
    'Another 2',
  ];
  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 1001 }, (_, i) => i + 2000); // Represents years from 2000 to 3000
  selectedTime: string = '';
  currentYear: number | any;
  userData: any = {};
  bookMeeting: any = {};

  selectTime(time: string) {
    this.selectedTime = time;
  }

  
 
  selectedChips: string[] = [];

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {

    this.currentYear = new Date().getFullYear();


    this.router.events.subscribe(() => {
      this.el.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
    // this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    this.updateOffset(); // Update offset based on screen width
    this.isSticky = scrollPosition >= this.offset;
  }

  decreaseYear() {
    // Decrease the year by 1
    this.currentYear--;
  }

  increaseYear() {
    // Increase the year by 1
    this.currentYear++;
  }
  // formatLabel(value: number): string {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000) + 'k';
  //   }

  //   return `${value}`;
  // }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementOffset = element.getBoundingClientRect().top;
      const bodyRect = document.body.getBoundingClientRect().top;
      const offset = elementOffset - bodyRect;
      const middleOfPage = offset - window.innerHeight / 3.9; // Adjust as needed
      window.scrollTo({ top: middleOfPage, behavior: 'smooth' });
    }
  }

  private updateOffset(): void {
    if (window.innerWidth >= 300 && window.innerWidth < 768) {
      this.offset = 1040;
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.offset = 1100;
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      this.offset = 1200;
    } else {
      this.offset = 580;
    }
    console.log(this.offset);
  }

  button1Clicked(): void {
    this.scrollToSection('freeScript');
    this.animateButtonScale(3);
  }

  private animateButtonScale(iterations: number): void {
    let count = 0;

    const interval = setInterval(() => {
      if (count % 2 === 0) {
        this.scaleTransform = 'scale(0.9)';
      } else {
        this.scaleTransform = 'scale(1)';
      }

      count++;

      if (count === iterations * 2) {
        clearInterval(interval);
      }
    }, 500); // Adjust the interval duration (here 500ms) as needed
  }

  toggleChipSelection(chip: string): void {
    const index = this.selectedChips.indexOf(chip);
    if (index === -1) {
      this.selectedChips.push(chip);
    } else {
      this.selectedChips.splice(index, 1);
    }
  }

  isSelected(chip: string): boolean {
    return this.selectedChips.includes(chip);
  }

  onSlideChange(event: any) {
    const activeSlideIndex = event.to;

    // Determine the corresponding menu item based on the active slide index
    switch (activeSlideIndex) {
      case 0:
        this.activeMenuItem = 'Brief Us';
        console.log("Brief Us");
        break;
      case 1:
        this.activeMenuItem = 'Schedule Meeting';
        console.log("Schedule Meeting");
        break;
      case 2:
        this.activeMenuItem = 'Create Account';
        console.log("Create Account");
        break;
      default:
        this.activeMenuItem = 'Brief Us';
        console.log("Brief Us");
        break;
    }
  }

  

  //registration code start here
  onPasswordChange() {
    if (this.register.password && this.confirmPassword) {
      this.passwordMismatch = this.register.password !== this.confirmPassword;
    }
  }
  onEmailChange() {
    if (this.register.email) {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const isNotBlank = this.register.email.trim() !== '';
      this.emailMismatch = !(
        isNotBlank && emailPattern.test(this.register.email)
      );
    }
  }
  signUp(userData: any) {
    console.log('signUp Api =>', userData);
    this.apiService.signUp(userData).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'User registered successfully.',
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.router.navigate(['/log-in']);
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  //registration code end here


  saveCientRequirement(userData:any){
    const formData = new FormData();

    // Append each form field to the formData
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    this.apiService.saveCientRequirement(formData).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'User registered successfully.',
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            // this.router.navigate(['/log-in']);
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  bookTimeForMeeting(userData:any){
    console.log('signUp Api =>', userData);
    this.apiService.bookTimeForMeeting(userData).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'User registered successfully.',
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            // this.router.navigate(['/log-in']);
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
}

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

  currentStep = 1;
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
  bookMeetings: any = {};

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
    this.currentYear--;
  }

  increaseYear() {
    this.currentYear++;
  }

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

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
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

  handleAudioFile(event: any) {
    this.userData.audio = event.target.files[0];

    console.log('Selected Audio File:', this.userData.audio);
  }
  handleVideoFile(event: any) {
    this.userData.video = event.target.files[0];
    // Handle the selected audio file, for example, you can log it or perform further actions.
    console.log('Selected Audio File:', this.userData.video);
  }

  openWhatsApp(phoneNumber: string, message: string) {
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }


  saveCientRequirement(userData:any){
    // Create a JSON object excluding "creative_attach"
    const jsonData = {
      av_type: this.userData.av_type,
      city: this.userData.city,
      email: this.userData.email,
      mobile_number: this.userData.mobile_number,
      deadline: this.userData.deadline,
      event_date: this.userData.event_date,
      desc: this.userData.desc,
      budget: this.userData.budget,
      budget_in_mind: this.userData.budget_in_mind,
      // more_attach: this.userData.more_attach,
    };

    // Create a FormData object
    const formData = new FormData();

    // Function to append property to FormData
    const appendFormData = (property: string, value: any) => {
      formData.append(property, value);
    };

    // List of form fields excluding "creative_attach"
    const formFields = [
      'av_type',
      'city',
      'email',
      'mobile_number',
      'deadline',
      'event_date',
      'desc',
      'budget',
      'budget_in_mind'
    ];

    // Append each form field to the formData
    formFields.forEach((field) => {
      appendFormData(field, this.userData[field]);
    });

    // Append "creative_attach" as a file to the formData
    formData.append('creative_attach', this.userData.creative_attach);
    formData.append('more_attach', this.userData.more_attach);
    formData.append('audio', this.userData.audio);
    formData.append('video', this.userData.video);


    // Send JSON data to the API
    this.apiService.saveCientRequirement(jsonData).subscribe(
      (r: any) => {
        console.log(r);
        localStorage.setItem('client_id',r.data._id)
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
        this.nextStep();
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  bookTimeForMeeting(userData:any){
    this.bookMeeting.client_requirement_id = localStorage.getItem('client_id')
    this.bookMeeting.meeting_time = `${this.bookMeetings.day}/${this.bookMeetings.month}/${this.currentYear}`;
    this.bookMeeting.meeting_date = `${this.bookMeetings.hour} : ${this.bookMeetings.minute}`
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
            this.nextStep();
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

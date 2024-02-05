import { Component, ElementRef, HostListener, OnInit  } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';
import { CommonModule, formatDate } from '@angular/common';
import { ApiServiceService } from '../service/api-service.service';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink, NavbarComponent, AppComponent, CarouselModule, TagModule ,ButtonModule,CommonModule, MatChipsModule, MatIconModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  login: any = {};
  reSendData : any = {
    email: this.login.email,
  }
  showPassword: boolean = false;

  register: any = {
    country_code: '+91',
    country_name: 'India'
  };
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  emailMismatch: boolean = false;
  currentDate: string = new Date().toISOString().split('T')[0]; 
  currentStep = 1;
  activeMenuItem: string = 'Brief Us';
  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 1001 }, (_, i) => i + 2000); // Represents years from 2000 to 3000
  selectedTime: string = '';
  currentYear: number | any;
  userData: {
    av_type: string,
    city: string,
    email: string,
    mobile_number: string,
    country_code: string,
    event_date: string,
    deadline: string,
    desc: string,
    budget: number,
    budget_in_mind: boolean,
    creative_attach: File | null,
    more_attach: File | null,
    audio: File | null,
    video: File | null,
  } = {
    av_type: '',
    city: '',
    email: '',
    mobile_number: '',
    country_code: '+91',
    event_date: '',
    deadline: '',
    desc: '',
    budget: 0,
    budget_in_mind: false,
    creative_attach: null,
    more_attach: null,
    audio: null,
    video: null,
  };
  
  bookMeeting: any = {};
  bookMeetings: any = {
    day: new Date().getDate(),
    month: this.getMonthName(new Date().getMonth())
  };

  constructor(
    private router: Router,
    private activatedRoute :ActivatedRoute,
    public apiService: ApiServiceService,
    private el: ElementRef

  ) {}
  ngOnInit(){
      const currentRoutePath = this.router.url;
      this.apiService.showPage(currentRoutePath.replace('/user/',''));
      this.apiService.scrollToSection(currentRoutePath.replace('/',''));


      this.currentYear = new Date().getFullYear();


      this.router.events.subscribe(() => {
        this.el.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
  
      this.countryDialCode();


      this.updateCurrentTime();
    
      // Update the current time every minute
      setInterval(() => {
          this.updateCurrentTime();
      }, 60000); 
  }
  
 

  

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  items = new Array(30);
  
  cardsArray = [
    { imageUrl: '../../assets/images/jazz_img.svg', title: 'Portfolio Item 01', description: 'Description and Details Here 01' },
    { imageUrl: '../../assets/images/card_img_1.svg', title: 'Portfolio Item 02', description: 'Description and Details Here 02' },
    { imageUrl: '../../assets/images/card_img_2.svg', title: 'Portfolio Item 03', description: 'Description and Details Here 03' },
    { imageUrl: '../../assets/images/card_img_1.svg', title: 'Portfolio Item 04', description: 'Description and Details Here 04' },
    { imageUrl: '../../assets/images/card_img_2.svg', title: 'Portfolio Item 05', description: 'Description and Details Here 05' },
    // Add more items as needed
  ];
  cardsArrayData = [
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 4,
    userName: "Max Deni",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 4,
    userName: "Max Deni",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 1,
    userName: "Raj Kumar",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 3,
    userName: "Sohan Yadav",
    userPosition: "Backend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 5,
    userName: "Ban Ydv",
    userPosition: "Frontend Developer"
  },
]; // Replace this with your actual array

getStars(starCount: number): boolean[] {
  const stars = new Array(5).fill(false); // Initialize an array of 5 elements with false values

  for (let i = 0; i < starCount; i++) {
    stars[i] = true; // Set the first `starCount` elements to true to represent gold stars
  }

  return stars;
}
  vCards(): any[] {
    return this.cardsArray;
  }
  playVideo(video: HTMLVideoElement) {
    video.play();
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0;
  }

  getMonthName(monthIndex: number): string {
    // Assume you have an array of month names
    const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return monthNames[monthIndex];
  }
  

  isPastDate(day: number): boolean {
    const selectedDate = new Date(`${this.bookMeetings.month} ${day}, ${new Date().getFullYear()}`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight for accurate comparison
    return selectedDate < currentDate;
  }
  
  
 
  
  
  selectTime(time: string) {
    this.selectedTime = time;
  }

  
 
  selectedChips: string[] = [];

 
  country_code: any = {};

  

  countryDialCode() {
    this.apiService.countryDialCode().subscribe(
      (r: any) => {
        this.country_code = r.data;
      },
      (e) => {
        console.error(e);
      }
    );
  }


 

  decreaseYear() {
    // Check if the current year is already the minimum allowed year
    if (this.currentYear > new Date().getFullYear()) {
      this.currentYear--;
    }
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
        break;
      case 1:
        this.activeMenuItem = 'Schedule Meeting';
        break;
      case 2:
        this.activeMenuItem = 'Create Account';
        break;
      default:
        this.activeMenuItem = 'Brief Us';
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
    this.apiService.signUp(userData).subscribe(
      (r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: r.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.apiService.showPage('login')
            this.router.navigate(['/log-in']);
          }
        });
      },
      (e: any) => {
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  //registration code end here
  openWhatsApp(phoneNumber: string, message: string) {
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  handleAudioFile(event: any) {
    this.userData.audio = event.target.files[0];
  }
  handleVideoFile(event: any) {
    this.userData.video = event.target.files[0];
  }

  handleCAFile(event: any) {
    this.userData.creative_attach = event.target.files[0];
  }
  handleMAFile(event: any) {
    this.userData.more_attach = event.target.files[0];
  }
  saveCientRequirement(userData:any){
    const formData = new FormData();

    formData.append('av_type', this.userData.av_type);
    formData.append('city', this.userData.city);
    formData.append('email', this.userData.email);
    formData.append('mobile_number', this.userData.mobile_number);
    formData.append('event_date', this.userData.event_date);
    formData.append('deadline', this.userData.deadline);
    formData.append('desc', this.userData.desc);
    formData.append('budget', this.userData.budget.toString());
    formData.append('budget_in_mind', this.userData.budget_in_mind.toString());

    formData.append('creative_attach', this.userData.creative_attach !== null ? this.userData.creative_attach : '');
    formData.append('more_attach', this.userData.more_attach !== null ? this.userData.more_attach : '');
    formData.append('audio', this.userData.audio !== null ? this.userData.audio : '');
    formData.append('video', this.userData.video !== null ? this.userData.video : '');
    
    this.apiService.saveCientRequirement(formData).subscribe(
      (r: any) => {
        localStorage.setItem('client_id',r.data._id)
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.message,
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
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  bookTimeForMeeting(userData:any){
    this.bookMeeting.client_requirement_id = localStorage.getItem('client_id')
    this.bookMeeting.meeting_time = `${this.bookMeetings.day}/${this.bookMeetings.month}/${this.currentYear}`;
    this.bookMeeting.meeting_date = `${this.bookMeetings.hour} : ${this.bookMeetings.minute}`
    this.apiService.bookTimeForMeeting(userData).subscribe(
      (r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.message,
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
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }




  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //login code start here
  signIn(userData: any) {
    this.apiService.signIn(userData).subscribe(
      (r: any) => {
        localStorage.setItem('token', r.token);
        localStorage.setItem('userId', r.data._id);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            localStorage.setItem('role', r.data.role);
            this.getRouteUrl(r.data.role);
          }
        });
      },
      (e: any) => {
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }
  getRouteUrl(role: any) {
    switch (role) {
      case 'user':
        this.router.navigate(['/client/work-status']).then( () => {
          window.location.reload();
        })
        break;
      case 'admin':
        this.router.navigate(['/admin/briefs']).then( () => {
          window.location.reload();
        })
        break;
      case 'team member':
        this.router.navigate(['/employee/employee-project']).then( () => {
          window.location.reload();
        })
        break;
      default:
        this.router.navigate(['/user/home']).then( () => {
          window.location.reload();
        })
        break;
    }
  }
  //login code end here

  sendOTPForForgetPassword() {
    this.apiService.sendOTPForForgetPassword(this.reSendData).subscribe(
      (r:any) => {
        Swal.fire({
          icon: 'success',
          title: 'OTP Resent',
          text: r.message,
          confirmButtonText: 'OK',
        });
      },
      (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Resend OTP Failed',
          text: e.error.message,
          confirmButtonText: 'OK',
        });
      }
    );
  }
 
  
  validateHour() {
    this.bookMeetings.hour = this.bookMeetings.hour.replace(/[^\d]/g, '');
    const hour = parseInt(this.bookMeetings.hour, 10);
    if (isNaN(hour) || hour < 1 || hour > 12) {
        this.bookMeetings.hour = 12; 
    }

    // Additional logic to check if entered time is before the current time
  const enteredTime = parseInt(this.bookMeetings.hour);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (enteredTime < currentHour) {
      // If entered time is before current time, switch to the next AM/PM period
      this.switchToNextAmPm();
  }
}

validateMinute() {
  this.bookMeetings.minute = this.bookMeetings.minute.replace(/[^\d]/g, '');
    const minute = parseInt(this.bookMeetings.minute, 10);
    if (isNaN(minute) || minute < 0 || minute > 59) {
        this.bookMeetings.minute = 0o0; 
    }
    const enteredMinute = parseInt(this.bookMeetings.minute);
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Check if the entered time is before the current time
    if (enteredMinute < currentMinute && parseInt(this.bookMeetings.hour) === currentHour) {
        // If entered time is before current time and the hour is the same, switch to the next AM/PM period
        this.switchToNextAmPm();
    }
}
 

updateMeetingDate() {
  this.bookMeeting.meeting_date = `${this.bookMeetings.day}/${this.bookMeetings.month}/${this.currentYear}`;
}

isMeetingDateToday(): boolean {
  const today = new Date();
  const selectedDate = new Date(`${this.bookMeetings.month}/${this.bookMeetings.day}/${this.currentYear}`);
  return this.isSameDate(today, selectedDate);
}

isSameDate(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

isTomorrowSelected(): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const selectedDate = new Date(`${this.bookMeetings.month}/${this.bookMeetings.day}/${this.currentYear}`)
  return this.isSameDate(tomorrow, selectedDate);
}

isOvermorrowSelected(): boolean {
  const overmorrow = new Date();
  overmorrow.setDate(overmorrow.getDate() + 2);

  const selectedDate = new Date(`${this.bookMeetings.month}/${this.bookMeetings.day}/${this.currentYear}`)
  
  return this.isSameDate(overmorrow, selectedDate);
}
// Add these methods to your component class
selectedDateAndMonth: string = '';

selectToday() {
  const today = new Date();
  this.bookMeetings.day = formatDate(today, 'd', 'en-US');
  this.bookMeetings.month = formatDate(today, 'MMMM', 'en-US');
  this.updateMeetingDate(); // Call the method to update meeting date if needed
}


selectTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  this.bookMeetings.day = formatDate(tomorrow, 'd', 'en-US');
  this.bookMeetings.month = formatDate(tomorrow, 'MMMM', 'en-US');
  this.updateMeetingDate(); // Call the method to update meeting date if needed
}

selectOvermorrow(): void {
  const overmorrow = new Date();
  overmorrow.setDate(overmorrow.getDate() + 2);
  this.bookMeetings.day = formatDate(overmorrow, 'd', 'en-US');
  this.bookMeetings.month = formatDate(overmorrow, 'MMMM', 'en-US');
  this.updateMeetingDate();
}

private updateCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Convert hours to 12-hour format
  this.bookMeetings.hour = this.formatTimeValue(hours % 12 || 12);
  this.bookMeetings.minute = this.formatTimeValue(minutes);
  
  // Set AM/PM based on hours
  this.bookMeetings.AmPm = hours >= 12 ? 'PM' : 'AM';

}

private formatTimeValue(value: number): string {
  // Add leading zero if the value is less than 10
  return value < 10 ? `0${value}` : `${value}`;
}



private switchToNextAmPm() {
  // Toggle between AM and PM
  this.bookMeetings.AmPm = this.bookMeetings.AmPm === 'AM' ? 'PM' : 'AM';
}

}


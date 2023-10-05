import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';


//import for calendar start

// import { CalendarOptions } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridWeek from '@fullcalendar/timegrid';
// import timeGridDay from '@fullcalendar/timegrid';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AdminService } from 'src/app/services/admin.service';
import { RegisterAndUpdateService } from 'src/app/services/register-and-update.service';
import { TestService } from 'src/app/services/test.service';



//import for calendar end


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  leaveForm!: any;
  showAdminLeaveTable!: any;
  leaveAdminData!: any;
  noOfDaysInput: any;
  wfhForm!: any;
  showWfhTable: any;
  wfhData!: any;
  showAttTable: any;
  showAllAttTable: any;
  AttData: any;
  AllAttData: any;
  showTeamLeaveTable!: any;
  TeamLeaveData: any;
  showTeamWfhTable!: any;
  TeamWfhData: any;
  showAllEmloyeeTable: any;
  EmployeeData: any;
  item: any;
  passwordForm: any;              //for change password
  showAllWfhTable: any;           // for show all wfh
  AllwfhData: any;                //for show all wfh
  showAllLeaveTable: any;         //for show all leave
  leaveAllData: any;              //for show all leave
  // for profile modal start
  profileDetails: any;
  phonenumber: any;
  imageUrl: SafeUrl | undefined;
  public address: string = '';
  public birthDay: string = '';
  public maritalStatus: string = '';
  public bloodGroup: string = '';
  public skills: string = '';
  public emergencyContact: string = '';

  // for profile modal end

  // for update page start
  user: any = {                                              // Object to store the user registration data
    dateofjoining: new Date().toISOString().split('T')[0],  //bydefault show current date in date of joining

  };
  updateDetails: any;
  employeeId!: string;
  // date of birth select only 18 years old only start
  dobError: boolean = false;
  id: any;
  role: any;

  totalleaves: any;
  sickLeavesPerMonth: any;
  casualLeavesPerMonth: any;
  permissions: any;

  validateDateOfBirth() {
    const currentDate = new Date();
    const selectedDate = new Date(this.user.dob);
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    this.dobError = selectedDate > eighteenYearsAgo;
  }
  // date of birth select only 18 years old only end


  // email id error start
  emailError: boolean = false;
  emailErrorMessage: string = '';

  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const existingEmails = ['existing@email.com']; // Replace with your existing email check logic

    if (!emailRegex.test(this.user.emailid)) {
      this.emailError = true;
      this.emailErrorMessage = 'Please enter a valid email address.';
    } else if (existingEmails.includes(this.user.emailid)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email already exists. Please enter a different email address.';
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }
  //eamil id error end 

  token: string = ''; // Variable to store the token
  teamlead: string[] = [];
  designation: string[] = [];
  departments: string[] = [];

  // disable date from date of joining start
  getMinDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 4);
    const minDate = currentDate.toISOString().split('T')[0];
    return minDate;
  }
  getMaxDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 0);
    const maxDate = currentDate.toISOString().split('T')[0];
    return maxDate;
  }
  // disable date from date of joining end
  // for update page end

  // // for show side nav bar according to user login with permission start
  // permissionSet = [
  //   { name: 'ALL_EMPLOYEES_DATA', modal: '#exampleModalFullscreenXxl', function: "openModal()", imgName: "View Employee", src: 'https://cdn-icons-png.flaticon.com/128/9634/9634070.png', img: 'data:image/webp;base64,UklGRuoCAABXRUJQVlA4WAoAAAAQAAAArwAArQAAQUxQSMYAAAABJyAQSOFmFxERg+vYtp3kvFAAqAWQCkivAODd/psizrj1UyP6PwE62az29l2jG6tsiMlfGgzzeaE30HCqMFR3JrOkE73BhoPCcN3ezBP3Mk/a6Q04bBai18aQJfVMQVqYXlJmSpJBq6LyPVWYqeJK1X1f9vf/3/8/1GeqtFJ1XDNV7KlCReVFJWWmJC1ML6lnCpKYJGkl6jY9Udgo8yTtLjyvvYLH7Wmgeeo4sySdrFj8GQ0kT50fOJ66WlF43djk90uNPiBWUDgg/gEAABAZAJ0BKrAArgA+3W6wUCinJSKqHQgZEBuJaW7hc0Eb81BezFHdoMtwIp3XQ2BYm7u7u7u7u7u+V93ry5ek9rg8rvhYs/R+eZKzdq9Y7swtoMXvL0+xMzwUbrFKwZJQAIuTnkAx3/xmu6IJZ659CgFOyQr56HFs4G1xiL1QhawTK/FOan4xEXuN0CwSNWS16lZvQbQ+Jg+5UTLDC0QZ8kQqtpLqqoXvZP+Hv5g0dPJNeZmZlVQFkCbGs0uJmtYZvmZmqv1VID0gLlK7u7u5UKS4AP78zDTKQ74Vdx4llpfxm5xxvwMw4ZzTx/IBF0BQrRXBQSlzFbEodaIXjg2OmxVGBRvHrDrQxWNXeNOJdUGBHsBWisp6jCfxXPE5K2Nqa+fMVtiKkacKcwcSsmTBdpqWiPtLyCHmnlsP6unNcgWIj0XxDmZ7GW6t4rD7H3Y3JzrETekuvG3xgSg2l2KNx3cEelzAaLMd5ckLBuZM3aIGZlLMM8/LaZdREUorcikpfW4GW/2+xO0frxIxct6EAlWQhGkr0v5q/ByDo2JMyX0+aSfPnctX/F81KNrKAdxT0AkfOo7bql6g06uDaxpSNoAxU3IEWF/X8uqMFg2vdm/Voqh1np6OZxDeZEXl0Dtlcs0iM7VCY+DfCBVEVKi14/k41HEkQc/4dSB/npAAAA==' },
  //   { name: 'NEW_REGISTRATION', modal: '#newregisteration',  function: '', imgName: "New Registration", src: 'https://cdn-icons-png.flaticon.com/128/9634/9634123.png', img: 'data:image/webp;base64,UklGRiAEAABXRUJQVlA4WAoAAAAQAAAArwAArQAAQUxQSMYAAAABJyAQSOFmFxERg+vYtp3kvFAAqAWQCkivAODd/psizrj1UyP6PwE62az29l2jG6tsiMlfGgzzeaE30HCqMFR3JrOkE73BhoPCcN3ezBP3Mk/a6Q04bBai18aQJfVMQVqYXlJmSpJBq6LyPVWYqeJK1X1f9vf/3/8/1GeqtFJ1XDNV7KlCReVFJWWmJC1ML6lnCpKYJGkl6jY9Udgo8yTtLjyvvYLH7Wmgeeo4sySdrFj8GQ0kT50fOJ66WlF43djk90uNPiBWUDggNAMAAFAhAJ0BKrAArgA+3WivT6imJKIs8ajhEBuJaW7dYGkF53h7GC4Z2ly3oejKX903/+UwMQf7co0uRD6OEkzBLcRiZvPRz2Rv/OrneAzoZi1Jad83FJQyoeeOxeP/N3kMtaPFRvUpdDAJGEc0Io8PLtIB30+Z+xW3hTztT9nhlQ3I6S969h5E4+bln2Plhs4z8Yjyl0M0qj/rHM3r/o4N/oIhRx6w7Mkd2GdYtM5c8X8r8hFfGfhehRqF/98BQxnCTUvDX6tS4iZ5k9DRlJ5YL+G0zxarnhUGVUE+q4fOYjqOtCv64QEW/jG5qYSQuidXbW1O4cH/I7xXbSZVjvsjo5WCI+aITyCLRse9CsdyO82DNtIQAP7pG7t39tFpCziIN0YkPnwjRWCy0H9fhNhiAbQilcnNfq+t72+RVCBKwBDNdI1t371Uqr3Lllni8XqpBsCW9ufQUIYOEKlmE+CxYp0X2Rwb05O+QBEZwBnLIwr+zlXAs+oBml5+dCwrUbFZe+DvoRimJpmlwGisfUBLGUrVexHfb2WKAcyApklMQeU2hu0zV6hj+PaU8cp9XvPhdwTHOXgqBgyu563KzbDLkPinqy0jXg3V3oue+o0zAVuV1UjVbQLBvQMvkQCsPKzgPukIClA0fitemexZWooqcoRuCN7c1iOxk1rMxZujU3ITLgBWvJ6KcFuBSDNiMHV6TlyLsjeani14ulhaFeCxacFk2gFLtyuy8q1G7ZFTIFnIW8Xgw6jP7oxEucQcp7OLFq4KStCixu29vJvH2/4xGVjGdeEpONn0ZO2zNwvP5Hac1tyCxPsX0wGDaNC7JCesPxKzin6b9t6ZKyHW65zA8JcYppN2DeAo7G9MXwpRnHeMxQcsclLmaEJ2aBlOp5KuVV+WfCK5K/k/kWmyu2rN/Dz7QdAHsceWKNQkF4tPvwgNqzfvt9kmn4tBswWn9hAZ+1uEezipIBotdZZLwASJEm8A4tiUJfh1yVO57kS9zCZKT1VnJdL6tEhXu9xKLcdqFhazCcxUN8Ehmlx8UDCwKPcHAyk/vkWUFKjKKUzpe60bX12MQlTVL7MY6z09gB8+uIAAAAA=' },
  //   { name: 'ALL_EMPLOYEES_ATTENDANCE', modal: '#ViewAllAtt',  function: "viewAllattendance()", imgName: "All Employee Attendance", src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReae8zekcSI8HRLoMs5Cp89fH69lLnbkH9c8HeXRFT-umYpIOD', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReae8zekcSI8HRLoMs5Cp89fH69lLnbkH9c8HeXRFT-umYpIOD' },
  //   { name: 'LEAVE_SHOW_TEAMLEAD', modal: '#AdminTeamLeave',  function: "teamleave()", imgName: "View Team Leave", src: 'https://cdn-icons-png.flaticon.com/128/9634/9634060.png', img: 'data:image/webp;base64,UklGRswDAABXRUJQVlA4WAoAAAAQAAAAewAAjQAAQUxQSOYCAAABJyAQSOFmFxERIwlIUmRFRGjYse3GbcClgCwsgFZYgOlhAaT0+m/KEAkCSb4j+j8BECNJCtzsPQ6AKhGAJH8AqEwAAjb/pHxwByQQ0f8JYB3ZVpP7oAFQC4gFxArk9t+UWeJnRP8ngCQfF3CQ2RPvxcoAn2xk3AcT10Sz8IHZYGBMJQPXFPR9YN6rywtBXV+IxpK6sVDUnX9a/1WSuudCVJcXvDpacPrOqUb6n1PRAE05C2MikcnrztnIN56MZsaT3eM46H/+wvth5QTfbAzcJwsfmA0GxlTRVzHvtFUsBmUVq0lXxXJRVSGoqcJUhakBU08Iey1DKmqBdFOSxRB0dLmk45SDU4GN8ebhN+Sb4gQa83EC33Kda44E4InogXcndnKBRBLRC2wSA08yOC7wTSpzSWpWqnPRysl5K+BpWxPKXNmXhDoX9zmhk/PbEgmDp10/JJy5ssuTdOfinuJo1+WTtQcWNg0+sZMsF4zx75r5KrcTnuQvzJXF9uPlGkmGiajIRpVkmUAnWbBP5P8w8SR5bZSVMoHn+8JGT4VhYnqHqJVTUBU+Toka5RBULZ0SNcohqFo6JWqUQ/DR0inoCuWUrKVT0BXKKVlLiy4/dIWLwoLm0y3JL1ItlmahX9XCqssrUi1YlbyqFpYVp0y1YBnFp2vBVm3BJVMtsH9tt0vXwoIyokemWrBFcOhaWHG3UbJlqglLvqNi65q45FEcUSxPqgmuzwHRRz+WrMmqOrotTyXBN0/kEcWA/k98Yp/ARLBkkgmusXMsaKNkQSfFp3Hywnd0mzIfcG2ci6NiQoRrowF9QJtvo6lu1WgEkHdqNBYAz40arWmvD82y1YfmB3b60Hxjpw/NN3Z60nxjq266sVWm9cZe1VJks2Yogs04XwQnFcFJRbBfnyiCA9qE4ITv6MIRcXDhDFTlwinGkVTwBuh7gU+vlxpzMXqCi8aX/Uz7Mp2JL8YdGnjbktzEH7R9L/gWVlA4IMAAAACQDwCdASp8AI4APtVQpEyoJCOiMr84AQAaiWlu4MAC/AHaAfgB+gH8AB91/QD+AfgB+kv5+9/hOHMHSsZ3jl20ytTOPt6V3kbJ2qW29xUaZ/ZRB3WQwWtFlXxAfB+tEXn/zmH1oxCc8+ybJwimydqYyt9fF4uHqUcpAkk9BSdzL6s1JbwAAP5Uwj//+ZhOY8xvHRPFEWos7g/UThFgOB/eYAYHyLtS+ZEEUEEhNOkSGlIOXxIaKX5UB8ja1AAAAAA=' },
  //   { name: 'WFH_SHOW_TEAMLEAD', modal: '#TeamWFH',  function: "teamwfh()", imgName: "View Team WFH", src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-RzQWADcEVpAB-Cm81fFnzO4UKaoOc4ZlkP4U6NSVXFQi4d-', img: 'data:image/webp;base64,UklGRmgCAABXRUJQVlA4WAoAAAAQAAAArwAArQAAQUxQSMYAAAABJyAQSOFmFxERg+vYtp3kvFAAqAWQCkivAODd/psizrj1UyP6PwE62az29l2jG6tsiMlfGgzzeaE30HCqMFR3JrOkE73BhoPCcN3ezBP3Mk/a6Q04bBai18aQJfVMQVqYXlJmSpJBq6LyPVWYqeJK1X1f9vf/3/8/1GeqtFJ1XDNV7KlCReVFJWWmJC1ML6lnCpKYJGkl6jY9Udgo8yTtLjyvvYLH7Wmgeeo4sySdrFj8GQ0kT50fOJ66WlF43djk90uNPiBWUDggfAEAAPAUAJ0BKrAArgA+3W6yT6inpaIqmmgZEBuJaW7dYGkpLGOY2KZagRERERERERERSAiAbO27r5DBCUSOM6aMG1ACm7sgo17D+orsUiXx6Rbm1ABGcqAPHWDnaESWAeYfKTMxttIazn0SbwAGKKLyxwytLhqFPWobAaq2vO4DkhID8GBiAdEJiY1qN4MIpfKSLcoZDIhTIWAFf/qYsE7SV7JL8zMzDSFK5BblVVVR+yBAAP7mYVC/tjApla+E8rdrRLuBseqkGXGUh5h1bpiIdBeibe89g+sWNssxn0G8Q3X0KxhfI7N7D6IefAVyovOwEwOrxgBcEi0y23GJJL+RpuI9c0ehzQtI2mxBk1GcNHD41mU7lxpRrEWAQP1f0j1rzuAljXiBXlfA0iMxrXAhOFAUMvwAMbUAOoEgqglmQR+3S2MQxKLJoQCLyGRHV7cAVvGKNKLO05CXwKu8ugsRb+rjAXLvzYloAQrPVbkKgMwT+AYH7NQQP9oAAAAA' },
  //   { name: 'ALL_WFH_EMPLOYEES', modal: '#AllViewWfh', function: "toggleAllWfhTable()", imgName: "All Employee WFH", src: 'https://img.freepik.com/free-vector/freelancer-working-laptop-her-house_1150-35048.jpg?w=740&t=st=1689253160~exp=1689253760~hmac=7af03e5ee78ea8f1f4837d0ff25e9e5d7da86fa39140cd16e59f87e939ff89a8', img: '' },
  //   // { name: 'ADMIN_LEAVES', modal: '', function: '', imgName: "Admin Leave", src: 'https://cdn-icons-png.flaticon.com/128/5590/5590545.png', img:'' },
  //   // { name: 'ADMIN_WFH', modal: '', function: '', imgName: "Admin WFH", src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGwlYfdcbTYW72vNkR7gkq8iXUmDEtd0bl_ohNaZZA7RMq92QE', img: ''},
  //   { name: 'VIEW_ALL_LEAVE', modal: '#AllViewLeave', function: "toggleAllLeaveTable()", imgName: "All Employee Leave", src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyBAlbvYJ0oJet_M_VGm-aHjc0k4ECwJT4G9bH_Y8Jikq4mElDPAjAh4FLdIbnAkK_szM&usqp=CAU', img: '' },
  // ]

  // // for show side nav bar according to user login with permission end

  //calendar start
  // Events: any[] = [
  //   {
  //     title:'Makar Sankranti',
  //     start: '2023-01-14'
  //   },
  //   {
  //     title:'Republic Day',
  //     start: '2023-01-26'
  //   },
  //   {
  //     title:'Maha Shivaratri',
  //     start: '2023-02-18'
  //   },
  //   {
  //     title:'Holi',
  //     start: '2023-03-07',
  //     end: '2023-03-08',
  //   },
  //   {
  //     title: 'Independence Day',
  //     start: '2023-08-15',
  //     icon: "https://cdn-icons-png.flaticon.com/128/5400/5400336.png",
  //   },
  //   {
  //     title:'Raksha Bandhan',
  //     start: '2023-08-30',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/4924/4924381.png',
  //   },
  //   {
  //     title:'Janmashtami',
  //     start: '2023-09-06',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/5108/5108679.png'
  //   },
  //   {
  //     title:'Gandhi Jayanti',
  //     start: '2023-10-02',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/2046/2046615.png'
  //   },
  //   {
  //     title:'Dussehra',
  //     start: '2023-10-24',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/3552/3552247.png',
  //   },
  //   {
  //     title:'Deepawali',
  //     start: '2023-11-12',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/4336/4336999.png',
  //   },
  //   {
  //     title:'Govardhan Puja',
  //     start: '2023-11-13',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/4223/4223348.png',
  //   },
  //   {
  //     title:'Christmas',
  //     start: '2023-12-25',
  //     icon: 'https://cdn-icons-png.flaticon.com/128/2299/2299172.png',
  //   }
  // ];
  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin, interactionPlugin, timeGridWeek, timeGridDay],
  //   initialView: 'dayGridMonth',
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay',
  //   },
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   events: this.Events,
  //   eventContent: this.customEventContent           //for icon show in calendar
  // };
  //   // for icon show in calendar start
  //   customEventContent(info: any) {
  //     if (info.event.extendedProps.icon) {
  //       const iconElement = document.createElement('img');
  //       iconElement.src = info.event.extendedProps.icon;
  //       iconElement.classList.add('event-icon');
  
  //        // Set the size of the event icon
  //     iconElement.style.width = '50px'; // Adjust the width as per your requirements
  //     iconElement.style.height = '70px'; // Adjust the height as per your requirements
  
    
  //       const titleElement = document.createElement('div');
  //       titleElement.textContent = info.event.title;
  //       titleElement.classList.add('event-title');
    
  //       const containerElement = document.createElement('div');
  //       containerElement.appendChild(iconElement);
  //       containerElement.appendChild(titleElement);
    
  //       return { domNodes: [containerElement] };
  //     }
    
  //     return { domNodes: [document.createTextNode(info.event.title)] };
  //   }
  //   // for icon show in calendar end
  // httpClient: any;
  // //calendar end

  // change password validation start
  showNewPassword: boolean = false;
  showoldPassword: boolean = false;
  showconfirmPassword: boolean = false;

  
// change password validation end

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public loginService: LoginService, private sanitizer: DomSanitizer, public dashboardService: DashboardService, public adminService: AdminService, public RegisterAndUpdate: RegisterAndUpdateService, public testService: TestService) {
    //for change password start
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
    // for change password end


  }

  // // for show side nav bar according to user login with permission start
  // userPermissions = this.loginService.getPermission(); // Example user permissions

  // filteredOptions = this.permissionSet.filter(permission =>
  //   this.userPermissions.includes(permission.name)

  // );
  // // for show side nav bar according to user login with permission end


  // for view employee list start
  isModalOpen = false; // Variable to track the modal state
  // for view employee list end

 

  ngOnInit() {
    // this.viewEmployeeProfile();
    this.teamleadshow();
    this.getRemainingLeaves();
    this.Getrole();
    // this.viewAllattendance();          // for view all attendance list
    // this.openModal();                 //for view all employee list
    this.getUserPhoto();              // for show employee photo when view by specific id
    // this.toggleAllWfhTable();             //for show all wfh table 
    // this.toggleAllLeaveTable();           // for show all leave table

    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      noOfDays: ['', [Validators.required, Validators.min(1)]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: [null, Validators.required], // Add the reason field with Validators.required
    });
    this.wfhForm = this.formBuilder.group({
      noofday: ['', [Validators.required, Validators.min(1)]],
      fromdateWfh: ['', Validators.required],
      toDateWfh: ['', Validators.required],
    });

    this.loginService.getPermission();
  }



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



  // refresh the form after close start
  closeForm() {
    this.leaveForm.reset(); // Reset the form and clear the input fields
  }
  // refresh the form after close end


  // close leave list start
  closeAdminleavelist(): void {
    this.showAdminLeaveTable = false;
  }
  // close leave list end


  // close WFH list start
  closewfhlist(): void {
    this.showWfhTable = false;
  }
  // close WFH list end

  // close Att list start
  closeAttlist(): void {
    this.showAttTable = false;
  }
  // close Att list end



  // click on more button to go on employee panel div start
  scrollToSection() {
    const targetElement = document.getElementById('icon-grid');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // click on more button to go on employee panel div end

  // click on view Wfh button to go on Wfh List div start
  // scrollToWfh() {
  //   const targetElement = document.getElementById('viewWfh');
  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  // click on view Wfh button to go on Wfh List div end

  // click on view Leave button to go on Leave List div start
  // scrollToLeave() {
  //   const targetElement = document.getElementById('viewLeave');
  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  // click on view Leave button to go on Leave List div end

  // click on view Att button to go on Leave Att div start
  // scrollToAtt() {
  //   const targetElement = document.getElementById('viewAtt');
  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  // click on view Att button to go on Att List div end



  //  start date will not select privious date from current date start
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString();
    let day = currentDate.getDate().toString();
    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  }
  //  start date will not select privious date from current date end


  // end date automatic set according to no. of days and satart date start
  updateEndDate(): void {
    const noOfDays = this.leaveForm.get('noOfDays').value;
    const fromDate = this.leaveForm.get('fromDate').value;
    const leaveType = this.leaveForm.get('leaveType').value;              //for set end date when select halfday
    const startDate = new Date(this.leaveForm.get('fromDate').value);     //for set end date when select halfday

    if (noOfDays && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + noOfDays - 1);
      this.leaveForm.get('toDate').setValue(this.formatDate(toDate));
    }

    //for set end date when select halfday
    if (leaveType === 'HALFDAY' && startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate()); // Calculate the previous date
      this.leaveForm.patchValue({ toDate: endDate.toISOString().split('T')[0] });
    }
    //for set end date when select halfday
  }

  // for select halfday then show number of days 0.5 start
  // onLeaveTypeChange() {
  //   const leaveType = this.leaveForm.get('leaveType').value;
  //   if (leaveType === 'HALFDAY') {
  //     this.leaveForm.get('noOfDays').setValue(0.5);
  //     this.leaveForm.get('noOfDays').disable();
  //   } else {
  //     this.leaveForm.get('noOfDays').enable();
  //   }
  // }
  // for select halfday then show number of days 0.5 end



  calculateEndDate(): string {
    const noOfDays = this.leaveForm.get('noOfDays').value;
    const fromDate = this.leaveForm.get('fromDate').value;


    if (noOfDays && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + noOfDays);
      return this.formatDate(toDate);
    }

    return ''; // Return an empty string if either noOfDays or fromDate is not valid
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {                   //The padZero() method is another helper function to add a leading zero to single-digit numbers for proper date formatting.
    return num < 10 ? `0${num}` : `${num}`;
  }
  // end date automatic set according to no. of days and satart date end




  // WFH logic start

  // end date automatic set according to no. of days and satart date start
  updateWFHEndDate(): void {
    const noofday = this.wfhForm.get('noofday').value;
    const fromdateWfh = this.wfhForm.get('fromdateWfh').value;

    if (noofday && fromdateWfh) {
      const toDateWfh = new Date(fromdateWfh);
      toDateWfh.setDate(toDateWfh.getDate() + noofday - 1);
      this.wfhForm.get('toDateWfh').setValue(this.formatDate(toDateWfh));
    }
  }

  calculateWFHEndDate(): string {


    const noofday = this.wfhForm.get('noofday').value;
    const fromdateWfh = this.wfhForm.get('fromdateWfh').value;


    if (noofday && fromdateWfh) {

      const toDateWfh = new Date(fromdateWfh);
      toDateWfh.setDate(toDateWfh.getDate() + noofday);

      return this.formatDate(toDateWfh);
    }

    return ''; // Return an empty string if either noOfDays or fromDate is not valid
  }

  // WFH logic end


  //API for show leave remaining start
  getRemainingLeaves() {
    // const token = localStorage.getItem('jwtToken');
    // console.log('remaining:', token);
    // // Create the request headers with the token
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // const url = 'http://192.168.1.11:9191/show';


    // this.http.get(url, { headers }).subscribe(

    //   (response) => {
    //     this.profileDetails = response;
    //     // handle the API response here

    //   },
    //   (error) => {
    //     // handle any errors

    //   });
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

  //API for show leave remaining end

  // API for Apply Leave start
  // onSubmit() {
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);
  //   // Create the request headers with the token
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   const url = 'http://192.168.1.11:9191/leave';
  //   const formData = this.leaveForm.value;
  //   console.log(formData);
  //   this.http.post(url, formData, { headers }).subscribe(
  //     () => {
  //       // handle the API response here
  //       Swal.fire('Applied!', 'Leave Applied successfully!', 'success');
  //       // reset the form
  //       this.leaveForm.reset();

  //     },
  //     (error) => {
  //       if (error.status === 400) {
  //         Swal.fire('Error!', 'Leave already Applied for this date!', 'error');
  //       }else if (error.status === 415) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Remaining Leaves',
  //           text: 'no casual leaves remaining.',
  //         });
  //       } else if (error.status === 500){
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Remaining Leaves',
  //           text: 'no sufficient sick leave.',
  //         });
  //       }else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'An error occurred. Please try again.',
  //         });
  //       }
  //       // handle any errors
  //       console.error(error);
  //     });
  // }
  // onSubmit() {
    
  //   // Call the service method to apply leave with form data and token
  //   this.adminService.applyLeave(this.leaveForm.value).subscribe(
  //     () => {
  //       // Handle the API response here
  //       Swal.fire('Applied!', 'Leave Applied successfully!', 'success');
  //       // Reset the form
  //       this.leaveForm.reset();
  //     },
  //     (error) => {
  //       // Handle different error cases as needed
  //       if (error.status === 400) {
  //         Swal.fire('Error!', 'Leave already Applied for this date!', 'error');
  //       } else if (error.status === 415) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Remaining Leaves',
  //           text: 'No casual leaves remaining.',
  //         });
  //       } else if (error.status === 500) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Remaining Leaves',
  //           text: 'No sufficient sick leave.',
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'An error occurred. Please try again.',
  //         });
  //       }
  //       // Handle any errors
  //       console.error(error);
  //     }
  //   );
  // }
  // API for Apply Leave end


  // API for view leave start
  // toggleAdminLeaveTable(): void {
  //   this.showAdminLeaveTable = !this.showAdminLeaveTable;

  //   if (this.showAdminLeaveTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/oneleave';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.leaveAdminData = reversedData;
  //         // Assign the received data to the leaveData property
  //         // this.leaveAdminData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // this.showAdminLeaveTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }
  // }
  // toggleAdminLeaveTable(): void {
  //   this.showAdminLeaveTable = !this.showAdminLeaveTable;

  //   if (this.showAdminLeaveTable) {
     

  //     // Call the service method to fetch admin leave data
  //     this.adminService.getViewLeave().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.leaveAdminData = reversedData;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // Hide the table if an error occurs
  //         this.showAdminLeaveTable = false;
  //       }
  //     );
  //   }
  // }
  // API for view leave end

  // API for view All leave start
  // toggleAllLeaveTable(): void {
  //   this.showAllLeaveTable = !this.showAllLeaveTable;

  //   // if (this.showAllLeaveTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/lea';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.leaveAllData = reversedData;
  //         // Assign the received data to the leaveData property
  //         // this.leaveAdminData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // this.showAdminLeaveTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   // }
  // }
  // toggleAllLeaveTable(): void {
  //   this.showAllLeaveTable = !this.showAllLeaveTable;

  //   if (this.showAllLeaveTable) {
     

  //     // Call the service method to fetch all leave data
  //     this.adminService.getAllLeave().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.leaveAllData = reversedData;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // Hide the table if an error occurs
  //         this.showAllLeaveTable = false;
  //       }
  //     );
  //   }
  // }
  // API for view All leave end

  // API for alert box check-in-out start
  // checkin() {
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const requestData = {
  //     "checkedIn": "checkedIn"
  //   };

  //   console.log('requestdata', requestData)

  //   this.http.post('http://192.168.1.11:9191/checkin', { requestData }, { headers }).subscribe(
  //     () => {

  //       Swal.fire('Checked-In!', 'You are Checked-in successfully!', 'success');
  //       console.log('Check-in successful');

  //     },
  //     (error: any) => {
  //       if (error.status === 400) {
  //         Swal.fire('Error', 'Trying to Check-In again before Check-Out.', 'error');
  //       } else {
  //         Swal.fire('Error', 'An unknown error occurred.', 'error');
  //       }
  //       console.error('Check-in error:', error);
  //     }
  //   );
  // }
  checkin() {
   
    this.adminService.performCheckin().subscribe(
      () => {
        Swal.fire('Checked-In!', 'You are Checked-in successfully!', 'success');
        console.log('Check-in successful');
      },
      (error: any) => {
        if (error.status === 400) {
          Swal.fire('Error', 'Trying to Check-In again before Check-Out.', 'error');
        } else {
          Swal.fire('Error', 'An unknown error occurred.', 'error');
        }
        console.error('Check-in error:', error);
      }
    );
  }




  // checkout() {
  //   const token = localStorage.getItem('jwtToken');

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const requestData = {
  //     checkedOut: 'checkedOut'
  //   }

  //   this.http.post('http://192.168.1.11:9191/checkout', requestData, { headers }).subscribe(
  //     () => {

  //       Swal.fire('Checked-Out!', 'You are Checked-out successfully!', 'success');

  //     },
  //     (error) => {
  //       if (error.status === 400) {
  //         Swal.fire('Error', 'Trying to Check-Out before checking in or after already checking out.', 'error');
  //       } else {
  //         Swal.fire('Error', 'Trying to Check-Out before checking in or after already checking out.', 'error');
  //       }

  //       console.error("checkout", error);
  //     }
  //   );

  // }
  checkout() {
    
    // Call the service method to perform check-out
    this.adminService.performCheckout().subscribe(
      () => {
        Swal.fire('Checked-Out!', 'You are Checked-out successfully!', 'success');
      },
      (error: any) => {
        if (error.status === 400) {
          Swal.fire('Error', 'Trying to Check-Out before checking in or after already checking out.', 'error');
        } else {
          Swal.fire('Error', 'An unknown error occurred.', 'error');
        }
        console.error('Checkout error:', error);
      }
    );
  }

  // API for alert box check-in-out end


  // API for view Attendance start
  // viewattendance() {
  //   this.showAttTable = !this.showAttTable;

  //   if (this.showAttTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/attend';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {

  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.AttData = reversedData;
  //         // Assign the received data to the wfhData property
  //         // this.AttData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // this.showAttTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }
  // }
  // viewattendance() {
  //   this.showAttTable = !this.showAttTable;

  //   if (this.showAttTable) {
     

  //     // Call the service method to fetch attendance data
  //     this.adminService.getAttendance().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.AttData = reversedData;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // Hide the table if an error occurs
  //         this.showAttTable = false;
  //       }
  //     );
  //   }
  // }


  // API for view Attendance end



  // API for view All Attendance start
  // viewAllattendance() {
  //   this.showAllAttTable = !this.showAllAttTable;


  //   // if (this.showAllAttTable) {
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   console.log("wwewewe", token);

  //   const url = 'http://192.168.1.11:9191/attendancelist';
  //   this.http.get(url, { headers }).subscribe(
  //     response => {
  //       console.log("wesrew", response);
  //       // Convert the response object to an array
  //       const dataArray = Object.values(response);
  //       // Reverse the received array
  //       const reversedData = dataArray.reverse();

  //       // Set the reversed array as the data source
  //       this.AllAttData = reversedData;
  //       console.log("all att--->", this.AllAttData);
  //       // Assign the received data to the wfhData property
  //       // this.AllAttData = response;
  //     },
  //     error => {
  //       if (error.status === 403) {
  //         // Handle the 403 Forbidden error
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Token Expired!',
  //           text: 'Access denied. Please check your permissions.',
  //         });
  //         console.error('Access denied. Please check your permissions.');
  //       } else {
  //         // Handle other errors
  //         console.error(error);
  //       }
  //       // this.showAttTable = false; // Hide the table if an error occurs
  //     }
  //   );

  // }
  // viewAllattendance() {
  //   this.showAllAttTable = !this.showAllAttTable;

  //   if (this.showAllAttTable) {
     

  //     // Call the service method to fetch all attendance data
  //     this.adminService.getAllAttendance().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.AllAttData = reversedData;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // Hide the table if an error occurs
  //         this.showAllAttTable = false;
  //       }
  //     );
  //   }
  // }

  // API for view All Attendance end

  // API for apply WFH start
  // onWFHSubmit() {
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);
  //   // Create the request headers with the token
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   const url = 'http://192.168.1.11:9191/wfh';
  //   const formData = this.wfhForm.value;

  //   this.http.post(url, formData, { headers }).subscribe(
  //     () => {
  //       // handle the API response here
  //       Swal.fire('Success!', 'Work From Home Applied successfully, Waiting for response!', 'success');
  //       this.wfhForm.reset()
  //     },
  //     (error) => {

  //       if (error.status === 400) {
  //         Swal.fire('Error', 'You have alredy apply Work From Home for this date.', 'error');
  //       } else if(error.status === 500){
  //         Swal.fire('Error', 'you have no sufficient days to apply work from home.', 'error');
  //       } else {
  //         Swal.fire('Error', 'An error occurred while applying wfh.', 'error');
  //       }
  //     });
  // }
  // onWFHSubmit() {
   

  //   // Call the service method to apply for WFH
  //   this.adminService.applyWfh(this.wfhForm.value).subscribe(
  //     () => {
  //       // handle the API response here
  //       Swal.fire('Success!', 'Work From Home Applied successfully, Waiting for response!', 'success');
  //       this.wfhForm.reset()
  //     },
  //     (error: any) => {
  //       if (error.status === 400) {
  //         Swal.fire('Error', 'You have already applied for Work From Home on this date.', 'error');
  //       } else if (error.status === 500) {
  //         Swal.fire('Error', 'You have no sufficient days to apply for Work From Home.', 'error');
  //       } else {
  //         Swal.fire('Error', 'An error occurred while applying for WFH.', 'error');
  //       }
  //     }
  //   );
  // }

  // API for apply WFH end




  // API for view WFH start
  // toggleWfhTable(): void {
  //   this.showWfhTable = !this.showWfhTable;

  //   if (this.showWfhTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/onewfh';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.wfhData = reversedData;
  //         // Assign the received data to the wfhData property
  //         // this.wfhData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // this.showWfhTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }
  // }
  // toggleWfhTable(): void {
  //   this.showWfhTable = !this.showWfhTable;

  //   if (this.showWfhTable) {
    
  //     // Call the service method to fetch WFH data
  //     this.adminService.getWfhData().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.wfhData = reversedData;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // Hide the table if an error occurs
  //         this.showWfhTable = false;
  //       }
  //     );
  //   }
  // }
  // API for view WFH end

  // API for view All WFH start
  // toggleAllWfhTable(): void {
  //   this.showAllWfhTable = !this.showAllWfhTable;

  //   if (this.showAllWfhTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/showwfhAdmin';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.AllwfhData = reversedData;
  //         // Assign the received data to the wfhData property
  //         // this.wfhData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // this.showWfhTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }
  // }
  // toggleAllWfhTable(): void {
  //   this.showAllWfhTable = !this.showAllWfhTable;

  //   if (this.showAllWfhTable) {
      
  //     // Call the service method to fetch all WFH data for administrators
  //     this.adminService.getAllWfhData().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.AllwfhData = reversedData;
  //         console.log("wwewewe", response);
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         // Hide the table if an error occurs
  //         this.showAllWfhTable = false;
  //       }
  //     );
  //   }
  // }
  // API for view All  WFH end

  //API for team Leave start
  // teamleave(): void {
  //   this.showTeamLeaveTable = !this.showTeamLeaveTable;

  //   if (this.showTeamLeaveTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/leaves';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.TeamLeaveData = reversedData;
  //         // Assign the received data to the wfhData property
  //         // this.TeamLeaveData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         this.showTeamLeaveTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }

  // }
  // teamleave(): void {
  //   this.showTeamLeaveTable = !this.showTeamLeaveTable;
  
  //   if (this.showTeamLeaveTable) {
  //     this.dashboardService.getTeamLeaveData().subscribe(
  //       (response) => {
  //         // Assign the received data to the TeamLeaveData property
  //         this.TeamLeaveData = response;
  //         console.log("leave", response);
  //       },
  //       (error) => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error('API error:', error);
  //         }
  //         this.showTeamLeaveTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }
  // }
  //API for team Leave end
  // close team leave list start
  closeleavelist(): void {
    this.showTeamLeaveTable = false;
  }
  // close team leave list end

  //API for team WFH start
  // teamwfh(): void {
  //   this.showTeamWfhTable = !this.showTeamWfhTable;

  //   if (this.showTeamWfhTable) {
  //     const token = localStorage.getItem('jwtToken');
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     const url = 'http://192.168.1.11:9191/work';
  //     this.http.get(url, { headers }).subscribe(
  //       response => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.TeamWfhData = reversedData;
  //         // Assign the received data to the wfhData property
  //         // this.TeamWfhData = response;
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //         this.showTeamWfhTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }

  // }
  // teamwfh(): void {
  //   this.showTeamWfhTable = !this.showTeamWfhTable;
  
  //   if (this.showTeamWfhTable) {
  //     this.dashboardService.getTeamWfhData().subscribe(
  //       (response) => {
  //         // Assign the received data to the TeamLeaveData property
  //         this.TeamWfhData = response;
  //         console.log("wfh", response);
  //       },
  //       (error) => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error('API error:', error);
  //         }
  //         this.showTeamWfhTable = false; // Hide the table if an error occurs
  //       }
  //     );
  //   }
  // }
  //API for team WFH end
  // close team wfh list start
  closeteamWfhlist(): void {
    this.showTeamWfhTable = false;
  }
  // close team wfh list end



  // API for view employee list start
  // openModal(): void {
  //   this.showAllEmloyeeTable = !this.showAllEmloyeeTable;
  //   // this.EmployeeData = true;
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   const url = 'http://192.168.1.11:9191/registerlist';



  //   this.http.get(url, { headers }).subscribe(
  //     response => {
  //       // Convert the response object to an array
  //       const dataArray = Object.values(response);
  //       // Reverse the received array
  //       const reversedData = dataArray.reverse();

  //       // Set the reversed array as the data source
  //       this.EmployeeData = reversedData;
  //       // Assign the received data to the wfhData property
  //       // this.EmployeeData = response;
  //       console.log("employee Data>>", response);
  //     },
  //     error => {
  //       if (error.status === 403) {
  //         // Handle the 403 Forbidden error
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Token Expired!',
  //           text: 'Access denied. Please check your permissions.',
  //         });
  //         console.error('Access denied. Please check your permissions.');
  //       } else {
  //         // Handle other errors
  //         console.error(error);
  //       }

  //     }
  //   );

  // }
  // openModal(): void {
  //   this.showAllEmloyeeTable = !this.showAllEmloyeeTable;

  //   if (this.showAllEmloyeeTable) {
     

  //     // Call the service method to fetch the list of employees
  //     this.adminService.getEmployeeList().subscribe(
  //       (response: any) => {
  //         // Convert the response object to an array
  //         const dataArray = Object.values(response);
  //         // Reverse the received array
  //         const reversedData = dataArray.reverse();

  //         // Set the reversed array as the data source
  //         this.EmployeeData = reversedData;
  //         console.log("employee Data>>", response);
  //       },
  //       error => {
  //         if (error.status === 403) {
  //           // Handle the 403 Forbidden error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Token Expired!',
  //             text: 'Access denied. Please check your permissions.',
  //           });
  //           console.error('Access denied. Please check your permissions.');
  //         } else {
  //           // Handle other errors
  //           console.error(error);
  //         }
  //       }
  //     );
  //   }
  // }


  // redirectToUpdatePage(employeeId: number): void {
  //   this.router.navigateByUrl(`/update?id=${employeeId}`);
  // }







  // API for view employee list end

  // API for delete employee start
  // deleteEmployee(id: any): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "Are you sure you want delete this Employee ?",
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
  //       const updateUrl = `http://192.168.1.11:9191/delete/` + id;

  //       this.http.delete(updateUrl, { headers }).subscribe(
  //         () => {
  //           console.log('Employee deleted successfully.');
  //           Swal.fire({
  //             title: 'Deleted!',
  //             text: 'Employee has been deleted.',
  //             icon: 'success'
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               location.reload();
  //             }
  //           });
  //         },
  //         (error) => {
  //           console.error('An error occurred while deleting the employee:', error);
  //         }
  //       );
  //     }
  //   });
  // }
  // deleteEmployee(id: any): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Are you sure you want to delete this Employee?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.dashboardService.deleteEmployee(id).subscribe(
  //         () => {
  //           console.log('Employee deleted successfully.');
  //           Swal.fire({
  //             title: 'Deleted!',
  //             text: 'Employee has been deleted.',
  //             icon: 'success'
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               location.reload();
  //             }
  //           });
  //         },
  //         (error) => {
  //           console.error('An error occurred while deleting the employee:', error);
  //         }
  //       );
  //     }
  //   });
  // }
  // API for delete employee end


  //API for logout start
  // signOut() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "Are you sure you want sign-out ?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, sign-out!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //   // log out code
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   const url = 'http://192.168.1.11:9191/signout';

  //   this.http.post(url, null, { headers }).subscribe(
  //     () => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Sign Out',
  //         text: 'Signed out successfully!',
  //         showConfirmButton: false,
  //         timer: 1000 // Display for 1 second
  //       });

  //       localStorage.removeItem('jwtToken');
  //       this.router.navigate(['/login']);

  //       // Perform any additional actions after successful logout
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Sign Out Error',
  //         text: 'Failed to sign out.',
  //       });
  //       console.error('An error occurred while logging out:', error);
  //     }
  //     );
  //   }
  //   });
  //   }
  signOut() {
    this.loginService.SignOut().subscribe(
      () => {
      
      },
      (error) => {
        // Handle any errors that occur during the logout process.
        console.error('Logout error:', error);
      }
    );
  }
  // API for logout end

  // API for approve team Leave start
  // approveLeave(id: any): void {
  //   const apiUrl = `http://192.168.1.11:9191/leaves/` + id;

  //   const token = localStorage.getItem('jwtToken');
  //   console.log(token);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const requestBody = {
  //     approval: 'Approved'
  //   }

  //   this.http.post(apiUrl, requestBody, { headers }).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Approved',
  //         text: 'Leave Approved successfully!',
  //       });
  //       console.log('Leave approved:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Approval Error',
  //         text: 'Failed to Approved.',
  //       });
  //       console.error('Failed to approve leave:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }

  // approveLeave(id: number): void {
  
  //   this.dashboardService.approveLeave(id).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Approved',
  //         text: 'Leave Approved successfully!',
  //       });
  //       console.log('Leave approved:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Approval Error',
  //         text: 'Failed to approve.',
  //       });
  //       console.error('Failed to approve leave:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // API for approve team Leave end

  // API for reject team Leave start
  // rejectLeave(id: any): void {
  //   const apiUrl = `http://192.168.1.11:9191/leaves/` + id;
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const requestBody = {
  //     approval: 'Rejected'
  //   }
  //   this.http.post(apiUrl, requestBody, { headers }).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Rejected',
  //         text: 'Leave Rejected successfully!',
  //       });
  //       console.log('Leave rejected:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Reject Error',
  //         text: 'Failed to Rejected.',
  //       });
  //       console.error('Failed to reject leave:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // rejectLeave(id: number): void {
  
  //   this.dashboardService.rejectLeave(id).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Rejected',
  //         text: 'Leave Rejected successfully!',
  //       });
  //       console.log('Leave approved:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Reject Error',
  //         text: 'Failed to Rejected.',
  //       });
  //       console.error('Failed to reject leave:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // API for reject team Leave end



  // API for approve team WFH start
  // ApproveWfh(id: any): void {
  //   const apiUrl = `http://192.168.1.11:9191/wfh/` + id;

  //   const token = localStorage.getItem('jwtToken');
  //   console.log(token);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const requestBody = {
  //     approval: 'Approved'
  //   }

  //   this.http.put(apiUrl, requestBody, { headers }).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Approved',
  //         text: 'WFH Approved successfully!',
  //       });
  //       console.log('Leave approved:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Approval Error',
  //         text: 'Failed to Approved.',
  //       });
  //       console.error('Failed to approve leave:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // ApproveWfh(id: number): void {
  
  //   this.dashboardService.approveWfh(id).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Approved',
  //         text: 'WFH Approved successfully!',
  //       });
  //       console.log('WFH approved:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Approval Error',
  //         text: 'Failed to approve.',
  //       });
  //       console.error('Failed to approve WFH:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // API for approve team WFH end

  // API for reject team WFH start
  // RejectWfh(id: any): void {
  //   const apiUrl = `http://192.168.1.11:9191/wfh/` + id;
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const requestBody = {
  //     approval: 'Rejected'
  //   }
  //   this.http.put(apiUrl, requestBody, { headers }).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Rejected',
  //         text: 'WFH Rejected successfully!',
  //       });
  //       console.log('Leave rejected:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Reject Error',
  //         text: 'Failed to Rejected.',
  //       });
  //       console.error('Failed to reject leave:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // RejectWfh(id: number): void {
  
  //   this.dashboardService.rejectWfh(id).subscribe(
  //     (response: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Rejected',
  //         text: 'WFH Rejected successfully!',
  //       });
  //       console.log('WFH approved:', response);
  //       // Handle success, update UI, etc.
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Reject Error',
  //         text: 'Failed to Rejected.',
  //       });
  //       console.error('Failed to reject WFH:', error);
  //       // Handle error, show error message, etc.
  //     }
  //   );
  // }
  // API for reject team WFH end



  // show profile start
  // viewEmployeeProfile() {
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);

  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   // Fetch the team leads from the API endpoint
  //   this.http.get('http://192.168.1.11:9191/show', { headers })
  //     .subscribe(
  //       (response) => {
  //         this.profileDetails = response;
  //         console.log("data profile>>>>>>>>",response);


  //       },
  //       (error) => {
  //         console.error('Failed to fetch team leads:', error);
  //       }
  //     );
  // }
  // show profile end

  //  API for Edit profile data start
  // editProfile() {
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);

  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   // Prepare the data to be sent in the request body
  //   const requestBody = {
  //     phonenumber: this.phonenumber,
  //     birthDay: this.birthDay,
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
  //         Swal.fire('Edit!', 'Your Basic Information Edited successfully!', 'success');
  //         // console.log('Profile edit successfully');
  //         // console.log("data",requestBody);
  //         // Optionally, you can reload the profile data or perform any other action after the update
  //       },
  //       (error) => {
  //         console.error('Failed to edit profile:', error);
  //       }
  //     );
  // }
  // editProfile() {
   

  //   // Prepare the data to be sent in the request body
  //   const requestBody = {
  //     phonenumber: this.phonenumber,
  //     birthDay: this.birthDay,
  //     maritalStatus: this.maritalStatus,
  //     bloodGroup: this.bloodGroup,
  //     skills: this.skills,
  //     emergencyContact: this.emergencyContact,
  //     address: this.address
  //   };

  //   // Call the service method to edit the user profile
  //   this.adminService.editUserProfile(requestBody).subscribe(
  //     () => {
  //       Swal.fire('Edit!', 'Your Basic Information Edited successfully!', 'success');
  //       // Optionally, you can reload the profile data or perform any other action after the update
  //     },
  //     (error) => {
  //       console.error('Failed to edit profile:', error);
  //     }
  //   );
  // }

  // API for Edit profile data end

  // API for show user details to admin / super admin start
  // EmployeeProfile(item: any): void {
  //   const token = localStorage.getItem('jwtToken');

  //   // const urlParams = new URLSearchParams(window.location.search);
  //   // const employeeId = urlParams.get('id')
  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const updateUrl = `http://192.168.1.11:9191/employeemail/` + `${item.id}`;
  //   // Fetch the team leads from the API endpoint
  //   this.http.get(updateUrl, { headers })

  //     .subscribe(

  //       (response: any) => {
  //         this.profileDetails = response;


  //       },
  //       (error) => {
  //         //  console.error('Failed to fetch team leads:', error);
  //       }
  //     );

  // }
  // EmployeeProfile(item: any): void {
  //   // Assuming 'item' has an 'id' property
  //   const id = item.id;
    
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
  // API for show user details to admin / super admin end



  // API for update page strat

  // EmployeeUpdate(item: any): void {
  //   const token = localStorage.getItem('jwtToken');

  //   // const urlParams = new URLSearchParams(window.location.search);
  //   // const employeeId = urlParams.get('id')
  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const updateUrl = `http://192.168.1.11:9191/findAll/` + `${item.id}`;
  //   // Fetch the team leads from the API endpoint
  //   console.log(updateUrl);
  //   this.http.get(updateUrl, { headers })

  //     .subscribe(

  //       (response: any) => {
  //         this.profileDetails = response;
  //         console.log("ssssssssss>>>>>>>>>>>>>>>",response);

  //       },
  //       (error) => {
  //         //  console.error('Failed to fetch team leads:', error);
  //       }
  //     );

  // }
  // API for update page end

  // API for update user details start
  updateEmployeeData(user: any) {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make sure to replace 'API_ENDPOINT' with the actual URL of your update API
    const updateUrl = `http://192.168.1.11:9191/pass/` + `${user.id}`;
    console.log(updateUrl);
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      emailid: user.emailid,
      phonenumber: user.phonenumber,
      teamlead: user.teamlead,
      dateofjoining: user.dateofjoining,
      designation: user.designation,
      dob: user.dob,
      role: user.role,
      department: user.department,
      totalleaves: user.totalleaves
    };
    console.log("update", data);
    // Send the updated user data to the API
    this.http.put(updateUrl, data, { headers })
      .subscribe(
        response => {
          // Handle the API response if needed
          console.log('Update API response:', response);
          // Add any additional logic you need after the update is successful
        },
        error => {
          // Handle the error if the API request fails
          console.error('Update API error:', error);
          // Add any error handling logic you need
        }
      );
  }

  // API for update user details end

  // API for show teamlead names start
  // teamleadshow() {
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);

  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   // Fetch the team leads from the API endpoint
  //   this.http.get('http://192.168.1.11:9191/names', { headers })
  //     .subscribe(
  //       (response: any) => {
  //         this.teamlead = response; // Assuming the API response is an array of team leads
  //         //  console.log('Team lead:', this.teamlead);
  //         this.token = response.token;
  //       },
  //       (error) => {
  //         console.error('Failed to fetch team leads:', error);
  //       }
  //     );
  // }
  teamleadshow() {
    // Call the getTeamLeads function from the service to fetch team leads
    this.RegisterAndUpdate.getTeamLeads().subscribe(
      (response: any) => {
        this.teamlead = response;
        console.log('Team lead:', this.teamlead);
        this.token = response.token;
      },
      (error) => {
        console.error('Failed to fetch team leads:', error);
      }
    );
  }
  // API for show teamlead names end

  // API for designation start
  designations(){
 
    this.RegisterAndUpdate.getdesignation().subscribe(
        (response: any) => {
          this.designation = response; // Assuming the API response is an array of team leads
          console.log('Designation:', this.designation);
          this.token = response.token;
        },
        (error) => {
          console.error('Failed to fetch designation:', error);
        }
      );
  }

  // API for designation end

  // API for department start
  department(){
 
    this.RegisterAndUpdate.getdepartment().subscribe(
        (response: any) => {
          this.departments = response; // Assuming the API response is an array of team leads
          console.log('Department:', this.departments);
          this.token = response.token;
        },
        (error) => {
          console.error('Failed to fetch Department:', error);
        }
      );
  }
  // API for department end

  //API for getting role start
  // Getrole() {
  //   // Get the token from localStorage
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);

  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   // Fetch the team leads from the API endpoint
  //   this.http.get('http://192.168.1.11:9191/getAllRole', { headers })
  //     .subscribe(
  //       (response: any) => {
  //         this.role = response; // Assuming the API response is an array of team leads
  //         console.log('Role:', this.role);
  //         this.token = response.token;
  //       },
  //       (error) => {
  //         console.error('Failed to fetch team leads:', error);
  //       }
  //     );

  // }
  Getrole() {
 
    this.RegisterAndUpdate.getrole().subscribe(
        (response: any) => {
          this.role = response; // Assuming the API response is an array of team leads
          console.log('Role:', this.role);
          this.token = response.token;
        },
        (error) => {
          console.error('Failed to fetch team leads:', error);
        }
      );
  
  }
  //API for getting role end

  //API for change Password start
  // changePassword() {
  //   // Get the token from wherever it is stored (e.g., local storage, a service)
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);
  //   // Create the request headers with the token
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   // Create the request body with the form values
  //   const requestBody = {
  //     oldPassword: this.passwordForm.get('oldPassword').value,
  //     newPassword: this.passwordForm.get('newPassword').value,
  //     confirmPassword: this.passwordForm.get('confirmPassword').value
  //   };

  //   // Send the API request
  //   this.http.put('http://192.168.1.11:9191/change-password', requestBody, { headers }).subscribe(
  //     () => {



  //       console.log('Success!'); // Print success message in the console
  //       Swal.fire({
  //         title: 'Changed',
  //         text: 'Password changed successfully'
  //       }).then(() => {
  //         // Redirect based on user role
  //         localStorage.removeItem('jwtToken');
  //         localStorage.removeItem('permissionLength');
  //         this.router.navigate(['/login']);
  //         location.reload();
  //       });

  //     },
  //     (error) => {
  //       if (error.status === 400) {
  //         Swal.fire({
  //           title: 'Error',
  //           text: 'Old password is incorrect'
  //         })
  //       }
  //       // Handle the error response
  //       console.error('API error:', error);
  //       // Additional error handling...
  //     }
  //   );

  // }
  // changePassword() {
    
  //   const oldPassword = this.passwordForm.get('oldPassword').value;
  //   const newPassword = this.passwordForm.get('newPassword').value;
  //   const confirmPassword = this.passwordForm.get('confirmPassword').value;

  //   // Call the service method to change the password
  //   this.loginService.changePassword(oldPassword, newPassword, confirmPassword).subscribe(
  //     () => {
  //       console.log('Success!'); // Print success message in the console
  //       Swal.fire({
  //         title: 'Changed',
  //         text: 'Password changed successfully'
  //       }).then(() => {
  //         // Redirect based on user role
  //         localStorage.removeItem('jwtToken');
  //         localStorage.removeItem('permissionLength');
  //         this.router.navigate(['/login']);
  //         location.reload();
  //       });
  //     },
  //     (error) => {
  //       if (error.status === 400) {
  //         Swal.fire({
  //           title: 'Error',
  //           text: 'Old password is incorrect'
  //         });
  //       }
  //       // Handle the error response
  //       console.error('API error:', error);
  //       // Additional error handling...
  //     }
  //   );
  // }
  //API for change Password end

  // pagination start
  // // Declare the following variables in your component:
  // currentPage: number = 1;
  // pageSize: number = 10; // Number of items per page
  // // EmployeeData: any[] = []; // Your employee data array

  // // Calculate the total number of pages based on the data length and page size:
  // get totalPages(): number {
  //   return Math.ceil(this.EmployeeData.length / this.pageSize);
  // }

  // // Calculate the array of page numbers to display in the pagination component:
  // get pages(): number[] {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }

  // // Create a computed property to get the current page's data:
  // get pagedEmployeeData(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   return this.EmployeeData.slice(startIndex, endIndex);
  // }

  // // Method to navigate to a specific page:
  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //   }
  // }

  // pagination end



  // API for new registration start
  // onRegister() {
  //   // Perform registration logic here, such as sending the data to a server or saving it locally
  //   console.log('Registration form submitted');
  //   console.log(this.user);

  //   // Get the token from localStorage
  //   const token = localStorage.getItem('jwtToken');
  //   console.log('Token:', token);

  //   // Set the token in the request headers
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   this.http.post('http://192.168.1.11:9191/signup', this.user, { headers })
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Registration successful:', response);

  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Registration successful',
  //           text: 'New User Registered Successful',
  //         })
  //           .then(() => {
  //             // Refresh page 
  //             location.reload();
  //           });
  //       },
  //       (error: any) => {
  //         if (error.status === 400) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Email id already exist',
  //             text: 'Please enter a valid Email id.',
  //           });
  //         } else if (error.status === 500) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Internal Server Error',
  //             text: 'Oops! Something went wrong on the server. Please try again later.',
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
  // }
  // API for new registration end


  // API for current image start
  // getUserPhoto(): void {
  //   const apiUrl = 'http://192.168.1.11:9191/photo/current';
  //   const token = localStorage.getItem('jwtToken');
  //   console.log("current", token);

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
  // API for current image end

}
function updateEmployee(employeeId: any, number: any) {
  throw new Error('Function not implemented.');
}


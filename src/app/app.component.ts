import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CategoriesComponent } from './categories/categories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiServiceService } from './service/api-service.service';
import { KeysServiceService } from './service/keys-service.service';
import { SecretKeysServiceService } from './service/secret-keys-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminDBComponent } from './Admin/admin-db/admin-db.component';
import { EmployeeDBComponent } from './Employee/employee-db/employee-db.component';
import { EmployeeProjectComponent } from './Employee/employee-project/employee-project.component';
import { AssignTaskComponent } from './Employee/assign-task/assign-task.component';
import { ClientDBComponent } from './Client/client-db/client-db.component';
import { LoginWithOTPComponent } from './login-with-otp/login-with-otp.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    LoginWithOTPComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NavbarComponent,
    HomeComponent,
    AdminDBComponent,
    EmployeeDBComponent,
    ClientDBComponent,
    EmployeeProjectComponent,
    AssignTaskComponent,
    RouterOutlet,
    MatSidenavModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    LoginComponent
  ],
  providers: [ApiServiceService, KeysServiceService, SecretKeysServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title:any;
  // loginWithOTP : boolean |any;

  constructor(public apiService :ApiServiceService,  private router: Router,) {}
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position and update showScrollButton accordingly
    this.showScrollButton = window.scrollY > 0;
  }
 ngOnInit(): void {
  // this.loginWithOTP();

      console.log('===> <====',this.router.url)
 }
 scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 loginWithOTP(): boolean {
  return this.router.url.startsWith('/log-in/otp');
}
forgotPassword(): boolean {
  return this.router.url.startsWith('/forgot/password');
}




  
}

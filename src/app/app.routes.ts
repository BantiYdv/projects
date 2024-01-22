import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CategoriesComponent } from './categories/categories.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { LoginComponent } from './login/login.component';
import { AdminDBComponent } from './Admin/admin-db/admin-db.component';
import { ProjectComponent } from './Admin/project/project.component';
import { authGuard } from './service/auth.guard';
import { TeamMemberComponent } from './Admin/team-member/team-member.component';
import { TaskComponent } from './Admin/task/task.component';
import { WorkStatusComponent } from './Admin/work-status/work-status.component';
import { AppComponent } from './app.component';
import { EmployeeDBComponent } from './Employee/employee-db/employee-db.component';
import { EmployeeProjectComponent } from './Employee/employee-project/employee-project.component';
import { AssignTaskComponent } from './Employee/assign-task/assign-task.component';
import { ViewTaskComponent } from './Employee/view-task/view-task.component';
import { ClientDBComponent } from './Client/client-db/client-db.component';
import { LoginWithOTPComponent } from './login-with-otp/login-with-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
    // {'path': '', component:AppComponent },
    // {'path': 'home',component:HomeComponent},
    // {'path': 'portfolio', component:HomeComponent },
    // {'path': 'blog', component:HomeComponent },
    // {'path': 'why-us', component:HomeComponent },
    // {'path': 'how-it-works', component:HowItWorkComponent},
    // {'path': 'log-in', component:LoginComponent},
    { 'path': '', component: HomeComponent },
    {'path': ':pageType', component:HomeComponent},

    {'path': 'log-in/otp', component:LoginWithOTPComponent},
    {'path': 'forgot/password', component:ForgotPasswordComponent},

    {'path': 'project', component:ProjectComponent,canActivate: [authGuard]},//admin
    {'path': 'teamMember', component:TeamMemberComponent,canActivate: [authGuard]},//admin
    {'path': 'task', component:TaskComponent,canActivate: [authGuard]},//admin
    {'path': 'workStatus', component:WorkStatusComponent,canActivate: [authGuard]},//admin
    
    {'path': 'employee-project', component:EmployeeProjectComponent,canActivate: [authGuard]},//employee
    {'path': 'employee-assign-task', component:AssignTaskComponent,canActivate: [authGuard]},//employee
    {'path': 'view-task', component:ViewTaskComponent,canActivate: [authGuard]},//employee

    {'path': 'work-status', component:ClientDBComponent,canActivate: [authGuard]},//user




    { path: '**', redirectTo: 'home' }
];

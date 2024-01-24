import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CategoriesComponent } from './categories/categories.component';

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
import { BriefsComponent } from './Admin/briefs/briefs.component';
import { ClientComponent } from './Admin/client/client.component';
import { CreativeAssetsComponent } from './Admin/creative-assets/creative-assets.component';
import { FileSharingComponent } from './Admin/file-sharing/file-sharing.component';
import { HistoryComponent } from './Admin/history/history.component';
import { CreativeAssetTableComponent } from './Employee/creative-asset-table/creative-asset-table.component';
import { CreativeAssetComponent } from './Employee/creative-asset/creative-asset.component';

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

    {'path': 'admin/project', component:ProjectComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/briefs', component:BriefsComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/client', component:ClientComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/creative-assets', component:CreativeAssetsComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/file-sharing', component:FileSharingComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/history', component:HistoryComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/teamMember', component:TeamMemberComponent,canActivate: [authGuard]},//admin
    {'path': 'admin/task', component:TaskComponent,canActivate: [authGuard]},//admin
    {'path': 'workStatus', component:WorkStatusComponent,canActivate: [authGuard]},//admin
    
    {'path': 'employee/creative-asset', component:CreativeAssetComponent,canActivate: [authGuard]},//employee
    {'path': 'employee/creative-asset-table', component:CreativeAssetTableComponent,canActivate: [authGuard]},//employee
    {'path': 'employee/employee-project', component:EmployeeProjectComponent,canActivate: [authGuard]},//employee
    {'path': 'employee/employee-assign-task', component:AssignTaskComponent,canActivate: [authGuard]},//employee
    {'path': 'employee/view-task', component:ViewTaskComponent,canActivate: [authGuard]},//employee

    {'path': 'user/work-status', component:ClientDBComponent,canActivate: [authGuard]},//user




    { path: '**', redirectTo: 'home' }
];

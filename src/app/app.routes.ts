import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
// import { CategoriesComponent } from './categories/categories.component';

import { AdminDBComponent } from "./Admin/admin-db/admin-db.component";
import { ProjectComponent } from "./Admin/project/project.component";
import { authGuard } from "./service/auth.guard";
import { TeamMemberComponent } from "./Admin/team-member/team-member.component";
import { TaskComponent } from "./Admin/task/task.component";
// import { WorkStatusComponent } from './Admin/work-status/work-status.component';
import { WorkStatusComponent } from "./Client/work-status/work-status.component";
import { AppComponent } from "./app.component";
import { EmployeeDBComponent } from "./Employee/employee-db/employee-db.component";
import { EmployeeProjectComponent } from "./Employee/employee-project/employee-project.component";
import { AssignTaskComponent } from "./Employee/assign-task/assign-task.component";
import { ViewTaskComponent } from "./Employee/view-task/view-task.component";
import { ClientDBComponent } from "./Client/client-db/client-db.component";
import { LoginWithOTPComponent } from "./login-with-otp/login-with-otp.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { BriefsComponent } from "./Admin/briefs/briefs.component";
import { ClientComponent } from "./Admin/client/client.component";
import { CreativeAssetsAdminComponent } from "./Admin/creative-assets/creative-assets.component";
import { FileSharingAdminComponent } from "./Admin/file-sharing/file-sharing.component";
import { FileSharingUserComponent } from "./Client/file-sharing/file-sharing.component";
import { HistoryComponent } from "./Admin/history/history.component";
import { CreativeAssetTableComponent } from "./Employee/creative-asset-table/creative-asset-table.component";
import { CreativeAssetsEmployeeComponent } from "./Employee/creative-asset/creative-asset.component";
import { CreativeAssetsUserComponent } from "./Client/creative-asset/creative-asset.component";
import { FileSharingTableComponent } from "./Client/file-sharing-table/file-sharing-table.component";
import { CreativeAssetsTableComponent } from "./Admin/creative-assets-table/creative-assets-table.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home/:pageType", component: HomeComponent },

  { path: "log-in/otp", component: LoginWithOTPComponent },
  { path: "forgot/password", component: ForgotPasswordComponent },

  {
    path: "admin/project",
    component: ProjectComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/briefs",
    component: BriefsComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/client",
    component: ClientComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/creative-assets",
    component: CreativeAssetsAdminComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/creative-assets-table",
    component: CreativeAssetsTableComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/file-sharing",
    component: FileSharingAdminComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/history",
    component: HistoryComponent,
    canActivate: [authGuard],
  }, //admin
  {
    path: "admin/teamMember",
    component: TeamMemberComponent,
    canActivate: [authGuard],
  }, //admin
  { path: "admin/task", component: TaskComponent, canActivate: [authGuard] }, //admin
  {
    path: "workStatus",
    component: WorkStatusComponent,
    canActivate: [authGuard],
  }, //admin

  {
    path: "employee/creative-asset",
    component: CreativeAssetsEmployeeComponent,
    canActivate: [authGuard],
  }, //employee
  {
    path: "employee/creative-asset-table",
    component: CreativeAssetTableComponent,
    canActivate: [authGuard],
  }, //employee
  {
    path: "employee/employee-project",
    component: EmployeeProjectComponent,
    canActivate: [authGuard],
  }, //employee
  {
    path: "employee/employee-assign-task",
    component: AssignTaskComponent,
    canActivate: [authGuard],
  }, //employee
  {
    path: "employee/view-task",
    component: ViewTaskComponent,
    canActivate: [authGuard],
  }, //employee

  {
    path: "user/work-status",
    component: WorkStatusComponent,
    canActivate: [authGuard],
  }, //user
  {
    path: "user/creative-assets",
    component: CreativeAssetsUserComponent,
    canActivate: [authGuard],
  }, //user
  {
    path: "user/file-sharing",
    component: FileSharingUserComponent,
    canActivate: [authGuard],
  }, //user
  {
    path: "user/file-sharing-table",
    component: FileSharingTableComponent,
    canActivate: [authGuard],
  }, //user
  { path: "not-found/404", component: NotFoundPageComponent },
  { path: "**", redirectTo: "not-found/404" },
];

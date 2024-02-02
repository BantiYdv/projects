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
import { roleAuthAdminGuard } from "./service/role-auth-admin.guard";
import { roleAuthEmployeeGuard } from "./service/role-auth-employee.guard";
import { roleAuthUserGuard } from "./service/role-auth-user.guard";
import { notLoggedInGuard } from "./service/not-logged-in.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent ,canActivate: [notLoggedInGuard]},
  { path: "user/:pageType", component: HomeComponent,canActivate: [notLoggedInGuard] },

  { path: "log-in/otp", component: LoginWithOTPComponent,canActivate: [notLoggedInGuard] },
  { path: "forgot/password", component: ForgotPasswordComponent,canActivate: [notLoggedInGuard] },

  {
    path: "admin/project",
    component: ProjectComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/briefs",
    component: BriefsComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/client",
    component: ClientComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/creative-assets",
    component: CreativeAssetsAdminComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/creative-assets-table",
    component: CreativeAssetsTableComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/file-sharing",
    component: FileSharingAdminComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/history",
    component: HistoryComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  {
    path: "admin/teamMember",
    component: TeamMemberComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin
  { path: "admin/task", component: TaskComponent, canActivate: [authGuard, roleAuthAdminGuard] }, //admin
  {
    path: "workStatus",
    component: WorkStatusComponent,
    canActivate: [authGuard, roleAuthAdminGuard],
  }, //admin

  {
    path: "employee/creative-asset",
    component: CreativeAssetsEmployeeComponent,
    canActivate: [authGuard, roleAuthEmployeeGuard],
  }, //employee
  {
    path: "employee/creative-asset-table",
    component: CreativeAssetTableComponent,
    canActivate: [authGuard, roleAuthEmployeeGuard],
  }, //employee
  {
    path: "employee/employee-project",
    component: EmployeeProjectComponent,
    canActivate: [authGuard, roleAuthEmployeeGuard],
  }, //employee
  {
    path: "employee/employee-assign-task",
    component: AssignTaskComponent,
    canActivate: [authGuard, roleAuthEmployeeGuard],
  }, //employee
  {
    path: "employee/view-task",
    component: ViewTaskComponent,
    canActivate: [authGuard, roleAuthEmployeeGuard],
  }, //employee

  {
    path: "client/work-status",
    component: WorkStatusComponent,
    canActivate: [authGuard, roleAuthUserGuard],
  }, //user
  {
    path: "client/creative-assets",
    component: CreativeAssetsUserComponent,
    canActivate: [authGuard, roleAuthUserGuard],
  }, //user
  {
    path: "client/file-sharing",
    component: FileSharingUserComponent,
    canActivate: [authGuard, roleAuthUserGuard],
  }, //user
  {
    path: "client/file-sharing-table",
    component: FileSharingTableComponent,
    canActivate: [authGuard, roleAuthUserGuard],
  }, //user
  { path: "not-found/404", component: NotFoundPageComponent },
  { path: "**", redirectTo: "not-found/404" },
];

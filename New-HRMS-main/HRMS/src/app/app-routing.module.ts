import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { authGuard } from './services/auth.guard';
import { UpdateComponent } from './Components/update/update.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { TestComponent } from './Components/test/test.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate:[authGuard]
  },
  {
    path: "registration",
    component: RegistrationComponent,
    pathMatch: "full",
  },
 
  {
    path:"update",
    component: UpdateComponent,
    pathMatch: "full",
  },
  {
    path:"admin",
    component: AdminComponent,
    pathMatch: "full",
  },
  {
    path:"profile",
    component: ProfileComponent,
    pathMatch: "full",
  },
  {
    path:"profile/:tableType",
    component: ProfileComponent,
    pathMatch: "full",
  },
  {
    path:"profile/:id",
    component: ProfileComponent,
    pathMatch: "full",
  },
  
  {
    path:"test/:tableType",
    component: TestComponent,
    pathMatch: "full",
  },
  {
    path:"**",
    component: NotFoundComponent,
    pathMatch: "full",
  },
  
    // Other routes
    { path: 'update/:id', component: UpdateComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'top' // Scroll to top when navigating
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

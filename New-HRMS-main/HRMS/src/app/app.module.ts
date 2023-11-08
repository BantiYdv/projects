import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RegistrationComponent } from './Components/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateComponent } from './Components/update/update.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { NgSelectModule } from '@ng-select/ng-select';

import {FullCalendarModule} from '@fullcalendar/angular'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TestComponent } from './Components/test/test.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import {MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegistrationComponent,
    UpdateComponent,
    AdminComponent,
    ProfileComponent,
    NotFoundComponent,
    TestComponent,
    
    
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ToastrModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatMenuModule,
    NgSelectModule,
    FullCalendarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatStepperModule

    
    
    
 
    
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, 
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

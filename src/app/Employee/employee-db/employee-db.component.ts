import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-db',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './employee-db.component.html',
  styleUrl: './employee-db.component.css'
})
export class EmployeeDBComponent implements OnInit {
 
  country_code: any;
  items: MenuItem[] | undefined;
  profileData: any = {};
  profileAvatarImg:any={};user_id : any;
  showEditForm: boolean = false;
  toggleEditForm(open: boolean): void {
    this.showEditForm = open;
  }

  constructor(public apiService: ApiServiceService, private router : Router) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('userId');
    this.countryDialCode();
    this.getUserDetails(this.user_id);
    this.items = [
      {
          label: 'Update',
          icon: 'pi pi-refresh'
      },
      {
          label: 'Delete',
          icon: 'pi pi-times'
      }
  ];
  }

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

  isActive(route: string): boolean {
    // Check if the current URL matches the specified route
    return this.router.url === route;
  }
  handleImgFile(event: any) {
    this.profileAvatarImg.avatar = event.target.files[0];
    this.profileAvatarImg.user_id = localStorage.getItem('userId')
    if(this.profileAvatarImg.avatarImg != ''){
      this.saveAvatar();
    }
  }

  saveAvatar(): void {
    const formData = new FormData();
  formData.append('user_id', this.profileAvatarImg.user_id);
  formData.append('avatar', this.profileAvatarImg.avatar);

   
    this.apiService.saveAvatar(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Avatar Saved!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getUserDetails(this.user_id);
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  getUserDetails(id: any) {
    this.apiService.getUserDetails(id).subscribe(
      (r: any) => {
        this.profileData = r.data
      },
      (e) => {
        console.error(e);
      }
    );
  }

  updateProfile(teamMember: any) {
    const data = {
      user_id: localStorage.getItem('userId'),
      name: this.profileData.name,
      email: this.profileData.email,
      country_code:this.profileData.country_code,
      mobile_number: this.profileData.mobile_number,
      city: this.profileData.city,
    };
    this.apiService.updateProfile(data).subscribe(
      (r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        })
        // this.getUserDetails(this.id);
        this.profileData = {};
      },
      (e: any) => {
        Swal.fire('Error', e.error.message, 'error');
        // this.teamMemberUpdate= {};
      }
    );
  }
}

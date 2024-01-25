import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-client-db',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './client-db.component.html',
  styleUrl: './client-db.component.css'
})
export class ClientDBComponent {
  
  profileData: any = {};
  profileAvatarImg:any={};user_id : any;
  
  constructor(public apiService:ApiServiceService,private router: Router,) {}
 

  ngOnInit(): void {
    this.user_id = localStorage.getItem('userId');
    this.getUserDetails(this.user_id);
  }

  isActive(route: string): boolean {
    // Check if the current URL matches the specified route
    return this.router.url === route;
  }

  handleImgFile(event: any) {
    this.profileAvatarImg.avatar = event.target.files[0];
    this.profileAvatarImg.user_id = localStorage.getItem('userId')
    console.log('3 ==>',this.profileAvatarImg)
    if(this.profileAvatarImg.avatarImg != ''){
      this.saveAvatar();
      console.log('1',this.profileAvatarImg)
    }
  }

  saveAvatar(): void {
    const formData = new FormData();
  formData.append('user_id', this.profileAvatarImg.user_id);
  formData.append('avatar', this.profileAvatarImg.avatar);

   
    this.apiService.saveAvatar(formData).subscribe(
      (response:any) => {
        console.log('response =>',response)
        // On success
        Swal.fire({
          title: 'Avatar Saved!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getUserDetails(this.user_id);
      },
      (error) => {
        console.error('error =>',error)
        // On error
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
        console.log('Profile Data ==>', r);
      },
      (e) => {
        console.error(e);
      }
    );
  }
}

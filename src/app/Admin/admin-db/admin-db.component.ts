import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-db',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-db.component.html',
  styleUrl: './admin-db.component.css',
})
export class AdminDBComponent implements OnInit {
  profileData: any = {};
  profileAvatarImg:any={};user_id : any;

  constructor(public apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('userId');
    this.getUserDetails(this.user_id);
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
      (response) => {
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

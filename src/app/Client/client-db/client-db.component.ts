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
  items = new Array(30);
  workStatus: any = {};
  workStatusData: any[] = [];
  
  profileData: any = {};
  profileAvatarImg:any={};user_id : any;
  
  constructor(public apiService:ApiServiceService,private router: Router,) {}
 

  ngOnInit(): void {
    this.user_id = localStorage.getItem('userId');
    this.getUserDetails(this.user_id);
    this.getClientProjectList();
  }

  saveWorkStatus(workStatus:any){
    console.log('signUp Api =>', workStatus);
    this.apiService.saveWorkStatus(workStatus).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.router.navigate(['/log-in']);
          }
        });
        this.workStatus={};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        this.workStatus={};
      }
    );
  }

  getClientProjectList(){
    const client_id = localStorage.getItem('userId')
    this.apiService.getClientProjectList(client_id).subscribe(
      (r: any) => {
        this.workStatusData = r.data;
        console.log('Get Client Project List', this.workStatusData);
      },
      (e) => {
        console.error(e);
      }
    )
  }

  getWorkStatusById(id:any){
    this.apiService.getWorkStatusById(id).subscribe(
      (r) => {
        this.workStatus = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  updateWorkStatusById(workStatus:any){
    this.apiService.updateWorkStatusById(workStatus).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.router.navigate(['/']);
          }
        });
        this.workStatus={};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        this.workStatus={};
      }
    );
  }

  deleteWorkStatusById(id:any){
    this.apiService.deleteWorkStatusById(id).subscribe(
      (r) => {
        this.workStatus = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
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

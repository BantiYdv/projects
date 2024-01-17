import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css',
})
export class TeamMemberComponent {
  teamMemberSave: any = {
    country_code: '+91',
  };
  teamMemberUpdate: any = {
    country_code: '+91',
  };
  teamMembers: any[] = [];
  country_code: any = {};
  // teamMembers = [
  //   { _id:'1', teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
  //   {  _id:'2',teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
  //   {  _id:'3',teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
  //   {  _id:'4',teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
  //   // Add more projects as needed
  // ];

  constructor(private apiService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getTeamMember();
    this.countryDialCode();
  }

  getUserDetails(id: any) {
    this.apiService.getUserDetails(id).subscribe(
      (r: any) => {
        this.teamMemberUpdate = r.data;
        console.log('teamMemberUpdate ==>', r);
      },
      (e) => {
        console.error(e);
      }
    );
  }

  saveTeamMember(teamMember: any) {
    this.teamMemberSave.country_code = '+91';
    console.log('signUp Api =>', teamMember);
    this.apiService.saveTeamMember(teamMember).subscribe(
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
          }
        });
        this.getTeamMember();
        this.teamMemberSave = {};
      },
      (e: any) => {
        console.error('Error => ', e);
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }

  getTeamMember() {
    this.apiService.getTeamMember().subscribe(
      (r: any) => {
        this.teamMembers = r.data;
        console.log('getTeamMember ==> ==>', r);
      },
      (e) => {
        console.error(e);
      }
    );
  }
  countryDialCode() {
    this.apiService.countryDialCode().subscribe(
      (r: any) => {
        this.country_code = r.data;
        console.log('country_code ==>', r.data);
      },
      (e) => {
        console.error(e);
      }
    );
  }
  deleteUser(id: any,is_deleted:boolean) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the deletion
        this.apiService.deleteUser(id,is_deleted).subscribe(
          (r:any) => {
            console.log(r)
            Swal.fire(
              'Deleted!',
              r.message,
              'success'
            );
            this.getTeamMember();
          },
          (e) => {
            console.error(e)
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }

  updateTeamMemberById(teamMember: any) {
    // this.teamMemberUpdate.user_id = localStorage.getItem('userId');
    const data = {
      user_id: this.teamMemberUpdate._id,
      name: this.teamMemberUpdate.name,
      email: this.teamMemberUpdate.email,
      mobile_number: this.teamMemberUpdate.mobile_number,
      country_code: this.teamMemberUpdate.country_code,
      designation: this.teamMemberUpdate.designation,
    };
    this.apiService.updateProfile(data).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        })
        this.getTeamMember();
        this.teamMemberUpdate = {};
      },
      (e: any) => {
        console.log('Error => ', e);
        Swal.fire('Error', e.error.message, 'error');
        // this.teamMemberUpdate= {};
      }
    );
  }

}

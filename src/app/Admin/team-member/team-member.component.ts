import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css'
})
export class TeamMemberComponent {
  teamMember: any = {};
  teamMembers = [
    { _id:'1', teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
    {  _id:'2',teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
    {  _id:'3',teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
    {  _id:'4',teamMemberName: 'awx media',phone_no: '34576578971', designation: 'rajendra gehlot', emailId: 'Admin@12'},
    // Add more projects as needed
  ];

  constructor(private apiService:ApiServiceService,private router: Router,) {}

  ngOnInit(): void {
    this.getTeamMember();
  }

  saveTeamMember(teamMember:any){
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
            this.router.navigate(['/log-in']);
          }
        });
        this.getTeamMember();
        this.teamMember = {};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        this.teamMember = {};
      }
    );
  }

  getTeamMember(){
    this.apiService.getTeamMember().subscribe(
      (r) => {
        this.teamMember = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  getTeamMemberById(id:any){
    this.apiService.getTeamMemberById(id).subscribe(
      (r) => {
        this.teamMember = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  updateTeamMemberById(teamMember:any){
    this.apiService.updateTeamMemberById(teamMember).subscribe(
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
        this.getTeamMember();
        this.teamMember = {};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        this.teamMember = {};
      }
    );
  }

  deleteTeamMemberById(id: any) {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the deletion
        this.apiService.deleteTeamMemberById(id).subscribe(
          (r) => {
            this.teamMember = r;
            Swal.fire(
              'Deleted!',
              'Your teamMember has been deleted.',
              'success'
            );
            this.getTeamMember();
          },
          (e) => {
            console.log(e.data.message);
            Swal.fire(
              'Error!',
              e.error.message,
              'error'
            );
          }
        );
      }
    });
  }
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';


declare var $: any;
interface JQuery {
  modal(action: string): void;
}

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css',
})
export class TeamMemberComponent {

  TeamMemberData: any;
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
      },
      (e) => {
        console.error(e);
      }
    );
  }

  saveTeamMember(teamMember: any) {
    this.teamMemberSave.country_code = '+91';
    this.apiService.saveTeamMember(teamMember).subscribe(
      (r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            $('#addNewTeamMember').modal('hide');
            this.getTeamMember();
          }
        });
        this.getTeamMember();
        this.teamMemberSave = {};
      },
      (e: any) => {
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }

  getTeamMember() {
    this.apiService.getTeamMember().subscribe(
      (r: any) => {
        this.teamMembers = r.data;
        this.TeamMemberData = r.data;
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
      },
      (e) => {
        console.error(e);
      }
    );
  }
  deleteUser(id: any,is_deleted:boolean) {
    if(is_deleted == true){
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
    if(is_deleted == false){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, undo it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteUser(id,is_deleted).subscribe(
            (r:any) => {
              Swal.fire(
                'Undo!',
                'user undo',
                'success'
              );
              this.getTeamMember();
            },
            (e) => {
              Swal.fire('Error!', e.error.message, 'error');
            }
          );
        }
      });
    }
    
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
        Swal.fire('Error', e.error.message, 'error');
        // this.teamMemberUpdate= {};
      }
    );
  }


  searchTeamMember: string = '';
  TeamMemberPageperPage: number = 12;
  currentTeamMemberPage: number = 1;
 
  FilterTeamMember() {
   this.teamMembers = this.TeamMemberData.filter((teamMember: { name: string; }) =>
   teamMember.name.toLowerCase().includes(this.searchTeamMember.toLowerCase()) 
    );
  }
  

  getPaginatedTeamMemberData(): any[] {
    const startIndex = (this.currentTeamMemberPage - 1) * this.TeamMemberPageperPage;
    const endIndex = startIndex + this.TeamMemberPageperPage;
    return this.teamMembers.slice(startIndex, endIndex);
  }

  previousTeamMemberPage(): void {
    if (this.currentTeamMemberPage > 1) {
      this.currentTeamMemberPage--;
    }
  }

  changePageTeamMember(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesTeamMember()) {
      this.currentTeamMemberPage = pageNumber;
    }
  }
  
  
  nextPageTeamMember(): void {
    const totalPages = Math.ceil(
      this.teamMembers.length / this.TeamMemberPageperPage
    );
    if (this.currentTeamMemberPage < totalPages) {
      this.currentTeamMemberPage++;
    }
  }

  getPageNumbersTeamMember(): number[] {
    const totalPages = Math.ceil(
      this.teamMembers.length / this.TeamMemberPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesTeamMember(): number {
    return Math.ceil(
      this.teamMembers.length / this.TeamMemberPageperPage
    );
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clients : any[] | any;
  register: any = {
    country_code: '+91'

  };
 
  clientUpdate: any = {
    country_code: '+91',
  };
  country_code: any = {};

  constructor(private apiService:ApiServiceService, private router: Router,) {}


  ngOnInit(): void {
    // const userId = localStorage.getItem('userId')
    this.get_client_id();
    

  }
  

  get_client_id(){
    this.apiService.get_client_id().subscribe(
      (r:any) => {
        this.clients = r.data;
        console.log('clients',this.clients)
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  addClient(register: any) {
    console.log('Client Api =>', register);
    this.apiService.addClient(register).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Client added Successful',
          // text: r.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.router.navigate(['/admin/client']);
            this.get_client_id();
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
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
            this.get_client_id();
          },
          (e) => {
            console.error(e)
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }

  updateClient(teamMember: any) {
    // this.teamMemberUpdate.user_id = localStorage.getItem('userId');
    const data = {
      user_id: this.clientUpdate._id,
      name: this.clientUpdate.name,
      email: this.clientUpdate.email,
      mobile_number: this.clientUpdate.mobile_number,
      country_code: this.clientUpdate.country_code,
      designation: this.clientUpdate.designation,
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
        this.  get_client_id();
        this.clientUpdate = {};
      },
      (e: any) => {
        console.log('Error => ', e);
        Swal.fire('Error', e.error.message, 'error');
        // this.teamMemberUpdate= {};
      }
    );
  }


  getUserDetails(id: any) {
    this.apiService.getUserDetails(id).subscribe(
      (r: any) => {
        this.clientUpdate = r.data;
        console.log('client Update ==>', r);
      },
      (e) => {
        console.error(e);
      }
    );
  }
}

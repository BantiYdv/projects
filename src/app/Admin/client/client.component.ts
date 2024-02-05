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
  ClientData: any;
  register: any = {
    country_code: '+91'
  };
 
  clientUpdate: any = {
    country_code: '+91',
  };
  country_code: any;

  constructor(private apiService:ApiServiceService, private router: Router,) {}


  ngOnInit(): void {
    // const userId = localStorage.getItem('userId')
    this.get_client_id();
    this.countryDialCode();
    

  }
  

  get_client_id(){
    this.apiService.get_client_id().subscribe(
      (r:any) => {
        this.clients = r.data;
        this.ClientData = r.data;
      },
      (e) => {
        console.log(e);
      }
    )
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
  addClient(register: any) {
    this.apiService.addClient(register).subscribe(
      (r: any) => {
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
            Swal.fire(
              'Deleted!',
              r.message,
              'success'
            );
            this.get_client_id();
          },
          (e) => {
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
      // designation: this.clientUpdate.designation,
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
        Swal.fire('Error', e.error.message, 'error');
        // this.teamMemberUpdate= {};
      }
    );
  }


  getUserDetails(id: any) {
    this.apiService.getUserDetails(id).subscribe(
      (r: any) => {
        this.clientUpdate = r.data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  searchClient: string = '';
  ClientPageperPage: number = 12;
  currentClientPage: number = 1;
 
  FilterClient() {
   this.clients = this.ClientData.filter((item: { name: string; }) =>
   item.name.toLowerCase().includes(this.searchClient.toLowerCase()) 
    );
  }
  

  getPaginatedClientData(): any[] {
    const startIndex = (this.currentClientPage - 1) * this.ClientPageperPage;
    const endIndex = startIndex + this.ClientPageperPage;
    return this.clients.slice(startIndex, endIndex);
  }

  previousClientPage(): void {
    if (this.currentClientPage > 1) {
      this.currentClientPage--;
    }
  }

  changePageClient(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesClient()) {
      this.currentClientPage = pageNumber;
    }
  }
  
  
  nextPageClient(): void {
    const totalPages = Math.ceil(
      this.clients.length / this.ClientPageperPage
    );
    if (this.currentClientPage < totalPages) {
      this.currentClientPage++;
    }
  }

  getPageNumbersClient(): number[] {
    const totalPages = Math.ceil(
      this.clients.length / this.ClientPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesClient(): number {
    return Math.ceil(
      this.clients.length / this.ClientPageperPage
    );
  }

}

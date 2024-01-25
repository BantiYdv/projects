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
    country_code: '+91',
 password: '123456'

  };
 


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
    this.apiService.signUp(register).subscribe(
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
}

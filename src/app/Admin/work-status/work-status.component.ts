import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';


@Component({
  selector: 'app-work-status',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './work-status.component.html',
  styleUrl: './work-status.component.css'
})
export class WorkStatusComponent {

  workStatus: any = {};
  items = new Array(30);

  constructor(private apiService:ApiServiceService,private router: Router,) {}

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

  // getWorkStatus(){
  //   this.apiService.getWorkStatus().subscribe(
  //     (r) => {
  //       this.workStatus = r;
  //     },
  //     (e) => {
  //       console.log(e.data.message);
  //     }
  //   )
  // }

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
}

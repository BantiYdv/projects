import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-work-status',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './work-status.component.html',
  styleUrl: './work-status.component.css'
})
export class WorkStatusComponent {

  items = new Array(30);
  workStatus: any = {};
  workStatusData: any[] = [];

  constructor(public apiService:ApiServiceService,private router: Router,) {}
  ngOnInit(): void {
    this.getClientProjectList();
  }

  saveWorkStatus(workStatus:any){
    this.apiService.saveWorkStatus(workStatus).subscribe(
      (r: any) => {
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

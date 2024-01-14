import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent {
  tasks = [
    { _id:'1', taskName: 'awx media',description: 'qwe qee qwe qe qewqwe qwe qeqwe qw eqwe ', status: 'ongoing' },
    {  _id:'2',taskName: 'awx media',description: 'qwe qee qwe qe qewqwe qwe qeqwe qw eqwe ', status: 'ongoing' },
    {  _id:'3',taskName: 'awx media',description: 'qwe qee qwe qe qewqwe qwe qeqwe qw eqwe ', status: 'pending' },
    {  _id:'4',taskName: 'awx media',description: 'qwe qee qwe qe qewqwe qwe qeqwe qw eqwe ', status: 'finish' },
    // Add more projects as needed
  ];
  project: any ={};

  constructor(private apiService:ApiServiceService,private router: Router,) {}
  
  onChangeStatus(status:any){
  //   console.log(status)
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You won\'t be change the status!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.apiService.updatedProjectStatus(status).subscribe(
  //         (r) => {
  //           this.project = r;
  //           Swal.fire(
  //             'Updated!',
  //             // r.data.message,
  //             'success'
  //           );
  //           // this.getProject();
  //         },
  //         (e) => {
  //           console.log(e.error.message);
  //           Swal.fire(
  //             'Error!',
  //             e.error.message,
  //             'error'
  //           );
  //         }
  //       );
  //     }
  //   });
  }
}

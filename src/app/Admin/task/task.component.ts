import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
// import { Router } from 'express';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task: any = {};
  tasks = [
    { _id:'1', projectName: 'awx media',task_no: '1', task_name: 'rajendra gehlot', assign_to: '16 feb 2024', status: 'ongoing' },
    {  _id:'2',projectName: 'awx media',task_no: '1', task_name: 'rajendra gehlot', assign_to: '16 feb 2024', status: 'start' },
    {  _id:'3',projectName: 'awx media',task_no: '1', task_name: 'rajendra gehlot', assign_to: '16 feb 2024', status: 'ongoing' },
    {  _id:'4',projectName: 'awx media',task_no: '1', task_name: 'rajendra gehlot', assign_to: '16 feb 2024', status: 'finished' },
    // Add more projects as needed
  ];

  constructor(private apiService:ApiServiceService,private router: Router,) {}


  ngOnInit(): void {
    this.getTask();
  }

  saveTask(task:any){
    console.log('signUp Api =>', task);
    this.apiService.saveTask(task).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.router.navigate(['/log-in']);
          }
        });
        this.getTask();
        this.task = {};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        this.task = {};
      }
    );
  }

  getTask(){
    this.apiService.getTask().subscribe(
      (r) => {
        this.task = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  getTaskById(id:any){
    this.apiService.getTaskById(id).subscribe(
      (r) => {
        this.task = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  updateTaskById(task:any){
    this.apiService.updateTaskById(task).subscribe(
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
        this.getTask();
        this.task = {};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        this.task = {};
      }
    );
  }

  deleteTaskById(id: any) {
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
        this.apiService.deleteTaskById(id).subscribe(
          (r) => {
            this.task = r;
            Swal.fire(
              'Deleted!',
              // r.data.message,
              'success'
            );
            this.getTask();
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

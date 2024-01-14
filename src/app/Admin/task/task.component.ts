import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
// import { Router } from 'express';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';


interface Task {
  _id: any;
  name: string;
  is_enabled: boolean;
  client_id: string;
  start_date: Date;
  deadline: Date;
  handel_by: { name: string };
  current_status: string;
  project_resourses: any[];
}
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  taskSave: any = {};
  userData: any = {};
  projectList: any = {};
  handel_By: any = {};
  tasks: Task[] | any;
  // tasks = [
  //   {
  //     _id: '1',
  //     projectName: 'awx media',
  //     task_no: '1',
  //     task_name: 'rajendra gehlot',
  //     assign_to: '16 feb 2024',
  //     status: 'ongoing',
  //   },
  //   {
  //     _id: '2',
  //     projectName: 'awx media',
  //     task_no: '1',
  //     task_name: 'rajendra gehlot',
  //     assign_to: '16 feb 2024',
  //     status: 'start',
  //   },
  //   {
  //     _id: '3',
  //     projectName: 'awx media',
  //     task_no: '1',
  //     task_name: 'rajendra gehlot',
  //     assign_to: '16 feb 2024',
  //     status: 'ongoing',
  //   },
  //   {
  //     _id: '4',
  //     projectName: 'awx media',
  //     task_no: '1',
  //     task_name: 'rajendra gehlot',
  //     assign_to: '16 feb 2024',
  //     status: 'finished',
  //   },
  // ];

  constructor(private apiService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    this.getTask();
    this.getProject();
    this.get_handel_by(userId);
  }

  getProject(){
    this.projectList = {};
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.projectList = r.data;
        console.log('projects',this.projectList)
      },
      (e) => {
        console.error(e);
      }
    )
  }
  get_handel_by(id:any){
    this.apiService.get_handel_by(id).subscribe(
      (r:any) => {
        this.handel_By = r.data;
        console.log('handel_By',this.handel_By);
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }


  saveTask(task: any) {
    console.log('====>>>>>>',task)
   
    this.taskSave.user_id = localStorage.getItem('userId')
    const jsonData = {
      user_id:this.taskSave.user_id,
      name: this.taskSave.name,
      desc: this.taskSave.desc,
      start_date: this.taskSave.start_date,
      deadline: this.taskSave.deadline,
      project_id: this.taskSave.project_id,
      assgined_to: this.taskSave.assgined_to,
    };

    // Create a FormData object
    const formData = new FormData();

    // Function to append property to FormData
    const appendFormData = (property: string, value: any) => {
      formData.append(property, value);
    };

    // List of form fields excluding "creative_attach"
    const formFields = [
      'user_id',
      'name',
      'desc',
      'start_date',
      'deadline',
      'project_id',
      'assgined_to',
    ];

    // Append each form field to the formData
    formFields.forEach((field) => {
      appendFormData(field, this.taskSave[field]);
    });

    // Append "creative_attach" as a file to the formData
    formData.append('task_attachement', this.taskSave.task_attachement);

    console.warn('task Save', jsonData)
    this.apiService.saveTask(jsonData).subscribe(
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
        // this.getTask();
        this.taskSave = {};
      },
      (e: any) => {
        console.error('Error => ', e);
        Swal.fire('Error', e.error.message, 'error');
        // this.taskSave = {};
      }
    );
  }

  getTask(){
    this.apiService.getTask().subscribe(
      (r:any) => {
        this.tasks = r.data;
        console.log('tasks ==> ', r)
      },
      (e) => {
        console.error(e);
      }
    )
  }


  // getTaskById(id:any){
  //   this.apiService.getTaskById(id).subscribe(
  //     (r) => {
  //       this.task = r;
  //     },
  //     (e) => {
  //       console.log(e.data.message);
  //     }
  //   )
  // }

  // updateTaskById(task:any){
  //   this.apiService.updateTaskById(task).subscribe(
  //     (r: any) => {
  //       console.log(r);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Successful',
  //         text: r.data.message,
  //         showConfirmButton: false,
  //         timer: 3000,
  //       }).then((result) => {
  //         if (result) {
  //           this.router.navigate(['/']);
  //         }
  //       });
  //       this.getTask();
  //       this.task = {};
  //     },
  //     (e: any) => {
  //       console.log("Error => ",e)
  //       Swal.fire('Error', e.error.message, 'error');
  //       this.task = {};
  //     }
  //   );
  // }

  // deleteTaskById(id: any) {
  //   // Show confirmation dialog
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You won\'t be able to revert this!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // If confirmed, proceed with the deletion
  //       this.apiService.deleteTaskById(id).subscribe(
  //         (r) => {
  //           this.task = r;
  //           Swal.fire(
  //             'Deleted!',
  //             // r.data.message,
  //             'success'
  //           );
  //           this.getTask();
  //         },
  //         (e) => {
  //           console.log(e.data.message);
  //           Swal.fire(
  //             'Error!',
  //             e.error.message,
  //             'error'
  //           );
  //         }
  //       );
  //     }
  //   });
  // }
}

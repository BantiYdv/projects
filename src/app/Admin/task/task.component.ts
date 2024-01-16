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
  taskSave: any = {
    project_id: 'select',
    assgined_to: 'select',
  };
  taskUpdate: any = {};
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
    const userId = localStorage.getItem('userId');
    this.getTask();
    this.getProject();
    this.get_handel_by(userId);
  }

  getProject() {
    this.projectList = {};
    this.apiService.getProject().subscribe(
      (r: any) => {
        this.projectList = r.data;
        console.log('projects', this.projectList);
      },
      (e) => {
        console.error(e);
      }
    );
  }
  get_handel_by(id: any) {
    this.apiService.get_handel_by(id).subscribe(
      (r: any) => {
        this.handel_By = r.data;
        console.log('handel_By', this.handel_By);
      },
      (e) => {
        console.log(e.data.message);
      }
    );
  }

  onChangeProjectSave(event: any) {
    this.taskSave.task_attachement = event.target.files[0];
    console.log(this.taskSave.task_attachement);
  }
  onChangeProjectUpdate(event: any) {
    this.taskUpdate.task_attachement = event.target.files[0];
    console.log(this.taskUpdate.task_attachement);
  }
  saveTask(task: any) {
    console.log('====>>>>>>', task);

    this.taskSave.user_id = localStorage.getItem('userId');
    const formData = new FormData();

    formData.append('name', this.taskSave.name);
    formData.append('user_id', this.taskSave.user_id);
    formData.append('project_id', this.taskSave.project_id);
    formData.append('assgined_to', this.taskSave.assgined_to);
    formData.append('start_date', this.taskSave.start_date);
    formData.append('deadline', this.taskSave.deadline);
    formData.append('desc', this.taskSave.desc);
    formData.append('task_attachement', this.taskSave.task_attachement);

    this.apiService.saveTask(formData).subscribe(
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

  getTask() {
    this.apiService.getTask().subscribe(
      (r: any) => {
        this.tasks = r.data;
        console.log('tasks ==> ==> ', r);
      },
      (e) => {
        console.error(e);
      }
    );
  }

  getTaskById(id: any) {
    this.apiService.getTaskById(id).subscribe(
      (r: any) => {
        console.log(r);
        this.taskUpdate = r.data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  updateTask(task: any) {
    this.taskUpdate = {};
    this.taskUpdate.user_id = localStorage.getItem('userId');
    const formData = new FormData();

    formData.append('name', this.taskUpdate.name);
    formData.append('user_id', this.taskUpdate.user_id);
    formData.append('project_id', this.taskUpdate.project_id);
    formData.append('assgined_to', this.taskUpdate.assgined_to);
    formData.append('start_date', this.taskUpdate.start_date);
    formData.append('deadline', this.taskUpdate.deadline);
    formData.append('desc', this.taskUpdate.desc);
    formData.append('task_attachement', this.taskUpdate.task_attachement);

    this.apiService.updateTaskById(formData).subscribe(
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
        this.taskUpdate = {};
      },
      (e: any) => {
        console.log('Error => ', e);
        Swal.fire('Error', e.error.message, 'error');
        // this.task = {};
      }
    );
  }

  deleteTask(id: any,is_enabled:any) {
    // Show confirmation dialog
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
        this.apiService.deleteTaskById(id,is_enabled).subscribe(
          (r:any) => {
            // this.task = r;
            Swal.fire(
              'Deleted!',
              r.data.message,
              'success'
            );
            this.getTask();
          },
          (e) => {
            console.log(e.data.message);
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }

  onChangeStatus(id: any, status: any) {
    console.log('status ==> ', status);
    console.log('id = = >', id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be change the status!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.updateTaskStatus(id, status).subscribe(
          (r: any) => {
            // this.projectSave = r;
            Swal.fire('Updated!', r.data.message, 'success');
            this.getProject();
          },
          (e) => {
            console.error(e);
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }
}

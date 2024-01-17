import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';


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
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent {
 
  project: any ={};
  tasks: Task[] | any;
  selectedTaskDescription: string = '';
  http: any;
  taskUpdate: any ={};
  assigned : any[] | any;
  taskSave: any = {
    project_id: 'select',
    assgined_to: 'select',
  };
  projectList: any = {};
  handel_By: any = {};

  constructor(private apiService:ApiServiceService,private router: Router,) {}
  
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.getTask();
    this.assignedTo(userId);
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
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.updateTaskStatus(id, status).subscribe(
          (r: any) => {
            // this.projectSave = r;
            Swal.fire('Updated!', r.data.message, 'success');
            this.getTask();
          },
          (e) => {
            console.error(e);
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }

  getTask() {
    this.apiService.getTask().subscribe(
      (r: any) => {
        this.tasks = r.data;
        console.log('tasks ==> ==> ',  this.tasks);
      },
      (e) => {
        console.error(e);
      }
    );
  }

   // Function to set the selected task description
   setTaskDescription(description: string) {
    this.selectedTaskDescription = description;
  }

  
  getTaskById(id:any){
    this.apiService.getTaskById(id).subscribe(
      (r:any) => {
        console.log(r)
        this.taskUpdate = r.data;
      },
      (e) => {
        console.error(e);
      }
    )
  }

  assignedTo(id: any) {
    this.apiService.get_handel_by(id).subscribe(
      (r: any) => {
        this.assigned = r.data;
        console.log('member name for assigned task', this.assigned);
      },
      (e) => {
        console.log(e.data.message);
      }
    );
  }

  assignTo: any;
  onChangeAssignedStatus(id: any, assgined_to:any){
    console.log("?>>>>>>??????",assgined_to)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be change the status!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.updateTaskAssign(id, assgined_to).subscribe(
          (r: any) => {
            this.project = r;
            console.log("assign task response", r)
            Swal.fire(
              'Updated!',
              r.data.message,
              'success'
            );
            this.getTask();
          },
          (e) => {
            console.error(e);
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

  onChangeProjectSave(event: any) {
    this.taskSave.task_attachement = event.target.files[0];
    console.log(this.taskSave.task_attachement);
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

}

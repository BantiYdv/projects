
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

declare var $: any;
interface JQuery {
  modal(action: string): void;
}

interface ProjectResource {
  url: string;
  type: string;
  _id: string;
}

interface Project {
  _id: any;
  name: string;
  is_enabled: boolean;
  client_id: string;
  start_date: Date;
  deadline: Date;
  handel_by: { name: string };
  current_status: string;
  project_resourses: ProjectResource[];
}


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
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  providers:[DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {

  currentDate: string = new Date().toISOString().split('T')[0]; 
  taskSave: any = {
    project_id: '',
    assgined_to: '',
    start_date: this.currentDate,
  };
  taskUpdate: any = {
    start_date: this.currentDate,
  };
  userData: any = {};
  projectList: any = {};
  tasks: Task[] | any;
  
  projectSave: any = {
    start_date: this.currentDate,
    name: '',
    deadline:'',
    short_name: '',
    project_resourses: File,
    handel_by:'',
    client_id:'',
    project_type:{
      _id:'',
      name:''
    }
  };
  
  get_project_type:any;
  project_id: any;
  addParticipantData : any;
  getTeamMemberList: any;
  projectUpdate: any = {
    client_id: {
      _id: "",
      name: "",
    },
    project_type :{
      _id:""
    },
    start_date: this.currentDate,
    handel_by: {
      _id: "",
      name: "",
    },
  };
  clients : any[] | any;
  handel_By : any[] | any;
  projects: Project[] | any;
  HistoryTaskData:any;
  historyProjectData: any;
  isOn: boolean = true;

  toggleState(value:boolean) {
    this.isOn = value;
    if(this.isOn == false){
      this.getTask();
    }

  }




  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    this.getProject();
    this.getTask();
    this.get_client_id();
    this.getProjectType();
    this.get_handel_by(userId);


  }

onChangeProjectSave(event:any){
  this.projectSave.project_resourses = event.target.files[0];
}
onChangeProjectUpdate(event:any){
  this.projectUpdate.project_resourses = event.target.files[0];
}

onChangeTaskSave(event: any) {
  this.taskSave.task_attachement = event.target.files[0];
}
onChangeTaskUpdate(event: any) {
  this.taskUpdate.task_attachement = event.target.files[0];
}

saveTask(task: any) {

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
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: r.data.message,
        showConfirmButton: false,
        timer: 3000,
      }).then((result) => {
        if (result) {
          $('#addNewTask').modal('hide');
          this.getTask();
          this.taskSave = {};
        }
      });
    },
    (e: any) => {
      Swal.fire('Error', e.error.message, 'error');
      // this.taskSave = {};
    }
  );
}

getTask() {
  this.apiService.getTask().subscribe(
    (r: any) => {
      this.tasks = r.data;
      this.HistoryTaskData = r.data;
    },
    (e) => {
      console.error(e);
    }
  );
}

getTaskProject(id:any) {
  this.apiService.getTaskProject(id).subscribe(
    (r: any) => {
      this.isOn = false;
      this.tasks = r.data;
      this.HistoryTaskData = r.data;
    },
    (e) => {
      console.error(e);
    }
  );
}

getTaskById(id: any) {
  this.apiService.getTaskById(id).subscribe(
    (r: any) => {
      this.taskUpdate = r.data;
    },
    (e) => {
      console.error(e);
    }
  );
}


updateTask(task: any) {
  this.taskUpdate.user_id = localStorage.getItem('userId');
  const formData = new FormData();

  formData.append('task_id', this.taskUpdate._id);
  formData.append('name', this.taskUpdate.name);
  formData.append('user_id', this.taskUpdate.user_id);
  formData.append('assgined_to', this.taskUpdate.assgined_to);
  formData.append('start_date', this.taskUpdate.start_date);
  formData.append('deadline', this.taskUpdate.deadline);
  formData.append('desc', this.taskUpdate.desc);
  formData.append('task_attachement', this.taskUpdate.task_attachement);

  this.apiService.updateTaskById(formData).subscribe(
    (r: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: r.data.message,
        showConfirmButton: false,
        timer: 3000,
      }).then((result) => {
        if (result) {
          $('#updateNewTask').modal('hide');
          this.getTask();
          this.taskUpdate = {};
        }
      });
    },
    (e: any) => {
      Swal.fire('Error', e.error.message, 'error');
      // this.task = {};
    }
  );
}

deleteTask(id: any,is_enabled:any) {
  if(is_enabled ==true){
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
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }
  if(is_enabled == false){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, undo it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the deletion
        this.apiService.deleteTaskById(id,is_enabled).subscribe(
          (r:any) => {
            // this.task = r;
            Swal.fire(
              'Undo!',
              'task undo',
              'success'
            );
            this.getTask();
          },
          (e) => {
            Swal.fire('Error!', e.error.message, 'error');
          }
        );
      }
    });
  }
 
}
getFormattedValue(value: any): any {
  return value !== null && value !== '' ? value : "-";
}
  saveProject(project:any){
    this.projectSave.user_id = localStorage.getItem('userId')
    const formData = new FormData();

    formData.append('name', this.projectSave.name);
    formData.append('user_id', this.projectSave.user_id);
    formData.append('start_date', this.projectSave.start_date);
    formData.append('deadline', this.projectSave.deadline);
    formData.append('short_name', this.projectSave.short_name);
    formData.append('client_id', this.projectSave.client_id);
    formData.append('handel_by', this.projectSave.handel_by);
    formData.append('project_type', this.projectSave.project_type);
    formData.append('project_resourses', this.projectSave.project_resourses);
    this.apiService.saveProject(formData).subscribe(
      (r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            
            $('#addNewProject').modal('hide');
            this.getProject();
            this.projectSave = {};
          }
        });
      },
      (e: any) => {
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }

  getProject(){
    this.projects = {};
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.projects = r.data;
        this.projectList = r.data;
        this.historyProjectData = r.data;
      },
      (e) => {
        console.error(e);
      }
    )
  }
  get_client_id(){
    this.apiService.get_client_id().subscribe(
      (r:any) => {
        this.clients = r.data;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }
  get_handel_by(id:any){
    this.apiService.get_handel_by(id).subscribe(
      (r:any) => {
        this.handel_By = r.data;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }
  getProjectType(){
    this.apiService.getProjectType().subscribe(
      (r:any) => {
        this.get_project_type = r.data;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  getProjectById(id:any){
    this.getTeamMemberListToAddParticipant(id);
    this.projectUpdate={};

    this.apiService.getProjectById(id).subscribe(
      (r:any) => {
        this.projectUpdate = r.data;
        this.project_id = r.data._id
      },
      (e) => {
        console.error('error =>',e);

      }
    )
  }

  updateProjectById(project:any){
    this.projectUpdate.user_id = localStorage.getItem('userId')
    this.projectUpdate.project_id = project._id;
    this.projectUpdate.client_id = this.projectUpdate.client_id._id;
    this.projectUpdate.handel_by = this.projectUpdate.handel_by._id;
    this.projectUpdate.project_type = this.projectUpdate.project_type._id;
     
    const formData = new FormData();

    formData.append('name', this.projectUpdate.name);
    formData.append('user_id', this.projectUpdate.user_id);
    formData.append('project_id', this.projectUpdate.project_id);
    formData.append('start_date', this.projectUpdate.start_date);
    formData.append('deadline', this.projectUpdate.deadline);
    formData.append('client_id', this.projectUpdate.client_id);
    formData.append('handel_by', this.projectUpdate.handel_by);
    formData.append('project_type', this.projectUpdate.project_type);
    formData.append('project_resourses', this.projectUpdate.project_resourses);
    this.apiService.updateProjectById(formData).subscribe(
      (r: any) => {
        this.getProjectById(project._id)
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            $('#updateNewProject').modal('hide');
            this.getProject();
          }
        });
      },
      (e: any) => {
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }

  deleteProjectById(id: any,is_enabled:any) {
    
    if(is_enabled == true){
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
          this.apiService.deleteProjectById(id,is_enabled).subscribe(
            (r:any) => {
              this.projectSave = r;
              Swal.fire(
                'Deleted!',
                r.message,
                'success'
              );
              this.getProject();
            },
            (e) => {
              console.log(e.error.message);
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
   
if(is_enabled == false){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, undo it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiService.deleteProjectById(id,is_enabled).subscribe(
        (r:any) => {
          this.projectSave = r;
          Swal.fire(
            'Undo!',
            'project undo',
            'success'
          );
          this.getProject();
        },
        (e) => {
          console.log(e.error.message);
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


  onChangeStatus(id:any,status:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be change the status!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.updatedProjectStatus(id,status).subscribe(
          (r:any) => {
            this.projectSave = r;
            Swal.fire(
              'Updated!',
              r.data.message,
              'success'
            );
            this.getProject();
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
  onChangeStatusTask(id: any, status: any) {
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


  addParticipant(addParticipant:any){

    this.apiService.addParticipant(this.project_id,addParticipant).subscribe(
      (r:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then(()=>{
          $('#viewProjectOpp').modal('hide');
        })
      },
      (e:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          showConfirmButton: false,
          timer: 3000,
        })
      }
    )

  }

  getTeamMemberListToAddParticipant(project_id:any){
    this.apiService.getTeamMemberListToAddParticipant(project_id).subscribe(
      (r:any) => {
        this.getTeamMemberList = r.data;
      },
      (e:any) => {
        console.error('error =>',e);
      }
    )
  }
  

  searchHistoryProject: string = '';
  HistoryProjectPageperPage: number = 12;
  currentHistoryProjectPage: number = 1;
 
  FilterHistoryProject() {
   this.projects = this.historyProjectData.filter((projectData: { name: string; }) =>
   projectData.name.toLowerCase().includes(this.searchHistoryProject.toLowerCase()) 
    );
  }
  

  getPaginatedHistoryProjectData(): any[] {
    const startIndex = (this.currentHistoryProjectPage - 1) * this.HistoryProjectPageperPage;
    const endIndex = startIndex + this.HistoryProjectPageperPage;
    return this.projects.slice(startIndex, endIndex);
  }

  previousHistoryProjectPage(): void {
    if (this.currentHistoryProjectPage > 1) {
      this.currentHistoryProjectPage--;
    }
  }

  changePageHistoryProject(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesHistoryProject()) {
      this.currentHistoryProjectPage = pageNumber;
    }
  }
  
  
  nextPageHistoryProject(): void {
    const totalPages = Math.ceil(
      this.projects.length / this.HistoryProjectPageperPage
    );
    if (this.currentHistoryProjectPage < totalPages) {
      this.currentHistoryProjectPage++;
    }
  }

  getPageNumbersHistoryProject(): number[] {
    const totalPages = Math.ceil(
      this.projects.length / this.HistoryProjectPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesHistoryProject(): number {
    return Math.ceil(
      this.projects.length / this.HistoryProjectPageperPage
    );
  }
  
  searchHistoryTask: string = '';
  HistoryTaskPageperPage: number = 12;
  currentHistoryTaskPage: number = 1;
 
  FilterHistoryTask() {
   this.tasks = this.HistoryTaskData.filter((task: { project_name: string; }) =>
   task.project_name.toLowerCase().includes(this.searchHistoryTask.toLowerCase()) 
    );
  }
  

  getPaginatedHistoryTaskData(): any[] {
    const startIndex = (this.currentHistoryTaskPage - 1) * this.HistoryTaskPageperPage;
    const endIndex = startIndex + this.HistoryTaskPageperPage;
    return this.tasks.slice(startIndex, endIndex);
  }

  previousHistoryTaskPage(): void {
    if (this.currentHistoryTaskPage > 1) {
      this.currentHistoryTaskPage--;
    }
  }

  changePageHistoryTask(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesHistoryTask()) {
      this.currentHistoryTaskPage = pageNumber;
    }
  }
  
  
  nextPageHistoryTask(): void {
    const totalPages = Math.ceil(
      this.tasks.length / this.HistoryTaskPageperPage
    );
    if (this.currentHistoryTaskPage < totalPages) {
      this.currentHistoryTaskPage++;
    }
  }

  getPageNumbersHistoryTask(): number[] {
    const totalPages = Math.ceil(
      this.tasks.length / this.HistoryTaskPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesHistoryTask(): number {
    return Math.ceil(
      this.tasks.length / this.HistoryTaskPageperPage
    );
  }
}

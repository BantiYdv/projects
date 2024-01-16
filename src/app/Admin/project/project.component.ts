
import { CommonModule } from '@angular/common';
import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  providers:[DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  projectSave: any = {
    name: '',
    start_date: '',
    deadline:'',
    short_name: '',
    project_resourses: File,
    handel_by:'',
    desc:''
  };
  project_id: any;
  addParticipantData : any;
  getTeamMemberList: any;
  projectUpdate: any = {
    client_id: {
      _id: "",
      name: "",
    },
    handel_by: {
      _id: "",
      name: "",
    },
  };
  clients : any[] | any;
  handel_By : any[] | any;
  projects: Project[] | any;

  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    this.getProject();
    this.get_client_id(userId);
    this.get_handel_by(userId);
    // this.getProjectById(userId);

  }

onChangeProjectSave(event:any){
  this.projectSave.project_resourses = event.target.files[0];
  console.log(this.projectSave.project_resourses)
}
onChangeProjectUpdate(event:any){
  this.projectUpdate.project_resourses = event.target.files[0];
  console.log(this.projectUpdate.project_resourses)
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
    formData.append('desc', this.projectSave.desc);
    formData.append('project_resourses', this.projectSave.project_resourses);
    this.apiService.saveProject(formData).subscribe(
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
            
           
            this.getProject();
            this.projectSave = {};
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }

  getProject(){
    this.projects = {};
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.projects = r.data;
        console.log('==> ==>',r.data)
        console.log('projects',this.projects)
      },
      (e) => {
        console.error(e);
      }
    )
  }
  get_client_id(id:any){
    this.apiService.get_client_id(id).subscribe(
      (r:any) => {
        this.clients = r.data;
        console.log('clients',this.clients)
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
        console.log('handel_By',this.handel_By);
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
        console.log('data.project_id',r.data._id)
      },
      (e) => {
        console.error('error -->',e);

      }
    )
  }

  updateProjectById(project:any){
    console.log('project id ==>',project._id)
    this.projectUpdate.user_id = localStorage.getItem('userId')
    this.projectUpdate.project_id = project._id;
    this.projectUpdate.client_id = this.projectUpdate.client_id._id;
    this.projectUpdate.handel_by = this.projectUpdate.handel_by._id;
    // const formData = new FormData();

    // const appendFormData = (property: string, value: any) => {
    //   formData.append(property, value);
    // };
    
    // const projectProperties = [
    //   'project_id',
    //   'name',
    //   'user_id',
    //   'start_date',
    //   'deadline',
    //   'client_id',
    //   'handel_by',
    //   'desc'
    // ];
  
    // // Append each property to the formData
    // projectProperties.forEach((property) => {
    //   if (property === 'project_resourses' && Array.isArray(this.projectUpdate[property])) {
    //     this.projectUpdate[property].forEach((resource: any, index: any) => {
    //       appendFormData(`${property}[${index}]`, resource);
    //     });
    //   } else {
    //     // Otherwise, append the property normally
    //     appendFormData(property, this.projectUpdate[property]);
    //   }
    // });
  
    // console.log('formData =>', formData);
  
    const formData = new FormData();

    formData.append('name', this.projectUpdate.name);
    formData.append('user_id', this.projectUpdate.user_id);
    formData.append('project_id', this.projectUpdate.project_id);
    formData.append('start_date', this.projectUpdate.start_date);
    formData.append('deadline', this.projectUpdate.deadline);
    formData.append('client_id', this.projectUpdate.client_id);
    formData.append('handel_by', this.projectUpdate.handel_by);
    formData.append('desc', this.projectUpdate.desc);
    formData.append('project_resourses', this.projectUpdate.project_resourses);
    this.apiService.updateProjectById(formData).subscribe(
      (r: any) => {
        console.log(r);
        this.getProjectById(project._id)
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            this.getProject();
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }

  deleteProjectById(id: any,is_enabled:any) {
    
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
            console.log('====>',r.message)
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


  onChangeStatus(id:any,status:any){
    console.log('status ==> ',status)
    console.log('id = = >',id)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be change the status!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
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


  addParticipant(addParticipant:any){

    this.apiService.addParticipant(this.project_id,addParticipant).subscribe(
      (r:any) => {
        console.log('addParticipant',r);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        })
      },
      (e:any) => {
        console.error('addParticipant',e);
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
        console.log('getTeamMemberListToAddParticipant',r);
        this.getTeamMemberList = r.data;
      },
      (e:any) => {
        console.error('getTeamMemberListToAddParticipant',e);
      }
    )
  }
  
}

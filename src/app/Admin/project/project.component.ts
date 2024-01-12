import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


interface Project {
  _id: any;
  name: string;
  client_id: {name:string};
  start_date: Date;
  deadline:Date;
  handel_by:{name:string};
  current_status :string;
  // other properties
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  providers:[DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  project: any = {};
  clients : any[] | any;
  handel_By : any[] | any;
  projects: Project[] = [];

  
  // projects = [
  //   { _id:'1', projectName: 'awx media', clientName: 'rajendra gehlot', startDate: '16 feb 2024', deadlineDate: '21 mar 2024', handledBy: 'apurva agarwal', status: 'ongoing' },
  //   {  _id:'2',projectName: 'awx media', clientName: 'rajendra gehlot', startDate: '16 feb 2024', deadlineDate: '21 mar 2024', handledBy: 'apurva agarwal', status: 'ongoing' },
  //   {  _id:'3',projectName: 'awx media', clientName: 'rajendra gehlot', startDate: '16 feb 2024', deadlineDate: '21 mar 2024', handledBy: 'apurva agarwal', status: 'pending' },
  //   {  _id:'4',projectName: 'awx media', clientName: 'rajendra gehlot', startDate: '16 feb 2024', deadlineDate: '21 mar 2024', handledBy: 'apurva agarwal', status: 'finish' },
  // ];

  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}


  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    this.getProject();
    this.get_client_id(userId);
    this.get_handel_by(userId);
  }

  saveProject(project:any){
    this.project.user_id = localStorage.getItem('userId')
    const formData = new FormData();

    const appendFormData = (property: string, value: any) => {
      formData.append(property, value);
    };
  
    // List of properties to append
    const projectProperties = [
      'name',
      'user_id',
      'start_date',
      'deadline',
      'short_name',
      'client_id',
      'handel_by',
      'desc'
    ];
  
    // Append each property to the formData
    projectProperties.forEach((property) => {
      if (property === 'project_resourses' && Array.isArray(this.project[property])) {
        // If property is 'project_resourses' and it's an array, append each element
        this.project[property].forEach((resource: any, index: any) => {
          appendFormData(`${property}[${index}]`, resource);
        });
      } else {
        // Otherwise, append the property normally
        appendFormData(property, this.project[property]);
      }
    });
  
    console.log('formData =>', formData);
  
    console.log('signUp Api =>', project);
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
            this.router.navigate(['/project']);
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: {},
              queryParamsHandling: 'merge',
            });
          }
        });
        this.getProject();
        this.project = {};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        // this.project = {};
      }
    );
  }

  getProject(){
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.projects = r.data;
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
    this.apiService.getProjectById(id).subscribe(
      (r) => {
        this.project = r;
      },
      (e) => {
        console.log(e.data.message);
      }
    )
  }

  updateProjectById(project:any){
    this.apiService.updateProjectById(project).subscribe(
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
        this.getProject();
        this.project = {};
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
        // this.project = {};
      }
    );
  }

  deleteProjectById(id: any) {
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
        this.apiService.deleteProjectById(id).subscribe(
          (r) => {
            this.project = r;
            Swal.fire(
              'Deleted!',
              // r.data.message,
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


  onChangeStatus(status:any){
    console.log(status)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be change the status!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.updatedProjectStatus(status).subscribe(
          (r) => {
            this.project = r;
            Swal.fire(
              'Updated!',
              // r.data.message,
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

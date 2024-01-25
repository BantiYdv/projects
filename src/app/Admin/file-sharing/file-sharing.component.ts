import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';


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
  selector: 'app-file-sharing',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './file-sharing.component.html',
  styleUrl: './file-sharing.component.css'
})
export class FileSharingAdminComponent {
  projects: Project[] | any;
  projectsName: any;
  FileSharing: any = {
    project_id:'',
    file_sharing: File,
  };


  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void{
    this.getProject();
    this.getFileSharing();
  }

  getProject(){
    this.projectsName = {};
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.projectsName = r.data;
        console.log('==> ==>',r.data)
        console.log('projects Name',this.projectsName)
      },
      (e) => {
        console.error(e);
      }
    )
  }

  getFileSharing(){
    this.projects = {};
    this.apiService.getFileSharing().subscribe(
      (r:any) => {
        this.projects = r.data;
        console.log('==> ==>',r.data)
        console.log('get file sharing',this.projects)
      },
      (e) => {
        console.error(e);
      }
    )
  }

  

  onChangeFileSharing(event:any){
    this.FileSharing.file_sharing = event.target.files[0];
    console.log(this.FileSharing.file_sharing)
  }

  saveFileSharing(project:any){
    this.FileSharing.user_id = localStorage.getItem('userId')
    const formData = new FormData();

    formData.append('project_id', this.FileSharing.project_id);
    formData.append('file_sharing', this.FileSharing.file_sharing);
    this.apiService.saveFileSharing(formData).subscribe(
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
            
           
            this.getFileSharing();
            this.FileSharing = {};
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }


}

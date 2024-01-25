import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';


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

  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void{
    this.getProject();
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
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';



@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.css'
})
export class EmployeeProjectComponent {

  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}
  
  projects: any[] = [];
  projectUpdate: any = {};
  project_id: any ;

  ngOnInit(): void {
   
    this.getTeamMemberProjects();
    
  }

  getTeamMemberProjects(){
    const team_member_id = localStorage.getItem('userId')
    this.apiService.getTeamMemberProjects(team_member_id).subscribe(
      (r: any) => {
        this.projects = r.data;
        console.log('Get employee Project List', this.projects);
      },
      (e) => {
        console.error(e);
      }
    )
  }

  getProjectById(id:any){
 
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

}

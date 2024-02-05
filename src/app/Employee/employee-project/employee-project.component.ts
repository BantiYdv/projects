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
  EmployeeProjectData: any;
    // {name: 'AVX Media', type:'AVX', start_date:'2023-02-12', deadline:'2023-02-12', },
    // {name: 'AVX Media', type:'AVX', start_date:'2023-02-12', deadline:'2023-02-12', },
    // {name: 'AVX Media', type:'AVX', start_date:'2023-02-12', deadline:'2023-02-12', },
    // {name: 'AVX Media', type:'AVX', start_date:'2023-02-12', deadline:'2023-02-12', },
    // {name: 'AVX Media', type:'AVX', start_date:'2023-02-12', deadline:'2023-02-12', },
    // {name: 'AVX Media', type:'AVX', start_date:'2023-02-12', deadline:'2023-02-12', },
  
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
        this.EmployeeProjectData = r.data
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
      },
      (e) => {
        console.error('error -->',e);

      }
    )
  }


  searchEmployeeProject: string = '';
  EmployeeProjectPageperPage: number = 12;
  currentEmployeeProjectPage: number = 1;
 
  FilterEmployeeProject() {
   this.projects = this.EmployeeProjectData.filter((project: { name: string; }) =>
   project.name.toLowerCase().includes(this.searchEmployeeProject.toLowerCase()) 
    );
  }
  

  getPaginatedEmployeeProjectData(): any[] {
    const startIndex = (this.currentEmployeeProjectPage - 1) * this.EmployeeProjectPageperPage;
    const endIndex = startIndex + this.EmployeeProjectPageperPage;
    return this.projects.slice(startIndex, endIndex);
  }

  previousEmployeeProjectPage(): void {
    if (this.currentEmployeeProjectPage > 1) {
      this.currentEmployeeProjectPage--;
    }
  }

  changePageEmployeeProject(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesEmployeeProject()) {
      this.currentEmployeeProjectPage = pageNumber;
    }
  }
  
  
  nextPageEmployeeProject(): void {
    const totalPages = Math.ceil(
      this.projects.length / this.EmployeeProjectPageperPage
    );
    if (this.currentEmployeeProjectPage < totalPages) {
      this.currentEmployeeProjectPage++;
    }
  }

  getPageNumbersEmployeeProject(): number[] {
    const totalPages = Math.ceil(
      this.projects.length / this.EmployeeProjectPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesEmployeeProject(): number {
    return Math.ceil(
      this.projects.length / this.EmployeeProjectPageperPage
    );
  }

}

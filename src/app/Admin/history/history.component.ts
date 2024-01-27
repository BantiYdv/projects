import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {


  isOn: boolean = true;
projects: any = [];
historyProjectData: any;
tasks: any = [];
HistoryTaskData: any;

constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

ngOnInit(): void {
  this.projects = [];
  this.getProject();
  this.getTask();
  // this.getProjectById(userId);

}

  toggleState(value:boolean) {
    this.isOn = value;
  }

  getProject(){
    // this.projects = {};
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.historyProjectData = r.data;
        this.projects = r.data;
        console.log('==> ==>',r.data)
        console.log('projects',this.projects)
      },
      (e) => {
        console.error(e);
      }
    )
  }
  getTask(){
    // this.projects = {};
    this.apiService.getTask().subscribe(
      (r:any) => {
        this.HistoryTaskData = r.data;
        this.tasks = r.data;
        console.log('==> ==>',r.data)
        console.log('tasks = > => =>',this.tasks)
      },
      (e) => {
        console.error(e);
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
   this.tasks = this.HistoryTaskData.filter((task: { name: string; }) =>
   task.name.toLowerCase().includes(this.searchHistoryTask.toLowerCase()) 
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

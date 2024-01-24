import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

interface Task {
  name: string;
  startDate: Date;
  deadlineDate: Date;
  created: Date;
  start: Date;
  completed: Date;
}
// interface ProjectResource {
//   url: string;
//   type: string;
//   _id: string;
// }

interface Project {
  _id: any;
  name: string;
  // is_enabled: boolean;
  // client_id: string;
  // start_date: Date;
  // deadline: Date;
  // handel_by: { name: string };
  // current_status: string;
  // project_resourses: ProjectResource[];
}

@Component({
  selector: 'app-briefs',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './briefs.component.html',
  styleUrl: './briefs.component.css'
})
export class BriefsComponent {

  projectsActive: Project[] | any;
  projectsFinised: Project[] | any;
  // tasks: Task[] | any;
  tasks: any[] = [
    { name: 'Task 1', startDate: new Date('2024-01-05'), deadlineDate:new Date('2024-01-30'), created: new Date('2024-01-01'), start: new Date('2024-01-11'), completed: new Date('2024-01-31'), },
    { name: 'Task 2', startDate: new Date('2024-01-12'), deadlineDate:new Date('2024-01-31'), created: new Date('2024-01-13'), start: new Date('2024-01-14'), completed: new Date('2024-01-16'), },
    { name: 'Task 3', startDate: new Date('2024-01-03'), deadlineDate:new Date('2024-01-01'), created: new Date('2024-01-07'), start: new Date('2024-01-13'), completed: new Date('2024-01-17'), },
    { name: 'Task 4', startDate: new Date('2024-01-01'), deadlineDate:new Date('2024-01-30'), created: new Date('2024-01-05'), start: new Date('2024-01-11'), completed: new Date('2024-01-31'), },
    { name: 'Task 5', startDate: new Date('2024-01-12'), deadlineDate:new Date('2024-01-31'), created: new Date('2024-01-13'), start: new Date('2024-01-14'), completed: new Date('2024-01-16'), },
    { name: 'Task 6', startDate: new Date('2024-01-03'), deadlineDate:new Date('2024-01-01'), created: new Date('2024-01-07'), start: new Date('2024-01-13'), completed: new Date('2024-01-17'), },
    { name: 'Task 7', startDate: new Date('2024-01-03'), deadlineDate:new Date('2024-01-01'), created: new Date('2024-01-07'), start: new Date('2024-01-13'), completed: new Date('2024-01-17'), },
    { name: 'Task 8', startDate: new Date('2024-01-01'), deadlineDate:new Date('2024-01-30'), created: new Date('2024-01-05'), start: new Date('2024-01-11'), completed: new Date('2024-01-31'), },
    { name: 'Task 9', startDate: new Date('2024-01-12'), deadlineDate:new Date('2024-01-31'), created: new Date('2024-01-13'), start: new Date('2024-01-14'), completed: new Date('2024-01-16'), },
    { name: 'Task 10', startDate: new Date('2024-01-03'), deadlineDate:new Date('2024-01-01'), created: new Date('2024-01-07'), start: new Date('2024-01-13'), completed: new Date('2024-01-17'), },
  ];
  



  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void{
    this.getActiveProjects();
    this.getFinisedProjects();
  }

  calculateMarginLeft(startDate: Date): number {
    const diffInDays = Math.floor((startDate.getDate())-1);
    return diffInDays * 2.7;
  }

  calculateWidth(date: Date, startDate: Date): number {
    const diffInDays = Math.floor((date.getDate() - startDate.getDate()) +1);
    // console.log('kkkklklklklk -===>',diffInDays)
    return diffInDays * 2.859;
  }
 
  isOn: boolean = true;

  toggleState(value:boolean) {
    this.isOn = value;
  }


  getActiveProjects() {
    this.projectsActive = {};
    this.apiService.getActiveProjects().subscribe(
      (r: any) => {
        console.log('getActiveProjects =>', r);
  
        // Filter projects based on conditions
        this.projectsActive = r.data.filter((project: { is_enabled: boolean; current_status: string; }) => {
          return project.is_enabled === true && project.current_status !== 'Finished';
        });
      },
      (e) => {
        console.error(e);
      }
    );
  }

  getFinisedProjects() {
    this.projectsFinised = {};
    this.apiService.getFinisedProjects().subscribe(
      (r: any) => {
        console.log('getFinisedProjects =>', r);
        this.projectsFinised = r.data
      },
      (e) => {
        console.error(e);
      }
    );
  }

  getTaskListOfActiveProject(project_id:any){
    // this.tasks = {};
    this.apiService.getTaskListOfActiveProject(project_id).subscribe(
      (r: any) => {
        console.log('getTaskListOfActiveProject =>', r);
        this.tasks = r.data.task_info;
        console.warn('tasks ==> ',this.tasks)
        // this.tasks = r.data.filter((project: { is_enabled: boolean; current_status: string; }) => {
        //   return project.is_enabled === true && project.current_status !== 'Finished';
        // });
      },
      (e) => {
        console.error(e);
      }
    );
  }
  
}

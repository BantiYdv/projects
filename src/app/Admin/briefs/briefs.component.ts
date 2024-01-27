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

  projectsActive: any = [];
  projectsFinised: any = [];
  // tasks: Task[] | any;
  // tasks: any[] = [
  //   { name: 'Task 1',created: new Date('2024-01-01'), startDate: new Date('2024-01-01'), deadlineDate:new Date('2024-01-25'), start: new Date('2024-01-11'), completed: new Date('2024-01-31'), },
  //   { name: 'Task 2',created: new Date('2024-01-03'), startDate: new Date('2024-01-04'), deadlineDate:new Date('2024-01-31'), start: new Date('2024-01-14'), completed: new Date('2024-01-16'), },
  //   { name: 'Task 3',created: new Date('2024-01-07'), startDate: new Date('2024-01-15'), deadlineDate:new Date('2024-01-29'), start: new Date('2024-01-10'), completed: new Date('2024-01-17'), },
  // ];
  tasks: Task[] = [
    {
      created: new Date("Sat Jan 01 2024 13:14:17 GMT+0530"),
      deadlineDate: new Date("Thu Jan 20 2024 05:30:00 GMT+0530"),
      name: "Add in Wishlist Item.",
      start: new Date("Sat Jan 17 2024 13:14:17 GMT+0530"),
      startDate: new Date("Wed Jan 02 2024 05:30:00 GMT+0530"),
      completed: new Date("Wed Jan 30 2024 05:30:00 GMT+0530"),
    },
    {
      created: new Date("Sat Jan 05 2024 15:37:41 GMT+0530"),
      deadlineDate: new Date("Wed Jan 31 2024 05:30:00 GMT+0530"),
      name: "Set in Product price.",
      start: new Date("Sat Jan 12 2024 15:37:07 GMT+0530"),
      startDate: new Date("Sat Jan 15 2024 05:30:00 GMT+0530"),
      completed: new Date("Wed Jan 27 2024 05:30:00 GMT+0530"),
    },
  ];
  // tasks: any;
  



  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void{
    this.getActiveProjects();
    this.getFinisedProjects();
    console.warn('tasks -=-=-=-=-=>>>>>',this.tasks)
  }

  // calculateMarginLeft(startDate: Date): number {
  //   const diffInDays = Math.floor((startDate.getDate())-1);
  //   return diffInDays * 2.88;
  // }

  // calculateWidth(date: Date, startDate: Date): number {
  //   const diffInDays = Math.floor((date.getDate() - startDate.getDate()) +1);
  //   return diffInDays * 2.79;
  // }
  calculateWidth(deadlineDate: Date, startDate: Date): number {
    const diffInDays = Math.floor((deadlineDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diffInDays * 2.88;
}
calculateMarginLeft(startDate: Date): number {
  const diffInDays = Math.floor((startDate.getDate()) - 1);
  return diffInDays * 2.88;
}


  
 
  isOn: boolean = true;

  toggleState(value:boolean) {
    this.isOn = value;
  }


  getActiveProjects() {
    this.projectsActive = [];
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
    this.projectsFinised = [];
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
        // this.tasks = r.data;
        this.tasks = this.convertResponsesToTasks(r.data);
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

  convertResponsesToTasks(responses: any[]): any[] {
    const convertedTasks: any[] = [];
  
    responses.forEach(response => {
      const task: any = {
        name: response.task_name || response.name,
        created: new Date(response.task_created_date || response.task_created_date),
        startDate: new Date(response.task_to_be_start_date || response.task_to_be_start_date),
        deadlineDate: new Date(response.task_to_be_deadline || response.task_to_be_deadline),
        start: this.extractStartDate(response.task_status) || null, // Explicitly set to null
        // Add other properties as needed
      };
  
      convertedTasks.push(task);
    });
  
    return convertedTasks;
  }
  
  
  extractStartDate(statusArray: any[]): Date {
    const startStatus = statusArray.find(status => status.state === 'Start');
    return startStatus ? new Date(startStatus.date) : new Date(); // Default value
  }
  
  
}

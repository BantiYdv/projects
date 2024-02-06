import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { ProjectComponent } from '../project/project.component';

// interface Task {
//   task_current_status: string,
//   name: string;
//   startDate: Date;
//   deadlineDate: Date;
//   created: Date;
//   start: Date;
//   completed: Date;
// }

@Component({
  selector: 'app-briefs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,ProjectComponent],
  templateUrl: './briefs.component.html',
  styleUrl: './briefs.component.css',
})
export class BriefsComponent {
  projectsActive: any = [];
  projectsFinised: any = [];
 
  // tasks: Task[] = [
  //   {
  //     task_current_status: 'completed',
  //     created: new Date('Sat Jan 01 2024 13:14:17 GMT+0530'),
  //     deadlineDate: new Date('Thu May 23  2024 05:30:00 GMT+0530'),
  //     name: 'Add in Wishlist Item.',
  //     start: new Date('Wed Jan 31 2024 13:14:17 GMT+0530'),
  //     // start: new Date('Sat Jan 27 2024 13:14:17 GMT+0530'),
  //     startDate: new Date('Wed Jan 02 2024 05:30:00 GMT+0530'),
  //     completed: new Date('Wed May 15 2024 05:30:00 GMT+0530'),

  //     // task_current_status: 'completed',
  //     // created: new Date('Sat Jan 20 2024 13:14:17 GMT+0530'),
  //     // deadlineDate: new Date('Mon Apr 15 2024 05:30:00 GMT+0530'),
  //     // name: 'Add in Wishlist Item.',
  //     // start: new Date('Tue Jan 30 2024 18:49:28 GMT+0530'),
  //     // startDate: new Date('Thu Jan 25 2024 05:30:00 GMT+0530'),
  //     // completed: new Date('Sun Mar 10 2024 18:49:36 GMT+0530'),
  //   },
  //   {
  //     task_current_status: 'created',
  //     created: new Date('Sat Jan 02 2024 15:37:41 GMT+0530'),
  //     deadlineDate: new Date('Wed Feb 28 2024 05:30:00 GMT+0530'),
  //     name: 'Set in Product price.',
  //     start: new Date('Wed Mar 20 2024 15:37:07 GMT+0530'),
  //     startDate: new Date('Sat Jan 05 2024 05:30:00 GMT+0530'),
  //     completed: new Date('Wed Apr 17 2024 05:30:00 GMT+0530'),
  //   },
  // ];
  tasks: any = [];
  checkDataMonth: Date | any;
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getActiveProjects();
    this.getFinisedProjects();
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth());
    this.checkDataMonth = nextMonth;
    // const today = this.formatDateObject();
    // this.checkDataMonth = today;
   
  }
  isSameMonthAndYear(date1: Date, date2: Date): boolean {
    const formattedDate1 = new Date(date1); 
    return (
      formattedDate1.getFullYear() === date2.getFullYear() &&
      formattedDate1.getMonth() === date2.getMonth()
    );
  }
  calculateWidth(deadlineDate: Date, startDate: Date): number {
    let diffInDays =
      Math.floor(
        (deadlineDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    return diffInDays * 2.88;
  }
  calculateMarginLeft(startDate: Date): number {
    const diffInDays = Math.floor(startDate.getDate() - 1);
    return diffInDays * 2.88;
  }

  getMonthsAndYearsBetweenDates(
    startDate: Date,
    endDate: Date
  ): { year: number; month: number }[] {
    const monthsAndYears: { year: number; month: number}[] = [];

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      monthsAndYears.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthsAndYears;
  }

  isCheckDataMonthPresent(startDate: Date, endDate: Date): boolean {
    const checkDataMonth = this.formatDateObject();
    if (!(checkDataMonth instanceof Date)) {
        return false;
    }
    const monthsAndYears = this.getMonthsAndYearsBetweenDates(startDate, endDate);
    
    return monthsAndYears.some(
        (monthAndYear) =>
            monthAndYear.year === checkDataMonth.getFullYear() &&
            monthAndYear.month === checkDataMonth.getMonth()
    );
}



  formatDateObject(): Date | string {
    const dateObject = new Date(this.checkDataMonth);

    if (!isNaN(dateObject.getTime())) {
      return dateObject;
    } else {
      return 'Invalid Date';
    }
  }
 
  checkMonthMonth2(date: any): boolean{
    return 1 == date.getMonth();
  }
  checkMonthYears(dateObject: any, s:Date,  e:Date): boolean {    
      return Array.from({length: e.getFullYear() - s.getFullYear() + 1}, (_, index) => s.getFullYear() + index).includes(dateObject.getFullYear());
    }
  
  
  isOn: boolean = true;

  toggleState(value: boolean) {
    this.isOn = value;
  }

  getActiveProjects() {
    this.projectsActive = [];
    this.apiService.getActiveProjects().subscribe(
      (r: any) => {
        this.projectsActive = r.data.filter(
          (project: { is_enabled: boolean; current_status: string }) => {
            return (
              project.is_enabled === true &&
              project.current_status !== 'Finished'
            );
          }
        );

         this.getTaskListOfActiveProject(this.projectsActive[0]._id)
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
        this.projectsFinised = r.data;
        console.log(r)
      },
      (e) => {
        console.error(e);
      }
    );
  }

  getTaskListOfActiveProject(project_id: any) {
    this.apiService.getTaskListOfActiveProject(project_id).subscribe(
      (r: any) => {
        this.tasks = this.convertResponsesToTasks(r.data);
      },
      (e) => {
        console.error(e);
        this.tasks = [];
      }
    );
  }

  convertResponsesToTasks(responses: any[]): any[] {
    const convertedTasks: any[] = [];

    responses.forEach((response) => {
      const task: any = {
        name: response.task_name || response.name,
        created: response.task_created_date
          ? new Date(response.task_created_date)
          : new Date(),
        startDate: response.task_to_be_start_date
          ? new Date(response.task_to_be_start_date)
          : new Date(),
        deadlineDate: response.task_to_be_deadline
          ? new Date(response.task_to_be_deadline)
          : new Date(),
        start: this.extractStartDate(response.task_status) || null,
        completed: this.extractFinishedDate(response.task_status) || null,
      };

      convertedTasks.push(task);
    });

    return convertedTasks;
  }

  extractStartDate(statusArray: any[]): Date {
    const startStatus = statusArray.find((status) => status.state === 'Start');
    return startStatus ? new Date(startStatus.date) : new Date('1001-01-01'); // Default value
  }
  extractFinishedDate(statusArray: any[]): Date {
    const finishedStatus = statusArray.find(
      (status) => status.state === 'Finished'
    );
    return finishedStatus ? new Date(finishedStatus.date) : new Date('1001-01-01'); // Default value
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './briefs.component.html',
  styleUrl: './briefs.component.css',
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
      created: new Date('Sat Jan 01 2024 13:14:17 GMT+0530'),
      deadlineDate: new Date('Thu Apr 25  2024 05:30:00 GMT+0530'),
      name: 'Add in Wishlist Item.',
      start: new Date('Sat Jan 18 2024 13:14:17 GMT+0530'),
      startDate: new Date('Wed Jan 02 2024 05:30:00 GMT+0530'),
      completed: new Date('Wed Apr 17 2024 05:30:00 GMT+0530'),
    },
    {
      created: new Date('Sat Jan 02 2024 15:37:41 GMT+0530'),
      deadlineDate: new Date('Wed Feb 28 2024 05:30:00 GMT+0530'),
      name: 'Set in Product price.',
      start: new Date('Wed Mar 20 2024 15:37:07 GMT+0530'),
      startDate: new Date('Sat Jan 05 2024 05:30:00 GMT+0530'),
      completed: new Date('Wed Apr 17 2024 05:30:00 GMT+0530'),
      // completed: new Date("Wed Jan 27 2024 05:30:00 GMT+0530"),
    },
  ];
  // tasks: any;
  // selectedMonth: string = '';
  // currentMonth: string = new Date().toISOString().split('T')[0];
  checkDataMonth: Date | any;
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getActiveProjects();
    this.getFinisedProjects();
    console.warn('tasks -=-=-=-=-=>>>>>', this.tasks);
    // const today = new Date();
    // const nextMonth = new Date(today.getFullYear(), today.getMonth() + 5, 15);
    // this.checkDataMonth = nextMonth;
    const today = this.formatDateObject();
    this.checkDataMonth = today;
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    return `${year}-${month}`;
  }

  isSameMonthAndYear(date1: Date, date2: Date): boolean {
    const formattedDate1 = new Date(date1); // Assuming date1 is in the format 'yyyy-MM'

    // Compare year and month of date1 and date2
    return (
      formattedDate1.getFullYear() === date2.getFullYear() &&
      formattedDate1.getMonth() === date2.getMonth()
    );
  }

  sendDataForCheck(start: Date, end: Date, check: Date){
    const startDate = start;
    const endDate = end;

    const result = this.isCheckDataMonthPresent(
      startDate,
      endDate
    );
    console.warn('result =-=-=-=- result', result);
  }

  getMonthsAndYearsBetweenDates(
    startDate: Date,
    endDate: Date
  ): { year: number; month: number }[] {
    const monthsAndYears: { year: number; month: number }[] = [];

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      monthsAndYears.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthsAndYears;
  }

  isCheckDataMonthPresent(startDate: Date, endDate: Date): boolean {
    const checkDataMonth = this.formatDateObject();

    // console.log('startDate -=-=->', typeof(startDate), startDate);
    // console.log('endDate -=-=->', typeof(endDate), endDate);
    // console.log('checkDataMonth -=-=->', typeof(checkDataMonth), checkDataMonth);

    if (!(checkDataMonth instanceof Date)) {
        // console.error('-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        // handle the case where checkDataMonth is not a Date object
        return false;
    }

    const monthsAndYears = this.getMonthsAndYearsBetweenDates(startDate, endDate);

    return monthsAndYears.some(
        (monthAndYear) =>
            monthAndYear.year === checkDataMonth.getFullYear() &&
            monthAndYear.month === checkDataMonth.getMonth()
    );
}


  dateString = 'Fri Mar 01 2024 05:30:00 GMT+0530 (India Standard Time)';

  formatDateObject(): Date | string {
    const dateObject = new Date(this.checkDataMonth);

    if (!isNaN(dateObject.getTime())) {
      return dateObject;
    } else {
      return 'Invalid Date';
    }
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
    let diffInDays =
      Math.floor(
        (deadlineDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    // console.warn('diffIndays',diffInDays)
    return diffInDays * 2.88;
  }
  calculateMarginLeft(startDate: Date): number {
    const diffInDays = Math.floor(startDate.getDate() - 1);
    return diffInDays * 2.88;
  }
  isBetweenCheckMonth(start: Date, completed: Date, checkDate: Date): boolean {
    const areYearAndMonthEqual = (date1: Date, date2: Date): boolean => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
      );
    };

    return (
      !areYearAndMonthEqual(checkDate, start) &&
      !areYearAndMonthEqual(checkDate, completed)
    );
  }

  isEarlierMonthAndYear(created: Date, start: Date, checkData: Date): boolean {
    const yearCheck = checkData.getFullYear();
    const monthCheck = checkData.getMonth();

    const yearCreated = created.getFullYear();
    const monthCreated = created.getMonth();

    const yearStart = start.getFullYear();
    const monthStart = start.getMonth();

    return (
      (yearCreated < yearCheck ||
        (yearCreated === yearCheck && monthCreated < monthCheck)) &&
      (yearStart < yearCheck ||
        (yearStart === yearCheck && monthStart < monthCheck))
    );
  }

  isOn: boolean = true;

  toggleState(value: boolean) {
    this.isOn = value;
  }

  getActiveProjects() {
    this.projectsActive = [];
    this.apiService.getActiveProjects().subscribe(
      (r: any) => {
        console.log('getActiveProjects =>', r);

        // Filter projects based on conditions
        this.projectsActive = r.data.filter(
          (project: { is_enabled: boolean; current_status: string }) => {
            return (
              project.is_enabled === true &&
              project.current_status !== 'Finished'
            );
          }
        );
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
        this.projectsFinised = r.data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  getTaskListOfActiveProject(project_id: any) {
    // this.tasks = {};
    this.apiService.getTaskListOfActiveProject(project_id).subscribe(
      (r: any) => {
        console.log('getTaskListOfActiveProject =>', r);
        // this.tasks = r.data;
        this.tasks = this.convertResponsesToTasks(r.data);
        console.warn('tasks ==> ', this.tasks);
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
    return startStatus ? new Date(startStatus.date) : new Date(); // Default value
  }
  extractFinishedDate(statusArray: any[]): Date {
    const finishedStatus = statusArray.find(
      (status) => status.state === 'Finished'
    );
    return finishedStatus ? new Date(finishedStatus.date) : new Date(); // Default value
  }

  //   onSearchMonth() {
  //     // Filter projects based on the selected month
  //     this.projectsActive = this.projectsActive.filter((projectsActive: { start_date: string | number | Date; }) => {
  //       const projectMonth = new Date(projectsActive.start_date).toLocaleString('en-US', { month: '2-digit' });
  //       console.log("selected month", this.selectedMonth);
  //       return projectMonth === this.selectedMonth;
  //     });
  //   }
  //  FilterMonth(){
  //   if(this.selectedMonth){
  //     this.projectsActive = this.projectsActive.filter((item: { name: string;}) =>
  //    item.name.toLowerCase().includes(this.selectedMonth.toLowerCase())
  //    )};
  //  }
}

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
projects: any;
tasks: any;

constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

ngOnInit(): void {
  this.getProject();
  this.getTask();
  // this.getProjectById(userId);

}

  toggleState(value:boolean) {
    this.isOn = value;
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
  getTask(){
    this.projects = {};
    this.apiService.getTask().subscribe(
      (r:any) => {
        this.tasks = r.data;
        console.log('==> ==>',r.data)
        console.log('tasks = > => =>',this.tasks)
      },
      (e) => {
        console.error(e);
      }
    )
  }
}

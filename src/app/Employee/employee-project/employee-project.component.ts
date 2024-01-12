import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.css'
})
export class EmployeeProjectComponent {
  projects = [
    { _id:'1', projectName: 'awx media', startDate: '16 feb 2024', deadlineDate: '21 mar 2024' },
    {  _id:'2',projectName: 'awx media', startDate: '16 feb 2024', deadlineDate: '21 mar 2024' },
    {  _id:'3',projectName: 'awx media', startDate: '16 feb 2024', deadlineDate: '21 mar 2024' },
    {  _id:'4',projectName: 'awx media', startDate: '16 feb 2024', deadlineDate: '21 mar 2024'},
    // Add more projects as needed
  ];
}

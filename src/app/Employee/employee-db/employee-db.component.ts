import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-employee-db',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './employee-db.component.html',
  styleUrl: './employee-db.component.css'
})
export class EmployeeDBComponent {

  
  constructor(public apiService: ApiServiceService) {}
  
 
}

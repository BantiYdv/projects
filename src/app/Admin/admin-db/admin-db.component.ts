import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-admin-db',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-db.component.html',
  styleUrl: './admin-db.component.css'
})
export class AdminDBComponent {

  constructor(public apiService: ApiServiceService) {}
  
}

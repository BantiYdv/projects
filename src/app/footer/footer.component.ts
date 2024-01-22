import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor( public apiService: ApiServiceService,) {}
  openWhatsApp(phoneNumber: string, message: string) {
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}

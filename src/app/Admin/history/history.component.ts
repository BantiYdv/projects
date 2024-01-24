import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {


  isOn: boolean = true;

  toggleState(value:boolean) {
    this.isOn = value;
  }
}

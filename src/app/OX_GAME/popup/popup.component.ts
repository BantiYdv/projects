import { Component } from '@angular/core';
import { PopService } from '../../service/pop.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  popupData: any;
  constructor(private popup : PopService){}

  ngOnInit(): void {
    this.popup.getPopupData().subscribe(data => {
      this.popupData = data;
    });
  }

  closePopup(): void {
    this.popup.setPopupVisibility(false);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopService {

  constructor() { }
  private popupVisible = new BehaviorSubject<boolean>(false);
  private popupData = new BehaviorSubject<any>(null);

  getPopupVisibility(): Observable<boolean> {
    return this.popupVisible.asObservable();
  }

  setPopupVisibility(visible: boolean): void {
    this.popupVisible.next(visible);
  }

  getPopupData(): Observable<any> {
    return this.popupData.asObservable();
  }

  setPopupData(data: any): void {
    this.popupData.next(data);
  }
}

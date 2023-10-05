import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,private router: Router, private api: ApiService) { }

  // show profile name in top start
getShowData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.api.EmpNameShow}`, { headers });
}
// show profile name in top end

// // apply leave start
// applyLeave(formData: any) {
//   const url = `${this.api.ApplyLeave}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.post(url, formData, { headers });
// }
// // apply leave end

// // view leave start
// getViewLeave() {
//   const url = `${this.api.ViewLeave}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view leave end

// // view all leave start
// getAllLeave() {
//   const url = `${this.api.ViewAllLeave}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view all leave end

// check in start
performCheckin() {
  const url = `${this.api.CheckIn}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestData = {
    checkedIn: 'checkedIn' // Remove the curly braces
  };
  
  return this.http.post(url, requestData, { headers });
}
// check in end

//check out start
performCheckout() {
  const url = `${this.api.CheckOut}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestData = {
    checkedOut: 'checkedOut'
  };
  
  return this.http.post(url, requestData, { headers });
}
// check out end

// // view att start
// getAttendance() {
//   const url = `${this.api.EmpAtt}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view att end

// // view all att start
// getAllAttendance() {
//   const url = `${this.api.ViewAllAtt}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view all att end

// // apply wfh start
// applyWfh(formData: any) {
//   const url = `${this.api.ApplyWfh}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.post(url, formData, { headers });
// }
// // apply wfh end

// // view wfh start
// getWfhData() {
//   const url = `${this.api.ViewWfh}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view wfh end

// // view all wfh start
// getAllWfhData() {
//   const url = `${this.api.ViewAllWfh}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view all wfh end

// // view employee list start
// getEmployeeList() {
//   const url = `${this.api.ViewEmpList}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view employee list end

// edit user profile start
editUserProfile(requestBody: any) {
  const url = `${this.api.EditProfile}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.put(url, requestBody, { headers });
}
// edit user profile end


}

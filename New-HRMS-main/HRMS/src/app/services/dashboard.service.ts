import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,private router: Router, private api: ApiService) { }

//   // team leave start
// getTeamLeaveData(): Observable<any> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//   return this.http.get(this.api.teamLeave, { headers });
// }
// // team leave end

// upload pdf start
uploadPdf(file: File): void {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const token = localStorage.getItem('jwtToken'); // Replace with your authorization token logic
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.post(this.api.uploadPdfUrl, formData, { headers }).subscribe(
    () => {
      // File uploaded successfully
      this.showSuccessAlert('File uploaded successfully!');
    },
    (error) => {
      // Error uploading the file
      this.showErrorAlert('Error uploading the file');
      console.error('Error uploading the file:', error);
    }
  );
}

private showSuccessAlert(message: string): void {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });
}

private showErrorAlert(message: string): void {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
}
// upload pdf end

// // download employee list in excel start
// getEmployeeListExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
//   return this.http.get(this.api.EmpListExcel, {
//     headers,
//     responseType: 'blob',
//     observe: 'response' // To access the full response with headers
//   });
// }
// // download employee list in excel end

// // download employee leave in excel start
// getEmployeeLeaveExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
//   return this.http.get(this.api.EmpLeaveExcel, {
//     headers,
//     responseType: 'blob',
//     observe: 'response' // To access the full response with headers
//   });
// }
// // download employee leave in excel end

// // download employee Att in excel start
// getEmployeeAttExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
//   return this.http.get(this.api.EmpAttExcel, {
//     headers,
//     responseType: 'blob',
//     observe: 'response' // To access the full response with headers
//   });
// }
// // download employee Att in excel end

// // download employee WFH in excel start
// getEmployeeWfhExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
//   return this.http.get(this.api.EmpWfhExcel, {
//     headers,
//     responseType: 'blob',
//     observe: 'response' // To access the full response with headers
//   });
// }
// // download employee WFH in excel end

// // team wfh start
// getTeamWfhData(): Observable<any> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//   return this.http.get(this.api.teamWfh, { headers });
// }
// // team wfh end



// //Approve leave start
// approveLeave(id: number): Observable<any> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const requestBody = {
//     approval: 'Approved'
//   };
//   const url = `${this.api.ApproveLeave}/${id}`;
//   return this.http.put(url, requestBody, { headers });
// }
// //Approve leave end

// //Reject leave start
// rejectLeave(id: number): Observable<any> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const requestBody = {
//     approval: 'Rejected'
//   };
//   const url = `${this.api.RejectLeave}/${id}`;
//   return this.http.put(url, requestBody, { headers });
// }
// //Reject leave end

// //Approve wfh start
// approveWfh(id: number): Observable<any> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const requestBody = {
//     approval: 'Approved'
//   };
//   const url = `${this.api.ApproveWfh}/${id}`;
//   return this.http.put(url, requestBody, { headers });
// }
// //Approve wfh end

// //Reject wfh start
// rejectWfh(id: number): Observable<any> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const requestBody = {
//     approval: 'Rejected'
//   };
//   const url = `${this.api.RejectWfh}/${id}`;
//   return this.http.put(url, requestBody, { headers });
// }
// //Reject wfh end

// //Delete Employee start

// deleteEmployee(id: number): Observable<any> {
//   const url = `${this.api.DeleteEmp}/${id}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   return this.http.delete(url, { headers });
// }
// //Delete Employee end

// // create role start
// createRole(name: string, permissionNames: string[]): Observable<any> {
//   const url = `${this.api.Role}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   });

//   const payload = {
//     name: name,
//     permissionNames: permissionNames
//   };

//   return this.http.post(url, payload, { headers });
// }
// // create role end

// employee details start
// empdetails(id: number): Observable<any> {
//   const url = `${this.api.Empdetail}/${id}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// employee details end

// show profile name in top start
getShowData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.api.EmpNameShow}`, { headers });
}
// show profile name in top end
}

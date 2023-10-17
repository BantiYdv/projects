import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient,private router: Router, private api: ApiService) { }

// view employee list start
getEmployeeList() {
  const url = `${this.api.ViewEmpList}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view employee list end

// team leave start
getTeamLeaveData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(this.api.teamLeave, { headers });
}
// team leave end

//Approve leave start
approveLeave(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestBody = {
    approval: 'Approved'
  };
  const url = `${this.api.ApproveLeave}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Approve leave end

//Reject leave start
rejectLeave(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestBody = {
    approval: 'Rejected'
  };
  const url = `${this.api.RejectLeave}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Reject leave end

// team wfh start
getTeamWfhData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(this.api.teamWfh, { headers });
}
// team wfh end

//Approve wfh start
approveWfh(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestBody = {
    approval: 'Approved'
  };
  const url = `${this.api.ApproveWfh}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Approve wfh end

//Reject wfh start
rejectWfh(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestBody = {
    approval: 'Rejected'
  };
  const url = `${this.api.RejectWfh}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Reject wfh end

// create role start
createRole(name: string, permissionNames: string[]): Observable<any> {
  const url = `${this.api.Role}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const payload = {
    name: name,
    permissionNames: permissionNames
  };

  return this.http.post(url, payload, { headers });
}
// create role end



// view role with permissions start 
ViewRolewithPermission(){
  const url = `${this.api.RoleWithPermission}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view role with permissions end

viewRole(id: number): Observable<any> {
  const url = `${this.api.RoleWithPermission}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}

// add permission start

AddPermissionName(id: number, permissionNames: string[]) {
  const url = `${this.api.AddPermission}/${id}/addPermission`; // Correct the URL
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestBody = {
    permissionNames: permissionNames
  };
  console.log("permission body", requestBody);
  console.log("permission name", permissionNames);
  return this.http.post(url, requestBody, { headers });
}

// add permission end

// Remove permission start removePermission
// RemovePermission(id: number): Observable<any> {
//   const url = `${this.api.RemovePermission}/removePermission/${id}`;
//     const token = localStorage.getItem('jwtToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(url, { headers });
// }
// RemovePermission(id: number, selectedPermissions: string[]): Observable<any> {
//   const url = `${this.api.RemovePermission}/removePermission/${id}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   return this.http.post(url, { selectedPermissions }, { headers });
// }
RemovePermission(id: number, permissionNames: string[]): Observable<any> {
  const url = `${this.api.RemovePermission}/removePermission/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestBody = {
    permissionNames: permissionNames
  };
  console.log("remove permission body", requestBody);
  console.log("remove permission name", permissionNames);
  return this.http.post(url, requestBody, { headers });
}

// Remove permission end

// delete role start
deleteRole(id: number): Observable<any> {
  const url = `${this.api.DeleteRole}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(url, { headers });
}
// delete role end


// download employee list in excel start
getEmployeeListExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
  return this.http.get(this.api.EmpListExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
// download employee list in excel end

// download employee leave in excel start
getEmployeeLeaveExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
  return this.http.get(this.api.EmpLeaveExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
// download employee leave in excel end

// download employee Att in excel start
getEmployeeAttExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
  return this.http.get(this.api.EmpAttExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
// download employee Att in excel end

// download employee WFH in excel start
getEmployeeWfhExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
  return this.http.get(this.api.EmpWfhExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
// download employee WFH in excel end

// apply leave start
applyLeave(formData: any) {
  const url = `${this.api.ApplyLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.post(url, formData, { headers });
}
// apply leave end

// view leave start
getViewLeave() {
  const url = `${this.api.ViewLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view leave end

// view att start
getAttendance() {
  const url = `${this.api.EmpAtt}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view att end

// apply wfh start
applyWfh(formData: any) {
  const url = `${this.api.ApplyWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.post(url, formData, { headers });
}
// apply wfh end

// view wfh start
getWfhData() {
  const url = `${this.api.ViewWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view wfh end

// view all att start
getAllAttendance() {
  const url = `${this.api.ViewAllAtt}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view all att end

// view all wfh start
getAllWfhData() {
  const url = `${this.api.ViewAllWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view all wfh end

// view all leave start
getAllLeave() {
  const url = `${this.api.ViewAllLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// view all leave end



//Delete Employee start

deleteEmployee(id: number): Observable<any> {
  const url = `${this.api.DeleteEmp}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(url, { headers });
}
//Delete Employee end





}

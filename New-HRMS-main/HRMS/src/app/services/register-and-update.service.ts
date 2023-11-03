import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RegisterAndUpdateService {
  user: any;

  constructor(private http: HttpClient,private router: Router, private api: ApiService) { }

  // team lead show start
  getTeamLeads(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api.TeamLeadShow}`, { headers });
  }
  // team lead show end

  // designation show start
  getdesignation(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api.designationShow}`, { headers });
  }
  // designation show end

  // designation show start
  getdepartment(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api.departmentShow}`, { headers });
  }
  // designation show end

  // designation show start
  getrole(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api.RoleShow}`, { headers });
  }
  // designation show end

  // Registration start
  registerUser(registrationData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.api.Registration}`, registrationData, { headers });
  }
  // Registration end

  // show user data when update start
  fetchData(id: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.api.Userdatashow}/${id}`;
    return this.http.get(url, { headers });
  }
  // show user data when update end

  // update employee start
  updateEmployee(employeeId: string, data: any) {
    const updateUrl = `${this.api.UpdateEmp}/${employeeId}`;
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
console.log("adasswss", data);
console.log("wwswswewe", token);
    
    return this.http.put(updateUrl, data, { headers });
  }
  
  // update employee end

    // employee details start
empdetails(id: number): Observable<any> {
  const url = `${this.api.Empdetail}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });
}
// employee details end

// upload pdf start
uploadDocs(formData: any, id: number) {
  
  const token = localStorage.getItem('jwtToken'); // Replace with your authorization token logic
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.api.uploadDocsUrl}/${id}`;

 return this.http.post(url, formData, { headers });

}
// upload pdf end 




}

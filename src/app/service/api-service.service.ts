import { Injectable } from '@angular/core';
import { KeysServiceService } from './keys-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  token: any = localStorage.getItem('token');
  userId: any = localStorage.getItem('userId');
  // token: any = "Abc";
  headersWithOutAuth = new HttpHeaders({
    'Content-Type': 'application/json',
    project_secret_key: this.keys.project_secret_key,
  });
  headerWithAuth = new HttpHeaders({
    // 'Content-Type': 'application/json',
    project_secret_key: this.keys.project_secret_key,
    request_by: this.userId,
    Authorization: `Bearer ${this.token}`,
  });

  constructor(
    private keys: KeysServiceService,
    private http: HttpClient,
    private router: Router
  ) {}

  signUp(userData: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.signUp, userData, { headers });
  }

  signIn(userData: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.signIn, userData, { headers });
  }

  countryDialCode(){
    const headers = this.headersWithOutAuth;
    return this.http.get(this.keys.countryDialCode, { headers });
  }

  saveAvatar(saveAvatar: any): Observable<any> {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveAvatar, saveAvatar, { headers });
  }
  getUserDetails(getUserDetails: any) {
    const headers = this.headerWithAuth;
    return this.http.get(
      `${this.keys.getUserDetails}?user_id=${getUserDetails}`,
      { headers }
    );
  }

  updateProfile(userData:any){
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateProfile, userData, { headers });
  }
  deleteUser(id:any,is_deleted:boolean){
    console.log(id);
    const data = {
      admin_id: localStorage.getItem('userId'),
      is_deleted:is_deleted,
      user_id: id,
    };
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.deleteUser, data, { headers });
  }
  //project code start
  saveProject(project: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveProject, project, { headers });
  }

  getProject() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getProject, { headers });
  }

  getProjectById(project: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getProjectById}?project_id=${project}`, {
      headers,
    });
  }

  updateProjectById(project: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateProjectById, project, { headers });
  }

  deleteProjectById(id: any, is_enabled: boolean) {
    console.log(id);
    const data = {
      project_id: id,
      is_deleted: is_enabled,
      user_id: localStorage.getItem('userId'),
    };

    const headers = this.headerWithAuth;
    return this.http.post(this.keys.deleteProjectById, data, { headers });
  }

  get_client_id(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.get_client_id}`, { headers });
  }
  get_handel_by(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.get_handel_by}`, { headers });
  }
  updatedProjectStatus(id: any, status: any) {
    const data = {
      project_id: id,
      status: status,
      user_id: localStorage.getItem('userId'),
    };
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updatedProjectStatus, data, { headers });
  }

  addParticipant(id: any, addParticipant: any) {
    const data = {
      project_id: id,
      team_members: addParticipant,
      user_id: localStorage.getItem('userId'),
    };
    console.log('data ==> ',data)
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.addParticipant, data, { headers });
  }
  //project code end

  //task code start
  saveTask(task: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveTask, task, { headers });
  }

  getTask() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTask, { headers });
  }

  getTaskById(task: any) {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTaskById, { headers });
  }

  updateTaskById(task: any) {
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateTaskById, task, { headers });
  }

  deleteTaskById(task: any) {
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteTaskById, { headers });
  }
  //task code end

  //TeamMember code start
  getTeamMemberListToAddParticipant(project_id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(
      `${this.keys.getTeamMemberListToAddParticipant}?project_id=${project_id}`,
      { headers }
    );
  }
  saveTeamMember(teamMember: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveTeamMember, teamMember, { headers });
  }

  getTeamMember() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTeamMember, { headers });
  }

  getTeamMemberById(teamMember: any) {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTeamMemberById, { headers });
  }

  updateTeamMemberById(teamMember: any) {
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateTeamMemberById, teamMember, {
      headers,
    });
  }

  deleteTeamMemberById(teamMember: any) {
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteTeamMemberById, { headers });
  }
  //TeamMember code end

  //workStatus code start
  saveWorkStatus(workStatus: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveWorkStatus, workStatus, { headers });
  }

  getWorkStatus() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getWorkStatus, { headers });
  }

  getWorkStatusById(workStatus: any) {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getWorkStatusById, { headers });
  }

  updateWorkStatusById(workStatus: any) {
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateWorkStatusById, workStatus, {
      headers,
    });
  }

  deleteWorkStatusById(workStatus: any) {
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteWorkStatusById, { headers });
  }
  //workStatus code end

  //User Logged In code start
  getRole = localStorage.getItem('role');
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }
  //User Logged In code end

  saveCientRequirement(data: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.saveCientRequirement, data, { headers });
  }
  bookTimeForMeeting(data: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.bookTimeForMeeting, data, { headers });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/log-in']);
    window.location.reload();
  }
}

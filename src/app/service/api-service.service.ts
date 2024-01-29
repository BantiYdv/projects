import { Injectable } from '@angular/core';
import { KeysServiceService } from './keys-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  pageType: any;
  token: any = localStorage.getItem('token');
  userId: any = localStorage.getItem('userId');
  // token: any = "Abc";
  headersWithOutAuth = new HttpHeaders({
    project_secret_key: this.keys.project_secret_key,
  });
  headerWithAuth = new HttpHeaders({
    project_secret_key: this.keys.project_secret_key,
    request_by: this.userId,
    Authorization: `Bearer ${this.token}`,
  });

  constructor(
    private keys: KeysServiceService,
    private http: HttpClient,
    private router: Router
  ) {}

  showPage(pageType: string) {
    console.log('page type =>',pageType)
    this.pageType = pageType;
  }
  scrollToSection(sectionId: string): void {
    console.log(sectionId)
    const element = document.getElementById(sectionId);
    if (element) {
      const elementOffset = element.getBoundingClientRect().top;
      const bodyRect = document.body.getBoundingClientRect().top;
      const offset = elementOffset - bodyRect;
      const middleOfPage = offset - window.innerHeight / 90; // Adjust as needed
      window.scrollTo({ top: middleOfPage, behavior: 'smooth' });
    }
  }
  
  routePage(pageType: any, sectionId: any): void {
    this.showPage(pageType);
  
    // Delay the scrollToSection call by 3 seconds
    setTimeout(() => {
      this.scrollToSection(sectionId);
    }, 10);
  }
  

  signUp(userData: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.signUp, userData, { headers });
  }

  signIn(userData: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.signIn, userData, { headers });
  }

  verifyOtp(verifyOtp:any){
    const headers = this.headersWithOutAuth;
    return this.http.get(`${this.keys.verifyOtp}?email=${verifyOtp.email}&otp=${verifyOtp.otp}&is_team_member=true`, { headers });
  }
  verifyOtpUsers(verifyOtp:any){
    const headers = this.headersWithOutAuth;
    return this.http.get(`${this.keys.verifyOtp}?email=${verifyOtp.email}&otp=${verifyOtp.otp}`, { headers });
  }
  sendOTPForForgetPassword(fpData:any){
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.sendOTPForForgetPassword,fpData, { headers })
  }

  savePassword(password:any){
    const data = {
      user_id : localStorage.getItem('savePasswordId'),
      password : password,
      is_change_password_request:false
    }
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.savePassword,data,{headers});
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

  deleteFileSharing(fileshareing_id:any,is_deleted:boolean){
    console.log(fileshareing_id);
    const data = {
      fileshareing_id: fileshareing_id,
      is_deleted:is_deleted
    };
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.deleteFileSharing, data, { headers });
  }
  updateFileSharing(userData:any){
    console.warn('FormData',userData)
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateFileSharing, userData, { headers });
  }
  fileMarkAsSeen(id:any){
    const data = {
      fileshareing_id:id
    }
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.fileMarkAsSeen, data, { headers }); 
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
  getActiveProjects() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getActiveProjects, { headers });
  }
  getFinisedProjects() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getFinisedProjects, { headers });
  }
  getProjectType() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getProjectType, { headers });
  }

  getProjectById(project: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getProjectById}?project_id=${project}`, {
      headers,
    });
  }
  getFileSharingForReview(project: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getFileSharingForReview}?project_id=${project}`, {
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

  get_client_id() {
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
  getTaskProject(id:any){
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getTask}?project_id=${id}`, { headers });
  }

  getTaskListOfActiveProject(project_id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getTaskListOfActiveProject}?project_id=${project_id}`, { headers });
  }
  getTaskById(task: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getTaskById}?task_id=${task}`, { headers });
  }

  updateTaskStatus(id:any,status:any){
    const data = {
      task_id: id,
      status: status,
      user_id: localStorage.getItem('userId'),
    };
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateTaskStatus,data,{headers});
  }

  updateTaskById(task: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateTaskById, task, { headers });
  }

  deleteTaskById(id: any,is_deleted:any) {
    const data = {
      task_id: id,
      is_deleted: is_deleted,
      user_id: localStorage.getItem('userId'),
    };
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.deleteTaskById,data, { headers });
  }
  
  assignTask(id: any){
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.AssignTask}?project_id=${id}` ,  { headers });
  }

  updateTaskStatusEmployee(id:any,status:any){
    const data = {
      task_id: id,
      status: status,
      user_id: localStorage.getItem('userId'),
    };
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateTaskStatus,data,{headers});
  }

  updateTaskAssign(id: any, assgined_to: any) {
    const data = {
      task_id: id,
      assgined_to: assgined_to,
      user_id: localStorage.getItem('userId'),
    };
    console.log("assgined_to", assgined_to)
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.updateTaskById, data, { headers });
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
    return this.http.get(`${this.keys.getTeamMember}?is_also_view_inactive_members=false`, { headers });
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
  
  getTeamMemberProjects(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getTeamMemberProjects}?team_member_id=${id}`, { headers });
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
  addCreativeAssets(assets: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.addCreativeAssets, assets, { headers });
  }

  getAllCreativeAssetsOfClient() {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getAllCreativeAssetsOfClient}`, { headers });
  }
  getClientProjectList(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getClientProjectList}?client_id=${id}`, { headers });
  }
  // getClientProject() {
  //   const headers = this.headerWithAuth;
  //   return this.http.get(`${this.keys.getClientProject}`, { headers });
  // }
  getCreativeAssetsOfMember(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getCreativeAssetsOfMember}?project_id=${id}`, { headers });
  }
  getAllCreativeAssets(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.getAllCreativeAssets}?project_id=${id}`, { headers });
  }
  cAGetAllCreativeAssets(id: any) {
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.cAGetAllCreativeAssets}?project_id=${id}`, { headers });
  }
  assignCreativeAssetsToTeamMember(member:any,id:any) {
    const data ={
      assests_id:id,
      members:member,
    }
    const headers = this.headerWithAuth;
    return this.http.post(`${this.keys.assignCreativeAssetsToTeamMember}`,data, { headers });
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
    this.router.navigate(['/home']);
    localStorage.clear();
    window.location.reload();
  }

  saveFileSharing(project: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveFileSharing, project, { headers });
  }
  getFileSharing() {
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getFileSharing, { headers });
  }
  shareReviewForFiles(id:any,accpet:any, comment:any) {
    const data =  {
fileshareing_id:id,
is_accpeted:accpet,
review_comment:comment
    }
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.shareReviewForFiles, data, { headers });
  }
  

  addClient(userData: any) {
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.addClient, userData, { headers });
  }
}

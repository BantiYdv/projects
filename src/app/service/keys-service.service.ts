import { Injectable } from '@angular/core';
import { SecretKeysServiceService } from './secret-keys-service.service';

@Injectable({
  providedIn: 'root'
})
export class KeysServiceService {

  constructor(private secretKeys:SecretKeysServiceService) { }

  public mainUrl = "http://101.53.145.234:4005";

  public signIn = `${this.mainUrl}/user/login`;
  public signUp = `${this.mainUrl}/user/registration`;
  public sendOTPForForgetPassword = `${this.mainUrl}/user/sendOTPForForgetPassword`;
  public verifyOtp = `${this.mainUrl}/user/verifiyOtp`;//user/verifiyOtp?email=shreeprana.prajapat@prilient.com&otp=5895

  public saveProject = `${this.mainUrl}/project/saveProject`;
  public getProject = `${this.mainUrl}/project/getProject`;
  public getProjectById = `${this.mainUrl}/getProjectById`;
  public updateProjectById = `${this.mainUrl}/updateProjectById`;
  public deleteProjectById = `${this.mainUrl}/deleteProjectById`;
  public get_client_id = `${this.mainUrl}/user/getUserList`
  public get_handel_by = `${this.mainUrl}/teamMembers/getTeamMemberList`
  public updatedProjectStatus = `${this.mainUrl}/`

  public saveTask = `${this.mainUrl}/saveTask`;
  public getTask = `${this.mainUrl}/getTask`;
  public getTaskById = `${this.mainUrl}/getTaskById`;
  public updateTaskById = `${this.mainUrl}/updateTaskById`;
  public deleteTaskById = `${this.mainUrl}/deleteTaskById`;

  public saveTeamMember = `${this.mainUrl}/saveTeamMember`;
  public getTeamMember = `${this.mainUrl}/getTeamMember`;
  public getTeamMemberById = `${this.mainUrl}/getTeamMemberById`;
  public updateTeamMemberById = `${this.mainUrl}/updateTeamMemberById`;
  public deleteTeamMemberById = `${this.mainUrl}/deleteTeamMemberById`;

  public saveWorkStatus = `${this.mainUrl}/saveWorkStatus`;
  public getWorkStatus = `${this.mainUrl}/getWorkStatus`;
  public getWorkStatusById = `${this.mainUrl}/getWorkStatusById`;
  public updateWorkStatusById = `${this.mainUrl}/updateWorkStatusById`;
  public deleteWorkStatusById = `${this.mainUrl}/deleteWorkStatusById`;
  public saveCientRequirement = `${this.mainUrl}/client/saveCientRequirement`
  public bookTimeForMeeting = `${this.mainUrl}/client/bookTimeForMeeting`
  
 
  public project_secret_key = this.secretKeys.project_secret_key

}

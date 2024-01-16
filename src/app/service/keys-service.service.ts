import { Injectable } from '@angular/core';
import { SecretKeysServiceService } from './secret-keys-service.service';

@Injectable({
  providedIn: 'root'
})
export class KeysServiceService {

  constructor(private secretKeys:SecretKeysServiceService) { }

  public mainUrl = "http://101.53.145.234:4005";

  public signIn = `${this.mainUrl}/user/login`;//done
  public signUp = `${this.mainUrl}/user/registration`;//done
  public sendOTPForForgetPassword = `${this.mainUrl}/user/sendOTPForForgetPassword`;
  public verifyOtp = `${this.mainUrl}/user/verifiyOtp`;//done
  public savePassword = `${this.mainUrl}/user/savePassword`;//done
  public countryDialCode = `${this.mainUrl}/countryDialCode`;//done
  
  public saveAvatar = `${this.mainUrl}/user/saveAvatar`;//done
  public getUserDetails = `${this.mainUrl}/user/getUserDetails`;//done
  public updateProfile = `${this.mainUrl}/user/updateProfile`;//done
  public deleteUser = `${this.mainUrl}/user/deleteUser`;//done


  public saveProject = `${this.mainUrl}/project/saveProject`;//done
  public getProject = `${this.mainUrl}/project/getProject`;//done
  public getProjectById = `${this.mainUrl}/project/getProjectDetailsById`;//done
  public updateProjectById = `${this.mainUrl}/project/updateProject`;//done
  public deleteProjectById = `${this.mainUrl}/project/deleteProject`;//done
  public get_client_id = `${this.mainUrl}/user/getUserList`//done
  public get_handel_by = `${this.mainUrl}/teamMembers/getTeamMemberList`//done
  public updatedProjectStatus = `${this.mainUrl}/project/updateStatusOfProject`//done
  public addParticipant = `${this.mainUrl}/project/addParticipant `//done

  public saveTask = `${this.mainUrl}/task/createTask`;//done
  public getTask = `${this.mainUrl}/task/getTaskList`;
  public getTaskById = `${this.mainUrl}/task/getTaskDetailsById`;
  public updateTaskById = `${this.mainUrl}/updateTaskById`;
  public deleteTaskById = `${this.mainUrl}/task/deleteTask`;

  public getTeamMemberListToAddParticipant = `${this.mainUrl}/teamMembers/getTeamMemberListToAddParticipant`;//done
  public saveTeamMember = `${this.mainUrl}/teamMembers/teamMemberRegistration`;//done
  public getTeamMember = `${this.mainUrl}/teamMembers/getTeamMemberList`;//done
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

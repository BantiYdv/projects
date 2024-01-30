import { Injectable } from '@angular/core';
import { SecretKeysServiceService } from './secret-keys-service.service';

@Injectable({
  providedIn: 'root'
})
export class KeysServiceService {

  constructor(private secretKeys:SecretKeysServiceService) { }

  public mainUrl = "https://api-avx.prilient.com";
  
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
  
  public deleteFileSharing = `${this.mainUrl}/file/deleteFileSharing`;//done
  public updateFileSharing = `${this.mainUrl}/file/updateFileSharing`;//done
  public fileMarkAsSeen = `${this.mainUrl}/client/fileMarkAsSeen`;//done


  public getProjectType = `${this.mainUrl}/project/getProjectType`;
  public getFinisedProjects = `${this.mainUrl}/project/getFinisedProjects`;
  public getActiveProjects = `${this.mainUrl}/project/getActiveProjects`;//done
  public saveProject = `${this.mainUrl}/project/saveProject`;//done
  public getProject = `${this.mainUrl}/project/getProject`;//done
  public getProjectById = `${this.mainUrl}/project/getProjectDetailsById`;//done
  public updateProjectById = `${this.mainUrl}/project/updateProject`;//done
  public deleteProjectById = `${this.mainUrl}/project/deleteProject`;//done
  public get_client_id = `${this.mainUrl}/user/getUserList`//done
  public get_handel_by = `${this.mainUrl}/teamMembers/getTeamMemberList`//done
  public updatedProjectStatus = `${this.mainUrl}/project/updateStatusOfProject`//done
  public addParticipant = `${this.mainUrl}/project/addParticipant `//done


  
//localhost:4005/client/getFileSharingForReview?project_id=659e5509f84ed35afef2413d
public getFileSharingForReview = `${this.mainUrl}/client/getFileSharingForReview`;

  public getTaskListOfActiveProject = `${this.mainUrl}/task/getTaskListOfActiveProject`;
  public saveTask = `${this.mainUrl}/task/createTask`;//done
  public getTask = `${this.mainUrl}/task/getTaskList`;//done
  public getTaskById = `${this.mainUrl}/task/getTaskDetailsById`;
  public updateTaskStatus = `${this.mainUrl}/task/updateTaskStatus`;//done
  public updateTaskById = `${this.mainUrl}/task/updateTask`;//done
  public AssignTask = `${this.mainUrl}/teamMembers/getTeamMemberListToAssignTask`;//done
  public deleteTaskById = `${this.mainUrl}/task/deleteTask`;

  public getTeamMemberListToAddParticipant = `${this.mainUrl}/teamMembers/getTeamMemberListToAddParticipant`;//done
  public saveTeamMember = `${this.mainUrl}/teamMembers/teamMemberRegistration`;//done
  public getTeamMember = `${this.mainUrl}/teamMembers/getTeamMemberList`;//done
  public getTeamMemberById = `${this.mainUrl}/getTeamMemberById`;
  public getTeamMemberProjects = `${this.mainUrl}/teamMember/getTeamMemberProjects`;
  public updateTeamMemberById = `${this.mainUrl}/updateTeamMemberById`;
  public deleteTeamMemberById = `${this.mainUrl}/deleteTeamMemberById`;

public addCreativeAssets = `${this.mainUrl}/client/addCreativeAssets`;
public getAllCreativeAssetsOfClient = `${this.mainUrl}/client/getAllCreativeAssetsOfClient`;
public getAllCreativeAssets = `${this.mainUrl}/client/getAllCreativeAssets`;
public getCreativeAssetsOfMember = `${this.mainUrl}/creativeAssests/getCreativeAssetsOfMember`;

  public saveWorkStatus = `${this.mainUrl}/saveWorkStatus`;
  public getClientProjectList = `${this.mainUrl}/user/getClientProjectList`;
  // public getClientProject = `${this.mainUrl}/user/getClientProject`;
  public getWorkStatusById = `${this.mainUrl}/getWorkStatusById`;
  public updateWorkStatusById = `${this.mainUrl}/updateWorkStatusById`;
  public deleteWorkStatusById = `${this.mainUrl}/deleteWorkStatusById`;
  public saveCientRequirement = `${this.mainUrl}/client/saveCientRequirement`
  public bookTimeForMeeting = `${this.mainUrl}/client/bookTimeForMeeting`


  public cAGetAllCreativeAssets = `${this.mainUrl}/creativeAssests/getAllCreativeAssets`;
  public assignCreativeAssetsToTeamMember = `${this.mainUrl}/creativeAssests/assignCreativeAssetsToTeamMember`;

  public addClient = `${this.mainUrl}/client/addClient`;//done
  public saveFileSharing = `${this.mainUrl}/file/fileSharingByAdmin`;//done
  public getFileSharing = `${this.mainUrl}/file/getFileSharingListUploadedByAdmin`;//done
  public shareReviewForFiles = `${this.mainUrl}/client/shareReviewForFiles`;//done
  // public getClientProjectList = `${this.mainUrl}/user/getClientProjectList`;//done
 
  public project_secret_key = this.secretKeys.project_secret_key

}

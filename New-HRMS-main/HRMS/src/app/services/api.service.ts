import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = 'http://192.168.1.11:9191/';


  public login = `${this.apiUrl}login`;
  public forgetPassword = `${this.apiUrl}forgot-password`;
  public currentPhoto = `${this.apiUrl}photo/current`;
  public signOut = `${this.apiUrl}signout`;
  public uploadPdfUrl = `${this.apiUrl}upload-pdf`;
  public EmpListExcel = `${this.apiUrl}employeeslist/excel`;
  public EmpLeaveExcel = `${this.apiUrl}leavelist/excel`;
  public EmpAttExcel = `${this.apiUrl}attendancelist/excel`;
  public EmpWfhExcel = `${this.apiUrl}workfromhomelist/excel`;
  public teamLeave = `${this.apiUrl}leaves`;
  public teamWfh = `${this.apiUrl}work`;
  public changePassword = `${this.apiUrl}change-password`;
  public ApproveLeave = `${this.apiUrl}leaves`;
  public RejectLeave = `${this.apiUrl}leaves`;
  public ApproveWfh = `${this.apiUrl}wfh`;
  public RejectWfh = `${this.apiUrl}wfh`;
  public DeleteEmp = `${this.apiUrl}delete`;
  public Role = `${this.apiUrl}role`;
  public Empdetail = `${this.apiUrl}employeemail`;
  public EmpNameShow = `${this.apiUrl}show`;
  public TeamLeadShow = `${this.apiUrl}names`;
  public designationShow = `${this.apiUrl}designation`;
  public departmentShow = `${this.apiUrl}departments`;
  public RoleShow = `${this.apiUrl}getAllRole`;
  public RoleWithPermission = `${this.apiUrl}getRoleWithPermission`;
  public Registration = `${this.apiUrl}signup`;
  public Userdatashow = `${this.apiUrl}findAll`;
  public UpdateEmp = `${this.apiUrl}pass`;
  public ApplyLeave = `${this.apiUrl}leave`;
  public ViewLeave = `${this.apiUrl}oneleave`;
  public ViewAllLeave = `${this.apiUrl}lea`;
  public CheckIn = `${this.apiUrl}checkin`;
  public CheckOut = `${this.apiUrl}checkout`;
  public EmpAtt = `${this.apiUrl}attend`;
  public ViewAllAtt = `${this.apiUrl}attendancelist`;
  public ApplyWfh = `${this.apiUrl}wfh`;
  public ViewWfh = `${this.apiUrl}onewfh`;
  public ViewAllWfh = `${this.apiUrl}showwfhAdmin`;
  public ViewEmpList = `${this.apiUrl}registerlist`;
  public EditProfile = `${this.apiUrl}edituser`;
  public personalDetailsUpdate = `${this.apiUrl}oneuserpersonalDetailes`;
  public USerBasicInfo = `${this.apiUrl}findUSerAdditionalInfo`;
  public DeletepersonalDetails = `${this.apiUrl}deleteMydetail`;
  public uploadPhoto = `${this.apiUrl}upload-photo`;



 


  constructor(private http: HttpClient) { }

}

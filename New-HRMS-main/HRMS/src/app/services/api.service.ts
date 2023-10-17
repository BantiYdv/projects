import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = 'https://hrms.prilient.com/';
  // public apiUrl = 'http://192.168.1.11:9191/';

  public login = `${this.apiUrl}gateway/login`;
  public forgetPassword = `${this.apiUrl}gateway/hrms/forgot-password`;
  public currentPhoto = `${this.apiUrl}gateway/hrms/photo/current`;
  public signOut = `${this.apiUrl}gateway/hrms/signout`;
  public uploadPdfUrl = `${this.apiUrl}gateway/hrms/upload-pdf`;
  public DownloadPdf = `${this.apiUrl}gateway/hrms/download`;
  public EmpListExcel = `${this.apiUrl}gateway/hrms/employeeslist/excel`;
  public EmpLeaveExcel = `${this.apiUrl}gateway/hrms/leavelist/excel`;
  public EmpAttExcel = `${this.apiUrl}gateway/hrms/attendancelist/excel`;
  public EmpWfhExcel = `${this.apiUrl}gateway/hrms/workfromhomelist/excel`;
  public teamLeave = `${this.apiUrl}gateway/hrms/leaves`;
  public teamWfh = `${this.apiUrl}gateway/hrms/work`;
  public changePassword = `${this.apiUrl}gateway/hrms/change-password`;
  public ApproveLeave = `${this.apiUrl}gateway/hrms/leaves`;
  public RejectLeave = `${this.apiUrl}gateway/hrms/leaves`;
  public ApproveWfh = `${this.apiUrl}gateway/hrms/wfh`;
  public RejectWfh = `${this.apiUrl}gateway/hrms/wfh`;
  public DeleteEmp = `${this.apiUrl}gateway/hrms/delete`;
  public Role = `${this.apiUrl}gateway/hrms/role`;
  public AddPermission = `${this.apiUrl}gateway/hrms/role`;
  public RemovePermission = `${this.apiUrl}gateway/hrms/role`;
  public DeleteRole = `${this.apiUrl}gateway/hrms/role`;
  public Empdetail = `${this.apiUrl}gateway/hrms/employeemail`;
  public EmpNameShow = `${this.apiUrl}gateway/hrms/show`;
  public TeamLeadShow = `${this.apiUrl}gateway/hrms/names`;
  public designationShow = `${this.apiUrl}gateway/hrms/designation`;
  public departmentShow = `${this.apiUrl}gateway/hrms/departments`;
  public RoleShow = `${this.apiUrl}gateway/hrms/getAllRole`;
  public RoleWithPermission = `${this.apiUrl}gateway/hrms/getRoleWithPermission`;
  public Registration = `${this.apiUrl}gateway/hrms/signup`;
  public Userdatashow = `${this.apiUrl}gateway/hrms/findAll`;
  public UpdateEmp = `${this.apiUrl}gateway/hrms/pass`;
  public ApplyLeave = `${this.apiUrl}gateway/hrms/leave`;
  public ViewLeave = `${this.apiUrl}gateway/hrms/oneleave`;
  public ViewAllLeave = `${this.apiUrl}gateway/hrms/lea`;
  public CheckIn = `${this.apiUrl}gateway/hrms/checkin`;
  public CheckOut = `${this.apiUrl}gateway/hrms/checkout`;
  public EmpAtt = `${this.apiUrl}gateway/hrms/attend`;
  public ViewAllAtt = `${this.apiUrl}gateway/hrms/attendancelist`;
  public ApplyWfh = `${this.apiUrl}gateway/hrms/wfh`;
  public ViewWfh = `${this.apiUrl}gateway/hrms/onewfh`;
  public ViewAllWfh = `${this.apiUrl}gateway/hrms/showwfhAdmin`;
  public ViewEmpList = `${this.apiUrl}gateway/hrms/registerlist`;
  public EditProfile = `${this.apiUrl}gateway/hrms/edituser`;
  public personalDetailsUpdate = `${this.apiUrl}gateway/hrms/oneuserpersonalDetailes`;
  public USerBasicInfo = `${this.apiUrl}gateway/hrms/findUSerAdditionalInfo`;
  public DeletepersonalDetails = `${this.apiUrl}gateway/hrms/deleteMydetail`;
  public uploadPhoto = `${this.apiUrl}gateway/hrms/upload-photo`;


  constructor(private http: HttpClient) { }

}

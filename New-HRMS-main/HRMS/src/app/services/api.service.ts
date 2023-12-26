import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = 'https://hrms.prilient.com/';
  // public apiUrl = 'http://192.168.1.17:9191/';
  

  public login = `${this.apiUrl}gateway/login`;
  public forgetPassword = `${this.apiUrl}gateway/hrms/forgot-password`;
  public currentPhoto = `${this.apiUrl}gateway/hrms/photo/current`;
  public signOut = `${this.apiUrl}gateway/hrms/logout`;
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
  // public Empdetail = `${this.apiUrl}gateway/hrms/employeemail`;
  public EmpNameShow = `${this.apiUrl}gateway/hrms/show`;
  public TeamLeadShow = `${this.apiUrl}gateway/hrms/names`;
  public designationShow = `${this.apiUrl}gateway/hrms/designation`;
  public departmentShow = `${this.apiUrl}gateway/hrms/departments`;
  public RoleShow = `${this.apiUrl}gateway/hrms/getAllRole`;
  public RoleWithPermission = `${this.apiUrl}gateway/hrms/getRoleWithPermission`;
  public Registration = `${this.apiUrl}gateway/hrms/signup`;
  public uploadDocsUrl = `${this.apiUrl}gateway/hrms/addPersonalDocument`;
  public AllDocsUrl = `${this.apiUrl}gateway/hrms/downloadZip`;
  // public DownloadDocs = `${this.apiUrl}gateway/hrms/downloadPersonalDocument1`;
  public Docs = `${this.apiUrl}gateway/hrms/downloadFile`;
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
  public shift = `${this.apiUrl}gateway/hrms/addShiftTiming`;
  public wfhCount = `${this.apiUrl}gateway/hrms/count-workFromHome`;
  public presentCount = `${this.apiUrl}gateway/hrms/present-employees-count`;
  public absentCount = `${this.apiUrl}gateway/hrms/total-absent-employees`;
  public casualCount = `${this.apiUrl}gateway/hrms/casual-leave-count`;
  public sickCount = `${this.apiUrl}gateway/hrms/sick-leave-count`;
  public totalEmpCount = `${this.apiUrl}gateway/hrms/total-employees`;
  public fullTime = `${this.apiUrl}gateway/hrms/full-time-count`;
  public partTime = `${this.apiUrl}gateway/hrms/part-time-count`;
  public internTime = `${this.apiUrl}gateway/hrms/intern-time-count`;
  public updateEmpAtt = `${this.apiUrl}gateway/hrms/update-employee-attendance`;
  public addPosition = `${this.apiUrl}gateway/onboard/addPosition`;
  public viewPosition = `${this.apiUrl}gateway/onboard/getAllPositions`;
  public viewPositionById = `${this.apiUrl}gateway/onboard/getPositionById`;
  public updatePositionById = `${this.apiUrl}gateway/onboard/updatePositionById`;

  

  constructor(private http: HttpClient) { }

}

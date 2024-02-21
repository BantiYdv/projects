import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public apiUrl = 'https://hrms.prilient.com/';
  public apiUrl = 'http://192.168.1.5:9191/';
  

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
  public teamLeave = `${this.apiUrl}gateway/hrms/showLeavesTeamLead`;
  public teamWfh = `${this.apiUrl}gateway/hrms/work`;
  public changePassword = `${this.apiUrl}gateway/hrms/change-password`;
  public ApproveLeave = `${this.apiUrl}gateway/hrms/approveAndRejectLeave`;
  public RejectLeave = `${this.apiUrl}gateway/hrms/approveAndRejectLeave`;
  public ApproveWfh = `${this.apiUrl}gateway/hrms/approveAndRejectWorkFromHome`;
  public RejectWfh = `${this.apiUrl}gateway/hrms/approveAndRejectWorkFromHome`;
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
  public ApplyLeave = `${this.apiUrl}gateway/hrms/applyLeave`;
  public ViewLeave = `${this.apiUrl}gateway/hrms/getLeavesOfLoggedInUser`;
  public ViewAllLeave = `${this.apiUrl}gateway/hrms/findAllLeave`;
  public CheckIn = `${this.apiUrl}gateway/hrms/checkin`;
  public CheckOut = `${this.apiUrl}gateway/hrms/checkout`;
  public EmpAtt = `${this.apiUrl}gateway/hrms/loggedInUserAttendance`;
  public ViewAllAtt = `${this.apiUrl}gateway/hrms/AllEmployeesAttendanceList`;
  public ApplyWfh = `${this.apiUrl}gateway/hrms/applyWorkFromHome`;
  public ViewWfh = `${this.apiUrl}gateway/hrms/findWorkFromHomeOfLoggedInUser`;
  public ViewAllWfh = `${this.apiUrl}gateway/hrms/getAllWorkFromHome`;
  public ViewEmpList = `${this.apiUrl}gateway/hrms/registerlist`;
  public EditProfile = `${this.apiUrl}gateway/hrms/edituser`;
  public personalDetailsUpdate = `${this.apiUrl}gateway/hrms/oneuserpersonalDetailes`;
  public USerBasicInfo = `${this.apiUrl}gateway/hrms/findUSerAdditionalInfo`;
  public DeletepersonalDetails = `${this.apiUrl}gateway/hrms/deleteMydetail`;
  public uploadPhoto = `${this.apiUrl}gateway/hrms/upload-photo`;
  // public shift = `${this.apiUrl}gateway/hrms/addShiftTiming`;
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
  public addShiftTime = `${this.apiUrl}gateway/hrms/saveShiftTime`;
  public viewShiftTime = `${this.apiUrl}gateway/hrms/findAllShifts`;
  public viewAllShiftTimeDetails = `${this.apiUrl}gateway/hrms/findAllShiftDetails`;
  public updateShiftTime = `${this.apiUrl}gateway/hrms/updateShiftTime`;
  public viewTodayPresent = `${this.apiUrl}gateway/hrms/findUsersCheckedInToday`;
  // public viewTodayWfh = `${this.apiUrl}gateway/hrms/WorkFromHomeUserToday`;
  public viewTodayWfh = `${this.apiUrl}gateway/hrms/UserOnWorkFromHomeToday`;
  // public viewTodaySickLeave = `${this.apiUrl}gateway/hrms/userOnSickLeaveToday`;
  public viewTodaySickLeave = `${this.apiUrl}gateway/hrms/EmployeesOnSickLeaveToday`;
  // public viewTodayCasualLeave = `${this.apiUrl}gateway/hrms/userOnCasualLeaveToday`;
  public viewTodayCasualLeave = `${this.apiUrl}gateway/hrms/EmployeesOnCasualLeaveToday`;
  // public viewTodayAbsentLeave = `${this.apiUrl}gateway/hrms/total-absent`;
  public viewTodayAbsentLeave = `${this.apiUrl}gateway/hrms/total-absent-employees-on-leave`;
  public viewFullTimeEmp = `${this.apiUrl}gateway/hrms/full-time-employees`;
  public viewPartTimeEmp = `${this.apiUrl}gateway/hrms/part-time-Employee`;
  public viewInternEmp = `${this.apiUrl}gateway/hrms/intern-time-Employee`;
  public totalLeaveUser = `${this.apiUrl}gateway/hrms/totalLeaveOfUser`;
  public LeaveTakenByUser = `${this.apiUrl}gateway/hrms/totalLeaveTakenByUser`;
  public remainingLeaveUser = `${this.apiUrl}gateway/hrms/totalRemainingLeave`;
  public totalWfhUser = `${this.apiUrl}gateway/hrms/totalWorkFromHomeOfUser`;
  public WfhTakenByUser = `${this.apiUrl}gateway/hrms/workFromHomeTakenByUser`;
  public remainingWfhUser = `${this.apiUrl}gateway/hrms/remainingWorkFromHome`;
  public birthdays = `${this.apiUrl}gateway/hrms/birthdayTodayAndUpcomingBirthdays`;
  public uploadHolidayPdfUrl = `${this.apiUrl}gateway/hrms/uploadHolidayPdf`;
  public workingHours = `${this.apiUrl}gateway/hrms/totalWorkingHoursForCurrentDate`;
  public checkOutEarly = `${this.apiUrl}gateway/hrms/usersCheckedOutEarlyLast7Days`;
  public presentUsersLast7Days = `${this.apiUrl}gateway/hrms/presentUsersLast7Days`;
  public checkedInLate = `${this.apiUrl}gateway/hrms/usersCheckedInLateLast7Days`;
  public saveHoliday = `${this.apiUrl}gateway/hrms/saveHoliday`;
  public getHoliday = `${this.apiUrl}gateway/hrms/getHoliday`;
  public deleteHoliday = `${this.apiUrl}gateway/hrms/deleteHoliday`;
  public updateHoliday = `${this.apiUrl}gateway/hrms/updateHoliday`;
  public TodayAndUpcomingHolidays = `${this.apiUrl}gateway/hrms/HolidayTodayAndUpcomingHolidays`;
  public deleteDocument = `${this.apiUrl}gateway/hrms/deleteDocument`;
  public notCheckedInUsersCount = `${this.apiUrl}gateway/hrms/not-checkedIn-users-count`;
  public viewNotCheckedInUsers = `${this.apiUrl}gateway/hrms/not-checkedIn-users`;
  public deleteShiftTime = `${this.apiUrl}gateway/hrms/deleteShiftTime`;
  public RemainingLeaveShowToAdmin = `${this.apiUrl}gateway/hrms/totalRemainingLeaveOfUserBy`;
  public LeaveTakenShowToAdmin = `${this.apiUrl}gateway/hrms/totalLeaveTakenByUserWith`;
  public addBirthDay = `${this.apiUrl}gateway/hrms/addBirthDay`;
  public getAllBirthDay = `${this.apiUrl}gateway/hrms/getAllBirthDay`;
  public updateBirthDay = `${this.apiUrl}gateway/hrms/updateBirthDay`;
  public birthDayDelete = `${this.apiUrl}gateway/hrms/birthDayDeleteBy`;
  public deleteAllBirthDays = `${this.apiUrl}gateway/hrms/deleteAllBirthDays`;
  public updateMyLeave = `${this.apiUrl}gateway/hrms/updateMyLeave`;
  public updateMyWFH = `${this.apiUrl}gateway/hrms/updateMyWorkFromHome`;
  public getLeavePolicy = `${this.apiUrl}gateway/hrms/getLeavePolicy`;
  public deActiveAndActiveUser = `${this.apiUrl}gateway/hrms/deActiveAndActiveUser`;
  public showUserDataToTeamLead = `${this.apiUrl}gateway/hrms/showUserDataToTeamLead`;
  public showTeamData = `${this.apiUrl}gateway/hrms/showTeamData`;




  public addPosition = `${this.apiUrl}gateway/onboard/addPosition`;
  public viewPosition = `${this.apiUrl}gateway/onboard/getAllPositions`;
  public viewPositionById = `${this.apiUrl}gateway/onboard/getPositionById`;
  public updatePositionById = `${this.apiUrl}gateway/onboard/updatePositionById`;
  public deletePositionById = `${this.apiUrl}gateway/onboard/deletePositionById`;
  public addInterview = `${this.apiUrl}gateway/onboard/addInterview`;
  public PositionName = `${this.apiUrl}gateway/onboard/PositionName`;
  public updatePositionStatus = `${this.apiUrl}gateway/onboard/update`;
  public getCandidateInterview = `${this.apiUrl}gateway/onboard/getCandidate?positionName=`;
  public downloadCandidateCV = `${this.apiUrl}gateway/onboard/downloadResume`;
  public sendMail = `${this.apiUrl}gateway/onboard/send-confirmation-mail`;
  public updateConfirmationStatus = `${this.apiUrl}gateway/onboard/updateConfirmationStatus`;
  public findCandidate = `${this.apiUrl}gateway/onboard/findCandidateBy`;
  public deleteCandidateInterview = `${this.apiUrl}gateway/onboard/deleteInterview`;
  public updateInterview = `${this.apiUrl}gateway/onboard/updateInterview`;
  public noticePeriod = `${this.apiUrl}gateway/onboard/addNoOfDays`;
  public addLeaveRule = `${this.apiUrl}gateway/onboard/addLeaveRule`;
  public addPayroll = `${this.apiUrl}gateway/onboard/addPayroll`;
  public viewPayroll = `${this.apiUrl}gateway/onboard/getAllPayroll`;
  public downloadSalaryPayroll = `${this.apiUrl}gateway/onboard/salarySheetList/excel`;
  public generateSalarySlip = `${this.apiUrl}gateway/onboard/generateSalarySlip`;
  public updateSalary = `${this.apiUrl}gateway/onboard/updateSalarySlip`;
  public deleteAddedSalary = `${this.apiUrl}gateway/onboard/deleteAddedSalary`;
  public generateOfferLetter = `${this.apiUrl}gateway/onboard/generate-offer-letter`;
  public addAppraisal = `${this.apiUrl}gateway/onboard/addAppraisal`;
  public saveRating = `${this.apiUrl}gateway/onboard/saveRating`;
  public saveProbation = `${this.apiUrl}gateway/onboard/saveProbation`;
  public savePromotion = `${this.apiUrl}gateway/onboard/savePromotion`;
  public saveDemotion = `${this.apiUrl}gateway/onboard/saveDemotion`;
  public savePIP = `${this.apiUrl}gateway/onboard/savePIP`;
  public appraisalList = `${this.apiUrl}gateway/onboard/listAppraisal`;
  public promotionList = `${this.apiUrl}gateway/onboard/listPromotion`;
  public demotionList = `${this.apiUrl}gateway/onboard/listDemotion`;
  public getAllPIP = `${this.apiUrl}gateway/onboard/getAllPIP`;
  // public probationList = `${this.apiUrl}gateway/onboard/listProbation`;

  

  constructor(private http: HttpClient) { }

}

// Angular CLI: 16.0.1
// Node: 18.15.0
// Package Manager: npm 9.5.0
// OS: win32 x64
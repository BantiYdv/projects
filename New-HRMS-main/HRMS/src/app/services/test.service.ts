import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient,private router: Router, private api: ApiService) { }

// view employee list start
getEmployeeList() {
  const url = `${this.api.ViewEmpList}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view employee list end

// team leave start
getTeamLeaveData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);

  return this.http.get(this.api.teamLeave, { headers });
}
// team leave end

//Approve leave start
approveLeave(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const requestBody = {
    approval: 'Approved'
  };
  const url = `${this.api.ApproveLeave}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Approve leave end

//Reject leave start
rejectLeave(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const requestBody = {
    approval: 'Rejected'
  };
  const url = `${this.api.RejectLeave}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Reject leave end

// team wfh start
getTeamWfhData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);

  return this.http.get(this.api.teamWfh, { headers });
}
// team wfh end

//Approve wfh start
approveWfh(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const requestBody = {
    approval: 'Approved'
  };
  const url = `${this.api.ApproveWfh}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Approve wfh end

//Reject wfh start
rejectWfh(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const requestBody = {
    approval: 'Rejected'
  };
  const url = `${this.api.RejectWfh}/${id}`;
  return this.http.put(url, requestBody, { headers });
}
//Reject wfh end

// create role start
createRole(name: string, permissionNames: string[]): Observable<any> {
  const url = `${this.api.Role}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ` ${token}`
  });

  const payload = {
    name: name,
    permissionNames: permissionNames
  };

  return this.http.post(url, payload, { headers });
}
// create role end



// view role with permissions start 
ViewRolewithPermission(){
  const url = `${this.api.RoleWithPermission}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view role with permissions end

viewRole(id: number): Observable<any> {
  const url = `${this.api.RoleWithPermission}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}

// add permission start

AddPermissionName(id: number, permissionNames: string[]) {
  const url = `${this.api.AddPermission}/${id}/addPermission`; // Correct the URL
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const requestBody = {
    permissionNames: permissionNames
  };
  console.log("permission body", requestBody);
  console.log("permission name", permissionNames);
  return this.http.post(url, requestBody, { headers });
}

// add permission end

// Remove permission start removePermission
// RemovePermission(id: number): Observable<any> {
//   const url = `${this.api.RemovePermission}/removePermission/${id}`;
//     const token = localStorage.getItem('jwtToken');
//     const headers = new HttpHeaders().set('Authorization', ` ${token}`);
//     return this.http.post(url, { headers });
// }
// RemovePermission(id: number, selectedPermissions: string[]): Observable<any> {
//   const url = `${this.api.RemovePermission}/removePermission/${id}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
//   return this.http.post(url, { selectedPermissions }, { headers });
// }
RemovePermission(id: number, permissionNames: string[]): Observable<any> {
  const url = `${this.api.RemovePermission}/removePermission/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const requestBody = {
    permissionNames: permissionNames
  };
  console.log("remove permission body", requestBody);
  console.log("remove permission name", permissionNames);
  return this.http.post(url, requestBody, { headers });
}

// Remove permission end

// delete role start
deleteRole(id: number): Observable<any> {
  const url = `${this.api.DeleteRole}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.delete(url, { headers });
}
// delete role end


// download employee list in excel start
getEmployeeListExcel(headers: HttpHeaders): Observable<HttpResponse<Blob>> {
  return this.http.get(this.api.EmpListExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
// download employee list in excel end

// download employee leave in excel start
getEmployeeLeaveExcel(employeeName: any): Observable<HttpResponse<Blob>> {
  const token = localStorage.getItem('jwtToken');

  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  if(employeeName){
    console.log("excel employee name", `${this.api.EmpLeaveExcel}?username=${employeeName}`)
    return this.http.get(`${this.api.EmpLeaveExcel}?username=${employeeName}`, {
      headers,
      responseType: 'blob',
      observe: 'response' // To access the full response with headers
    });
  }else{
    console.log("excel employee name error", employeeName)
    return this.http.get(this.api.EmpLeaveExcel, {
      headers,
      responseType: 'blob',
      observe: 'response' // To access the full response with headers
    });
  }
 
}
// download employee leave in excel end

// download employee Att in excel start
getEmployeeAttExcel(employeeName: any): Observable<HttpResponse<Blob>> {
  const token = localStorage.getItem('jwtToken');

  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  if(employeeName){
    console.log("excel employee name", `${this.api.EmpAttExcel}?username=${employeeName}`)
    return this.http.get(`${this.api.EmpAttExcel}?username=${employeeName}`, {
      headers,
      responseType: 'blob',
      observe: 'response' // To access the full response with headers
    });
  }else{
  return this.http.get(this.api.EmpAttExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
}
// download employee Att in excel end

// download employee WFH in excel start
getEmployeeWfhExcel(employeeName: any): Observable<HttpResponse<Blob>> {
  const token = localStorage.getItem('jwtToken');

  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  if(employeeName){
    console.log("excel employee name", `${this.api.EmpWfhExcel}?username=${employeeName}`)
    return this.http.get(`${this.api.EmpWfhExcel}?username=${employeeName}`, {
      headers,
      responseType: 'blob',
      observe: 'response' // To access the full response with headers
    });
  }else{
  return this.http.get(this.api.EmpWfhExcel, {
    headers,
    responseType: 'blob',
    observe: 'response' // To access the full response with headers
  });
}
}
// download employee WFH in excel end

// apply leave start
applyLeave(formData: any) {
  const url = `${this.api.ApplyLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.post(url, formData, { headers });
}
// apply leave end

// view leave start
getViewLeave() {
  const url = `${this.api.ViewLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view leave end

// view att start
getAttendance() {
  const url = `${this.api.EmpAtt}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view att end

// apply wfh start
applyWfh(formData: any) {
  const url = `${this.api.ApplyWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.post(url, formData, { headers });
}
// apply wfh end

// view wfh start
getWfhData() {
  const url = `${this.api.ViewWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view wfh end

// view all att start
getAllAttendance() {
  const url = `${this.api.ViewAllAtt}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view all att end

// view all wfh start
getAllWfhData() {
  const url = `${this.api.ViewAllWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view all wfh end

// view all leave start
getAllLeave() {
  const url = `${this.api.ViewAllLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view all leave end



//Delete Employee start

deleteEmployee(id: number): Observable<any> {
  const url = `${this.api.DeleteEmp}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.delete(url, { headers });
}
//Delete Employee end


// // add shift time start
// AddShift(){
//   const url = `${this.api.shift}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // add shift time end

//Update Employee Attendance start
updateAtt(id: number, status: string): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 const data = {
status : status
 }
  const url = `${this.api.updateEmpAtt}/${id}`;
  return this.http.put(url, data, { headers });
}
//Update Employee Attendance end

// add position start
addPosition(position: any){

  const url = `${this.api.addPosition}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    type: position.positionName,
    numberOfPositions: position.numberOfPositions,
    candidateType: position.candidate_Type,
    budgetMin: position.annualPacAgeMin,
    budgetMax: position.annualPacAgeMax,
    currency: position.currency,
    modeOfWorking: position.modeOfWork,
    openingDate: position.dateOfOpening,
    experienceMin: position.experienceMin,
    experienceMax: position.experienceMax,
    experienceUnit: position.experienceUnit,
    jobLocation: position.jobLocation,
    jobDescription: position.jobDescription,
  };
  return this.http.post(url, data, { headers });
}
// add position end


// view position start
viewPosition(){

  const url = `${this.api.viewPosition}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 
  return this.http.get(url,  { headers });
}
// view position end

// view position by id start
viewPositionById(id: any){

  const url = `${this.api.viewPositionById}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 
  return this.http.get(url,  { headers });
}
// view position by id end

// update position start
updatePosition(position: any){

  const url = `${this.api.updatePositionById}/${position.id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    type: position.positionName,
    numberOfPositions: position.numberOfPositions,
    candidateType: position.candidate_Type,
    budgetMin: position.annualPacAgeMin,
    budgetMax: position.annualPacAgeMax,
    currency: position.currency,
    modeOfWorking: position.modeOfWork,
    openingDate: position.dateOfOpening,
    experienceMin: position.experienceMin,
    experienceMax: position.experienceMax,
    experienceUnit: position.experienceUnit,
    jobLocation: position.jobLocation,
    jobDescription: position.jobDescription,
  };
  return this.http.put(url, data, { headers });
}
// update position end

// delete position by id start
deletePositionById(id: any){

  const url = `${this.api.deletePositionById}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 
  return this.http.delete(url,  { headers });
}
// deletw position by id end

// add interview start
addInterview(interview: any, selectedFileName: any){

  const url = `${this.api.addInterview}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    nameOfInterviewee: interview.nameOfInterviewee,
    emailOfInterviewee: interview.emailOfInterviewee,
    resumeOfInterviewee: selectedFileName,
    countryCodeOfInterviewee: interview.countryCodeOfInterviewee,
    phoneNumberOfInterviewee: interview.phoneNumberOfInterviewee,
    interviewer: interview.interviewer,
    interviewerEmailId: interview.interviewerEmailId,
    positionName: interview.positionName,
    dateOfInterview: interview.dateOfInterview,
    timeOfInterview: interview.timeOfInterview,
    status: interview.status,
    referral: interview.referral,
    offerLetterStatus: interview.offerLetterStatus,
    subject: interview.subject,
    modeOfInterview: interview.modeOfInterview,
      addressOrLink: interview.addressOrLink
  };
  return this.http.post(url, data, { headers });
}
// add interview end

// view position name start
viewPositionName(){

  const url = `${this.api.PositionName}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 
  return this.http.get(url,  { headers });
}
// view position name end

// update position status start
updatePositionstatus(positionId: any, positionStatus: any){

  const url = `${this.api.updatePositionStatus}/${positionId}/close`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    closed: positionStatus,
  };
  return this.http.put(url,data,  { headers });
}
// update position status end

// get candidate interview position start
getCandidatePosition(positionName: any){

  const url = `${this.api.getCandidateInterview}${positionName}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 
  return this.http.get(url,  { headers });
}
// get candidate interview position end

// download candidate CV  start
downloadCandidateCV(id: any){

  const url = `${this.api.downloadCandidateCV}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 
  return this.http.get(url,  { headers, observe: 'response', responseType: 'blob'  });
}
// download candidate CV  end

// send mail start
sendMail(id: any, data: any){

  const url = `${this.api.sendMail}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const dataStatus = {
    interviewStatus: data,
  };
  return this.http.post(url, dataStatus, { headers });
}
// send mail end

// confirmation Status start
updateConfirmationStatus(confirmationId: any, confirmationStatus: any){
  const url = `${this.api.updateConfirmationStatus}/${confirmationId}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const dataStatus = {
    confirmation: confirmationStatus,
  };
  return this.http.put(url, dataStatus, { headers });
}
// confirmation Status end


// find candidate start
findCandidateById(id: any){
  const url = `${this.api.findCandidate}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url,  { headers });
}
// find candidate end

// delete candidate interview start
deleteCandidateInterviewById(id: any){
  const url = `${this.api.deleteCandidateInterview}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.delete(url,  { headers });
}
// delete candidate interview end

// update interview start
updateInterviewById(id: any, interview: any, selectedFileName: any){
  const url = `${this.api.updateInterview}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    nameOfInterviewee: interview.nameOfInterviewee,
    emailOfInterviewee: interview.emailOfInterviewee,
    resumeOfInterviewee: selectedFileName,
    phoneNumberOfInterviewee: interview.phoneNumberOfInterviewee,
    interviewer: interview.interviewer,
    interviewerEmailId: interview.interviewerEmailId,
    positionName: interview.positionName,
    dateOfInterview: interview.dateOfInterview,
    timeOfInterview: interview.timeOfInterview,
    status: interview.status,
    offerLetterStatus: interview.offerLetterStatus,
    subject: interview.subject,
    modeOfInterview: interview.modeOfInterview,
      addressOrLink: interview.addressOrLink
  };
  return this.http.put(url,data,  { headers });
}
// update interview end


// add shift time start
addShift(shiftTime: any){
  const url = `${this.api.addShiftTime}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
  //   shiftName: "Day Shift",
  // shiftTime: "15:30-15:40",
  // shiftDetails: {
  //   checkInGraceTime: "15:32",
  //   checkOutGraceTime: "15:38",
  //   halfDay: "15:35",
  //   absentCount: "15:33",
  //   present: "15:30",
  //   overtime: "15:31"
    
  checkInTime: shiftTime.checkInTime,
  checkOutTime: shiftTime.checkOutTime,
  shiftDetails: {
    checkInGraceTime: shiftTime.checkInGraceTime,
    checkOutGraceTime: shiftTime.checkOutGraceTime,
    halfDayHrs: shiftTime.halfDayHrs,
    absentHrs: shiftTime.absentHrs,
    presentHrs: shiftTime.presentHrs,
    overTimeHrs: shiftTime.overTimeHrs
  }
}
  return this.http.post(url, data, { headers });
}
// add shift time end

// view all shift time start
viewShiftDetails(){
  const url = `${this.api.viewAllShiftTimeDetails}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });
}
// view all shift time end

// update shift time start
updateShiftTime(shiftTime: any){
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 const data = {
  checkInTime: shiftTime.checkInTime,
  checkOutTime: shiftTime.checkOutTime,
  shiftDetails: {
    checkInGraceTime: shiftTime.shiftDetails.checkInGraceTime,
    checkOutGraceTime: shiftTime.shiftDetails.checkOutGraceTime,
    halfDay: shiftTime.shiftDetails.halfDay,
    absentCount: shiftTime.shiftDetails.absentCount,
    present: shiftTime.shiftDetails.present,
    overtime: shiftTime.shiftDetails.overtime
  }
 }
  const url = `${this.api.updateShiftTime}/${shiftTime.id}`;
  return this.http.put(url, data, { headers });
}
// update shift time end

// notice period start
noticePeriod(notice: number){
  const url = `${this.api.noticePeriod}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    noOfDays: notice,
  };
  return this.http.post(url, data, { headers });
}
// notice period end


// leave rule start
addLeaveRule(leaveRule: any){
  const url = `${this.api.addLeaveRule}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    sickLeaveCarryForward: leaveRule.sickLeaveCarryForward,
    sickLeaveEncashment: leaveRule.sickLeaveEncashment,
    sickLeaveExpire: leaveRule.sickLeaveExpire,
    casualLeaveCarryForward: leaveRule.casualLeaveCarryForward,
    casualLeaveEncashment: leaveRule.casualLeaveEncashment,
    casualLeaveExpire: leaveRule.casualLeaveExpire,
    allExpired: leaveRule.allExpired,
    addOther: leaveRule.addOther,
    monthOfUpdate: leaveRule.monthOfUpdate,
  };
  return this.http.post(url, data, { headers });
}
// leave rule end

// today present data start
getTodayPresent(){
  
    const url = `${this.api.viewTodayPresent}`;
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', ` ${token}`);
    
    return this.http.get(url, { headers });
  
}
// today present data end

// today wfh data start
getTodayWfh(){
  
  const url = `${this.api.viewTodayWfh}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// today wfh data end

// today sick leave data start
getTodaySick(){
  
  const url = `${this.api.viewTodaySickLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// today sick leave data end

// today casual leave data start
getTodayCasual(){
  
  const url = `${this.api.viewTodayCasualLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// today casual leave data end

// today Absent leave data start
getTodayAbsent(){
  
  const url = `${this.api.viewTodayAbsentLeave}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// today Absent leave data end



// today Full time employee data start
getFullTimeEmp(){
  
  const url = `${this.api.viewFullTimeEmp}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// today Full time employee data end

// part time employee data start
getPartTimeEmp(){
  
  const url = `${this.api.viewPartTimeEmp}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// part time employee data end

// intern employee data start
getinternEmp(){
  
  const url = `${this.api.viewInternEmp}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// intern employee data end

// upload pdf start
uploadHolidayPdf(file: File): void {
  const formData = new FormData();
  formData.append('HolidayFile', file, file.name);

  const token = localStorage.getItem('jwtToken'); // Replace with your authorization token logic
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);

  this.http.post(this.api.uploadHolidayPdfUrl, formData, { headers }).subscribe(
    () => {
      // File uploaded successfully
      this.showSuccessAlert('File uploaded successfully!');
    },
    (error) => {
      // Error uploading the file
      this.showErrorAlert('Error uploading the file');
      console.error('Error uploading the file:', error);
    }
  );
}

private showSuccessAlert(message: string): void {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });
}

private showErrorAlert(message: string): void {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
}
// upload pdf end


// save holiday start
saveHoliday(holiday: any){
  const url = `${this.api.saveHoliday}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    date: holiday.date,
    day: holiday.day,
    holiDayReason: holiday.holiDayReason
  };
  return this.http.post(url, data, { headers });
}
// save holiday end

// get holiday start

getHoliday(){
  const url = `${this.api.getHoliday}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// get holiday end

// delete Holiday start
deleteHoliday(id: number): Observable<any> {
  const url = `${this.api.deleteHoliday}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.delete(url, { headers });
}
// delete Holiday end

//Update holiday start
updateHoliday(holiday: any): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 const data = {
  date: holiday.date,
  day: holiday.day,
  holiDayReason: holiday.holiDayReason
 }
  const url = `${this.api.updateHoliday}/${holiday.id}`;
  return this.http.put(url, data, { headers });
}
//Update holiday end

//Delete shift time start

deleteShift(id: number): Observable<any> {
  const url = `${this.api.deleteShiftTime}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.delete(url, { headers });
}
//Delete shift time end

// add birthday start
addBirthDay(birthday: any){
  const url = `${this.api.addBirthDay}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  const data = {
    name: birthday.name,
    birthDayDate: birthday.birthDayDate,

  };
  return this.http.post(url, data, { headers });
}
// add birthday end

// get birthday start

getBirthday(){
  const url = `${this.api.getAllBirthDay}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// get birthday end

//Update birthday start
updateBirthday(birthday: any): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 const data = {
  name: birthday.name,
  birthDayDate: birthday.birthDayDate,
 
 }
  const url = `${this.api.updateBirthDay}/${birthday.id}`;
  return this.http.put(url, data, { headers });
}
//Update birthday end

// delete birthday start
deleteBirthday(id: number): Observable<any> {
  const url = `${this.api.birthDayDelete}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.delete(url, { headers });
}
// delete birthday end

// delete All birthday start
deleteAllBirthDays(): Observable<any> {
  const url = `${this.api.deleteAllBirthDays}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.delete(url, { headers });
}
// delete All birthday end

//Update my leave start
updateLeave(leave: any): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 const data = {
  leaveType: leave.leaveType,
  fromDate: leave.fromDate,
  toDate: leave.toDate,
  noOfDays: leave.noOfDays,
  reason: leave.reason,
 
 }
  const url = `${this.api.updateMyLeave}/${leave.id}`;
  return this.http.put(url, data, { headers });
}
//Update my leave end

//Update my wfh start
updateWFH(wfh: any): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
 const data = {
  fromdateWfh: wfh.fromdateWfh,
  toDateWfh: wfh.toDateWfh,
  noofday: wfh.noofday
 
 }
  const url = `${this.api.updateMyWFH}/${wfh.id}`;
  return this.http.put(url, data, { headers });
}
//Update my wfh end


// for view leavePolicy start
getLeavePolicy(id: number){
  const url = `${this.api.getLeavePolicy}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  return this.http.get(url, { headers });
}
// for view leavePolicy end

// for active profile start


deActiveAndActiveUser(id: any, activate: boolean) {
  const url = `${this.api.deActiveAndActiveUser}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders()
    .set('Authorization', `${token}`)  // No need to add extra spaces
    .set('Content-Type','application/json');
  return this.http.put(url, { activate }, { headers }); // Include HTTP method as PUT
}
// for active profile end


// for show team members start
showUserDataToTeamLead(){
  const url = `${this.api.showUserDataToTeamLead}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`).set('Content-Type','application/json');
  return this.http.get(url, { headers });
}
// for show team members end

// for show team members start
showTeamData(id:any){
  const url = `${this.api.showTeamData}/${id}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`).set('Content-Type','application/json');
  return this.http.get(url, { headers });
}
// for show team members end

// add payroll start
addPayroll(payroll: any){

  const url = `${this.api.addPayroll}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.post(url, payroll, { headers });
}
// add payroll end

// view all payroll start

viewPayroll(){
  const url = `${this.api.viewPayroll}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', ` ${token}`);
  
  return this.http.get(url, { headers });

}
// view all payroll end

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {  from, throwError } from 'rxjs';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // ipAddress:any;

  constructor(private http: HttpClient,private router: Router, private api: ApiService) {
    // this.http.get<{ip:string}>('https://httpbin.org/ip')
    // .subscribe( data => {
    //   console.log('th data', data);
    //   this.ipAddress = data
    // })
  
   }


  browserName: string | undefined;


  // show profile name in top start
getShowData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.api.EmpNameShow}`, { headers });
}
// show profile name in top end

// // apply leave start
// applyLeave(formData: any) {
//   const url = `${this.api.ApplyLeave}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.post(url, formData, { headers });
// }
// // apply leave end

// // view leave start
// getViewLeave() {
//   const url = `${this.api.ViewLeave}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view leave end

// // view all leave start
// getAllLeave() {
//   const url = `${this.api.ViewAllLeave}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view all leave end

// check in start
// performCheckin() {
//   const url = `${this.api.CheckIn}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const requestData = {
//     checkedIn: 'checkedIn' // Remove the curly braces
//   };
  
//   return this.http.post(url, requestData, { headers });
// }


private userAgent: any ;
private deviceIpAddress: string | any ;

//   performCheckin() {
//     this.http.get("https://httpbin.org/ip").subscribe((res:any)=>{
    
//       this.ipAddress = res.origin;
//     })
//     const url = `${this.api.CheckIn}`;
//     const token = localStorage.getItem('jwtToken');

//     // Determine the browser name
//     this.currentBrowser = this.getBrowserName();
// console.log("current browser", this.currentBrowser);


//     const headers = new HttpHeaders()
//       .set('Authorization', `Bearer ${token}`);

//     const requestData = {
//       checkedIn: 'checkedIn',
//       browser: this.currentBrowser,  // Include browser name in the request payload if needed
//       ipAddress: this.ipAddress
//     };
//     console.log("browser name", this.currentBrowser);
//     console.log("req data", requestData);

//     return this.http.post(url, requestData, { headers });
//   }
performCheckin() {
  return this.http.get("https://httpbin.org/ip").pipe(
    switchMap((res: any) => {
      this.deviceIpAddress = res.origin;

      const url = `${this.api.CheckIn}`;
      const token = localStorage.getItem('jwtToken');

      // Determine the browser name
      this.userAgent = this.getBrowserName();
      console.log("current browser", this.userAgent);

      // Determine the OS details
      const osDetails = this.getOSDetails();
      console.log("OS details", osDetails);

       // Determine the device type
       const deviceType = this.getDeviceType();
       console.log("Device type", deviceType);

      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

      const requestData = {
        checkedIn: 'checkedIn',
        userAgent: this.userAgent,
        deviceIpAddress: this.deviceIpAddress,
        osName: osDetails.osName,
        osVersion: osDetails.osVersion,
        cpuArch: osDetails.cpuArch,
        systemName: osDetails.systemName,
        deviceType: deviceType
      };
      console.log("browser name", this.userAgent);
      console.log("req data", requestData);

      return this.http.post(url, requestData, { headers });
    })
  );
}

// Helper function to get OS details
getOSDetails() {
  const userAgent = window.navigator.userAgent;
  let osName = 'Unknown';
  let osVersion = 'Unknown';
  let cpuArch = 'Unknown';
  let systemName = 'Unknown';

  if (userAgent.indexOf("Win") != -1) {
    osName = "Windows";
    if (userAgent.indexOf("Windows NT 5.0") != -1) osVersion = "2000";
    else if (userAgent.indexOf("Windows NT 5.1") != -1) osVersion = "XP";
    else if (userAgent.indexOf("Windows NT 6.0") != -1) osVersion = "Vista";
    else if (userAgent.indexOf("Windows NT 6.1") != -1) osVersion = "7";
    else if (userAgent.indexOf("Windows NT 6.2") != -1) osVersion = "8";
    else if (userAgent.indexOf("Windows NT 10.0") != -1) osVersion = "10";
  } else if (userAgent.indexOf("Mac") != -1) {
    osName = "MacOS";
    osVersion = this.getMacOSVersion(userAgent);
  } else if (userAgent.indexOf("Linux") != -1) {
    osName = "Linux";
  }

 
  // Determine the CPU architecture
  const platform = navigator.platform;
  const is64Bit = userAgent.includes("Win64") || userAgent.includes("x64") || userAgent.includes("x86_64") || userAgent.includes("WOW64");
  cpuArch = is64Bit ? "64-bit" : "32-bit";

  if (platform) {
    systemName = platform;
  }

  return { osName, osVersion, cpuArch, systemName };
}

// Helper function to get MacOS version
getMacOSVersion(userAgent: string) {
  const match = userAgent.match(/Mac OS X (\d+(_\d+)*)/);
  return match ? match[1].replace(/_/g, '.') : 'Unknown';
}


// Helper function to get device type
getDeviceType() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth < 600) {
    return 'Mobile';
  } else if (screenWidth >= 600 && screenWidth < 992) {
    return 'Tablet';
  } else if (screenWidth >= 992 && screenWidth < 1200) {
    return 'Small Laptop';
  } else {
    return 'Desktop/Large Laptop';
  }
}


  public getBrowserName() {
   
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edg') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
}
  
  
  

  // Add a method to retrieve the stored browser name
  getStoredBrowserName(): string {
    return this.userAgent || 'Unknown';
  }

  

// for gettting IP Address start
// public getPublicIpAddress() {
//   this.http.get("https://httpbin.org/ip").subscribe((res:any)=>{

//   this.deviceIpAddress = res.origin;
//   console.log("ip",this.deviceIpAddress)
//   return this.deviceIpAddress
// });
// }
// for gettting IP Address end




// check in end

//check out start
performCheckout() {
  const url = `${this.api.CheckOut}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const requestData = {
    checkedOut: 'checkedOut'
  };
  
  return this.http.post(url, requestData, { headers });
}
// check out end

// // view att start
// getAttendance() {
//   const url = `${this.api.EmpAtt}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view att end

// // view all att start
// getAllAttendance() {
//   const url = `${this.api.ViewAllAtt}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view all att end

// // apply wfh start
// applyWfh(formData: any) {
//   const url = `${this.api.ApplyWfh}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.post(url, formData, { headers });
// }
// // apply wfh end

// // view wfh start
// getWfhData() {
//   const url = `${this.api.ViewWfh}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view wfh end

// // view all wfh start
// getAllWfhData() {
//   const url = `${this.api.ViewAllWfh}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view all wfh end

// // view employee list start
// getEmployeeList() {
//   const url = `${this.api.ViewEmpList}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
// // view employee list end

// edit user profile start
editUserProfile(requestBody: any) {
  const url = `${this.api.EditProfile}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.put(url, requestBody, { headers });
}
// edit user profile end

// download leave policy pdf start

DownloadLeavePolicy(): Observable<HttpResponse<Blob>> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.api.DownloadPdf}`;
  return this.http.get(url, {
    headers,
    observe: 'response', // This ensures you get the full HTTP response
    responseType: 'blob', // This tells Angular to expect a binary response
  });
}
// download leave policy pdf end

// // download leave policy pdf start

// DownloadDocs(id: number): Observable<HttpResponse<Blob>> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const url = `${this.api.DownloadDocs}/${id}`;
//   return this.http.get(url, {
//     headers,
//     observe: 'response', // This ensures you get the full HTTP response
//     responseType: 'blob', // This tells Angular to expect a binary response
//   });
// }
// // download leave policy pdf end

// total leave of user start
totalLeaveUser(){
  
  const url = `${this.api.totalLeaveUser}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });

}
// total leave of user end

// total leave taken by user start
leaveTakenUser(){
  
  const url = `${this.api.LeaveTakenByUser}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });

}
// total leave taken by user end

// remaining leave of user start
remainingLeaveUser(){
  
  const url = `${this.api.remainingLeaveUser}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });

}
// remaining leave of user end


// total wfh of user start
totalWfhUser(){
  
  const url = `${this.api.totalWfhUser}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });

}
// total wfh of user end

// total wfh taken by user start
// wfhTakenUser(){
  
//   const url = `${this.api.WfhTakenByUser}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });

// }
// total wfh taken by user end

// remaining wfh of user start
remainingWfhUser(){
  
  const url = `${this.api.remainingWfhUser}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get(url, { headers });

}
// remaining wfh of user end

// birthday start
// birthday(){
  
//   const url = `${this.api.birthdays}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });

// }
// birthday end

}

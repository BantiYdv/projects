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


private currentBrowser: any ;
private ipAddress: string | any ;

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
      this.ipAddress = res.origin;

      const url = `${this.api.CheckIn}`;
      const token = localStorage.getItem('jwtToken');

      // Determine the browser name
      this.currentBrowser = this.getBrowserName();
      console.log("current browser", this.currentBrowser);

      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

      const requestData = {
        checkedIn: 'checkedIn',
        browser: this.currentBrowser,
        ipAddress: this.ipAddress
      };
      console.log("browser name", this.currentBrowser);
      console.log("req data", requestData);

      return this.http.post(url, requestData, { headers });
    })
  );
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
    return this.currentBrowser || 'Unknown';
  }

  


public getPublicIpAddress() {
  this.http.get("https://httpbin.org/ip").subscribe((res:any)=>{

  this.ipAddress = res.origin;
  console.log("ip",this.ipAddress)
  return this.ipAddress
});
}

// getBrowserName(): string {
//   const agent = window.navigator.userAgent;

//   if(agent.indexOf("Firefox") > -1) {
//     return "Mozilla Firefox";
//   } else if(agent.indexOf("Chrome") > -1) {
//     return "Google Chrome";
//   } else if(agent.indexOf("Safari") > -1) {
//     return "Safari";
//   } else if(agent.indexOf("Edg") > -1) {
//     return "Microsoft Edge";
//   } else {
//     return "Unknown";
//   }
// }


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

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,private router: Router, private api: ApiService) { }

  // edit user profile start
editUserProfile(requestBody: any) {
  const url = `${this.api.EditProfile}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.post(url, requestBody, { headers });
}
// edit user profile end

// delete user personal detail start
deletePersonalDetails() {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`${this.api.DeletepersonalDetails}`, { headers });
}
// delete user personal detail end

// upload photo start
uploadPhoto(file: File){
  const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const formData: FormData = new FormData();
    formData.append('photo', file);
    
    return this.http.post(`${this.api.uploadPhoto}`, formData, { headers });

}
// upload photo end

// show personal details start
personaldetail(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.api.personalDetailsUpdate}`;

  return this.http.get(url, { headers });
}
// show personal details end
// show other user basic info start 
userBasicInfo(id: number): Observable<any>{
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.api.USerBasicInfo}/${id}`;
  return this.http.get(url, { headers });
}

// show other user basic info end

// getdocumentData(id: number): Observable<any>{
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const url = `${this.api.Docs}/${id}`;
//   return this.http.get(url, { headers });
// }
// DownloadDocs(id: number, filename: string): Observable<HttpResponse<Blob>> {
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const url = `${this.api.Docs}`;
//   return this.http.get(url, {
//     headers,
//     params: {id, filename },
//     observe: 'response', // This ensures you get the full HTTP response
//     responseType: 'blob', // This tells Angular to expect a binary response
//   });
// }
DownloadDocs(id: number, filename: string): Observable<HttpResponse<Blob>> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.api.Docs}`;
  return this.http.get(url, {
    headers,
    params: {id, filename },
    observe: 'response', // This ensures you get the full HTTP response
    responseType: 'blob', // This tells Angular to expect a binary response
  });
}
// download all docs start
// getAllDocs(id: number) {
//   const url = `${this.api.AllDocsUrl}/${id}`;
//   const token = localStorage.getItem('jwtToken');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
//   return this.http.get(url, { headers });
// }
getAllDocs(id: string): Observable<Blob> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.api.AllDocsUrl}/${id}`;

  return this.http.get(url, {
    headers,
    responseType: 'blob', // This specifies the response type as Blob
  });
}
// download all docs end


// show profile name in top start
getShowData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.api.EmpNameShow}`, { headers });
}
// show profile name in top end



}

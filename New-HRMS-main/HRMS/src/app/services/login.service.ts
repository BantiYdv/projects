import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // public apiUrl = 'http://192.168.1.11:9191/';


  // public login = `${this.apiUrl}login`;
  // public forgetPassword = `${this.apiUrl}forgot-password`;
  // public currentPhoto = `${this.apiUrl}photo/current`;
  // public signOut = `${this.apiUrl}signout`;
  // public teamLeave = `${this.apiUrl}leaves`;
  // public uploadPdfUrl = `${this.apiUrl}upload-pdf`;

  


  

  isloggedIn!: boolean;
  public role: string = '';
  getRole = localStorage.getItem('role');
  tableType: any;      // show table
 

  




  constructor(private http: HttpClient,private router: Router, public api: ApiService) { }


  getPermission() {
    const permissionLength = localStorage.getItem('permissionLength');
    const permissionLengthNumber = Number(permissionLength);
    console.log("test--->>>", permissionLengthNumber);
    const permissions = [];
    for (let i = 0; i < permissionLengthNumber; i++) {
      const permission = localStorage.getItem("permissions" + `${i}`);
      permissions.push(permission);
    }
    console.log("sdfsfffd", permissions);
return permissions;
  }
  
  
  // to checked that user is login or not
  isLoggedIn() {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken == undefined || jwtToken === '' || jwtToken == null) {
      // console.log(token);
      return false;
    }
    else {
      return true;
    }
  }


  // for logout
  logOut() {
    localStorage.removeItem('token');
    return true;
  }

  // for getting the token
  getToken() {
    return localStorage.getItem("token");
  }

  // set user detail
  setUser(user: string) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user
  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logOut();
      return null;
    }
  }

  // get user role
  getUserRole(): any {
    let user = this.getUser();
    if (user && user.registration && user.registration.role) {

      return user.registration.role;

    } else {
      this.logOut();
      return null;
    }
  }

// show table start
  showTable(tableType: string) {
    this.tableType = tableType;
  }
// show table end


// API's calling Start

 // login start
 signin(username: string, password: string) {


  //for remove token from local storage in 5 hours start
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  const expirationTime = new Date().getTime() + 5 * 60 * 60 * 1000;
  localStorage.setItem('tokenExpiration', expirationTime.toString());

  //for remove token from local storage in 5 hours end
  const credentials = { username, password };
  // const loginUrl = `${this.login}`;
  return this.http.post(this.api.login, credentials, {headers});

}
// login end

//for foget password call API
forgetPass(emailid: any) {

  return this.http.post(this.api.forgetPassword, emailid);
}
//for forget password call API

// current photo start
getCurrentPhoto(): Observable<Blob> {
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(this.api.currentPhoto, { headers, responseType: 'blob' });
}
// current photo end


// sign out start
SignOut(): Observable<any> {
  return new Observable((observer) => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('jwtToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.post(this.api.signOut, {}, { headers }).subscribe(
          () => {
            Swal.fire({
              title: 'Logged Out',
              text: 'You have been logged out.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              localStorage.removeItem('jwtToken');
              // Clear the permissions from local storage
              const permissionLength = localStorage.getItem('permissionLength');
              const permissionLengthNumber = Number(permissionLength);
              for (let i = 0; i < permissionLengthNumber; i++) {
                localStorage.removeItem("permissions" + `${i}`);
              }
              localStorage.removeItem('role');
              observer.next(); // Notify the observer that the logout was successful
              this.router.navigate(['/login']);
            });
          },
          (error) => {
            console.error('An error occurred while logging out:', error);
            observer.error(error); // Notify the observer about the error
          }
        );
      }
    });
  });
}
// sign out end


// change password start
changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
  const url = `${this.api.changePassword}`;
  const token = localStorage.getItem('jwtToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const requestBody = {
    oldPassword,
    newPassword,
    confirmPassword
  };

  return this.http.put(url, requestBody, { headers });
}
// change password end
  
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
// redirect to main home page according to which user login start
redirectTOHome(){
  const role = localStorage.getItem("role");
    if (role === "SUPERADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/admin']);
    }
}
// redirect to main home page according to which user login end
  
}

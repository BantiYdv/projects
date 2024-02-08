import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class roleAuthEmployeeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = localStorage.getItem("role");

    if (role == 'team member') {
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(["/user/log-in"]);
      return false;
    }
  }
}
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import {Config} from "./shared/config";
import { BackendService } from "./services/backend.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

canActivate() {

  if (BackendService.isLoggedIn()) {
    console.log("usuario logueado")
    return true;
  }
  else {
    console.log("sin usuario logueado")
    this.router.navigate(["/login"]);
    return false;
  }
  }

}

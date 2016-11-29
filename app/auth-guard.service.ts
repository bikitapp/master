import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import {Config} from "./shared/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

canActivate() {

  if (Config.hasActiveToken()) {
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

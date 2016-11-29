import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import firebase = require("nativescript-plugin-firebase");

import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import {Config} from "./config";
import { User } from "./user.model";

@Injectable()
export class LoginService {

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
        function (result) {
          return JSON.stringify(result);
        },
        function (errorMessage) {
          alert(errorMessage);
        }
    )
    .catch(this.handleErrors);
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then(
        function (result) {
          Config.token = result.uid
          return JSON.stringify(result);
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    )
    .catch(this.handleErrors);
  }

    googleLogin(user: User) {

      return firebase.login({
      type: firebase.LoginType.GOOGLE
      }).then(
        function (result) {
          console.log("google login");
          JSON.stringify(result);
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
      )
        .catch(this.handleErrors);
    }

  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then(
        function () {
          // called when password reset was successful,
          // you could now prompt the user to check his email
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    ).catch(this.handleErrors);
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}

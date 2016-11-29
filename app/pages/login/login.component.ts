import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");

import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import { alert, setHintColor, LoginService, User } from "../../shared";

@Component({
  selector: "gr-login",
  templateUrl: "pages/login/login.component.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;

  @ViewChild("initialContainer") initialContainer: ElementRef;
  @ViewChild("mainContainer") mainContainer: ElementRef;
  @ViewChild("logoContainer") logoContainer: ElementRef;
  @ViewChild("formControls") formControls: ElementRef;
  @ViewChild("signupControls") signupControls: ElementRef;
  @ViewChild("signUpStack") signUpStack: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("nacimiento") nacimiento: ElementRef;
  @ViewChild("nombre") nombre: ElementRef;


  constructor(private router: Router,
    private userService: LoginService,
    private page: Page) {
    this.user = new User();
    this.user.email;
    this.user.password;
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Ingresa un correo electrónico válido.");
      return;
    }

    this.isAuthenticating = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    if (getConnectionType() === connectionType.none) {
      alert("Bikit necesita estar conectado a internet para ingresar.");
      return;
    }

    this.userService.login(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this.router.navigate(["/"]);
      })
      .catch(() => {
        console.log("error con login por email " );
        alert("Desafortunadamente no pudimos encontrar tu cuenta.");
        this.isAuthenticating = false;
    });
  }

  signUp() {
    if (getConnectionType() === connectionType.none) {
      alert("Bikit necesita estar conectado a internet para registrar.");
      return;
    }

    this.userService.register(this.user)
      .then(
        () => {
          this.isAuthenticating = false;
          this.toggleDisplay();
          this.login();
        },
        (message) => {
          // TODO: Verify this works
          if (message.match(/same user/)) {
            alert("Este correo electrónico ya está registrado.");
          } else if (message.match(/at least 6 characters/)) {
            alert("Tu contraseña debe tener minimo 6 caracteres");
          } else {
            alert("Lamentablemente no pudimos crear tu cuenta.");
          }
          this.isAuthenticating = false;
        }
      );
  }

  forgotPassword() {
    prompt({
      title: "Restaurar contraseña",
      message: "Ingresa el correo electrónico de tu cuenta Bikit para restaurar tu contraseña.",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancelar"
    }).then((data) => {
      if (data.result) {
        this.userService.resetPassword(data.text.trim())
          .then(() => {
            alert("Tu contraseña fue restaurada correctamente. Por favor revisa tu correo electrónico y sigue las instrucciones al elegir una nueva contraseña.");
          }, () => {
            alert("Lamentablemente, ocurrió un error al resetear tu contraseña, intentalo nuevamente.");
          });
      }
    });
  }

  goolgeSignin() {
    if (getConnectionType() === connectionType.none) {
      alert("Bikit necesita estar conectado a internet para registrar.");
      return;
    }

    this.userService.googleLogin(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this.router.navigate(["/"]);
      })
      .catch(() => {
        console.log("error con login por google " );
        alert("Desafortunadamente no pudimos crear tu cuenta.");
        this.isAuthenticating = false;
    });

  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    if (this.isLoggingIn) {
            this.toggleSignin();
        } else {
            this.toggleSignup();
        }
    this.setTextFieldColors();

  }

  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 20000
    });
  }

  showMainContent() {
    let initialContainer = <View>this.initialContainer.nativeElement;
    let mainContainer = <View>this.mainContainer.nativeElement;
    let logoContainer = <View>this.logoContainer.nativeElement;
    let formControls = <View>this.formControls.nativeElement;
    let signUpStack = <View>this.signUpStack.nativeElement;
    let signupControls = <View>this.signupControls.nativeElement;

    let animations = [];

    this.setTextFieldColors();

    initialContainer.animate({
      opacity: 0,
      duration: 500
    }).then(function() {

      initialContainer.style.visibility = "collapse";
      signupControls.style.visibility = "collapse";
      mainContainer.style.visibility = "visible";
      logoContainer.style.visibility = "visible";

      // Fade in the main container and logo over one half second.
      animations.push({ target: mainContainer, opacity: 1, duration: 500 });
      animations.push({ target: logoContainer, opacity: 1, duration: 500 });

      // Slide up the form controls and sign up container.
      animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
      animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
    });
  }

  setTextFieldColors() {
    let emailTextField = <TextField>this.email.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;
    let nacimientoTextField = <TextField>this.nacimiento.nativeElement;
    let nombreTextField = <TextField>this.nombre.nativeElement;

    let mainTextColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;
    nacimientoTextField.color = mainTextColor;
    nombreTextField.color = mainTextColor;


    let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
    setHintColor({ view: nacimientoTextField, color: hintColor });
    setHintColor({ view: nombreTextField, color: hintColor });

  }

  toggleSignup() {
    let formControls = <View>this.formControls.nativeElement;
    let signupControls = <View>this.signupControls.nativeElement;
    let animations = [];

    formControls.animate({
      opacity: 0,
      duration: 500
    }).then(function() {

      formControls.style.visibility = "collapse";
      signupControls.style.visibility = "visible";

      animations.push({ target: signupControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
    });
  }

  toggleSignin() {
    let formControls = <View>this.formControls.nativeElement;
    let signupControls = <View>this.signupControls.nativeElement;
    let animations = [];

    signupControls.animate({
      opacity: 0,
      duration: 500
    }).then(function() {

      signupControls.style.visibility = "collapse";
      formControls.style.visibility = "visible";

      animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
    });
  }

}

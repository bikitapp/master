import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NSGeoFire } from "nativescript-geofire-plugin";
import { enableProdMode } from '@angular/core';
import { AppModule } from "./app.module";
import { BackendService } from "./services/backend.service";

import firebase = require ("nativescript-plugin-firebase");

firebase.init({
  persist: false,
  iOSEmulatorFlush: true,
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data))
    if (data.loggedIn) {
      BackendService.token = data.user.uid;
    }
    else {
      BackendService.token = "";
    }
  }
  }).then(
    (instance) =>{
        console.log("firebase iniciado");
    },
    (error) => {
        console.log("firebase error " + error);
    }
)

enableProdMode();

platformNativeScriptDynamic().bootstrapModule(AppModule);

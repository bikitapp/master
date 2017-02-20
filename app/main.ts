import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import geofire = require ("nativescript-geofire-plugin");
import { enableProdMode } from '@angular/core';
import { AppModule } from "./app.module";

import firebase = require ("nativescript-plugin-firebase");

firebase.init({
  iOSEmulatorFlush: true
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

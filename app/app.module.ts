import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
var application = require("application");

//Angular
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { authProviders, appRoutes } from "./app.routing";

//App Components
import { AppComponent } from "./app.component";
import { setStatusBarColors } from "./shared";
import { BackendService, FirebaseService, UtilsService } from "./services";
import { LoginModule } from "./pages/login/login.module";
import { MapModule } from "./pages/mainmap/mainmap.module";

//FoniconAwesome
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';
TNSFontIconService.debug = true;

setStatusBarColors();

// iOS Google Maps API Key Setup
declare var GMSServices: any;
if(application.ios) {
    GMSServices.provideAPIKey("AIzaSyD3SdL-Oq29px9Lui7K_cmcvF1uNLvfJMA");
}

var platform = require("platform");
if(platform.device.os === platform.platformNames.android) {
    application.onLaunch = function(intent) {
        application.android.onActivityCreated = function(activity) {
            var id = activity.getResources().getIdentifier("AppTheme", "style", activity.getPackageName());
            activity.setTheme(id);
        }
    }
}

@NgModule({
  providers: [
    BackendService,
    FirebaseService,
    UtilsService,
    authProviders
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    TNSFontIconModule.forRoot({'fa': 'font-awesome.css'}),
    MapModule
  ],
  declarations: [
      AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

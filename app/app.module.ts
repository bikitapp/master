import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
var application = require("application");

//Angular
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { authProviders, appRoutes } from "./app.routing";

//App Components
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendService, LoginService } from "./shared";
import { LoginModule } from "./pages/login/login.module";
import { GroceriesModule } from "./pages/groceries/groceries.module";
import { MapModule } from "./pages/mainmap/mainmap.module";

setStatusBarColors();

// iOS Google Maps API Key Setup
declare var GMSServices: any;
if(application.ios) {
    GMSServices.provideAPIKey("AIzaSyD3SdL-Oq29px9Lui7K_cmcvF1uNLvfJMA");
}

var platform = require("platform");
if(platform.device.os === platform.platformNames.android) {
    application.onLaunch = function(intent) {
        // hook the onActivityCreated callback upon application launching
        application.android.onActivityCreated = function(activity) {
            // apply the default theme once the Activity is created
            var id = activity.getResources().getIdentifier("AppTheme", "style", activity.getPackageName());
            activity.setTheme(id);
        }
    }
}

@NgModule({
  providers: [
    BackendService,
    LoginService,
    authProviders
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    GroceriesModule,
    MapModule
  ],
  declarations: [
      //SIDEDRAWER_DIRECTIVES,
      AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

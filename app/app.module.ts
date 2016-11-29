import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
//var application = require("application");

//Angular
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { authProviders, appRoutes } from "./app.routing";

//App Components
//import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendService, LoginService } from "./shared";
import { LoginModule } from "./pages/login/login.module";
import { GroceriesModule } from "./pages/groceries/groceries.module";
import { MapModule } from "./pages/mainmap/mainmap.module";


setStatusBarColors();

// iOS Google Maps API Key Setup
//declare var GMSServices: any;
//if(application.ios) {
//    GMSServices.provideAPIKey("AIzaSyCCbRydI84FEFapTzFo5qtGCv5i6NGuQgE");
//}

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

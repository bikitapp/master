import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

import { NgModule } from "@angular/core";
import { mainmapRouting } from "./mainmap.routing";
import { MapComponent } from "./map.component";
//FoniconAwesome
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';
TNSFontIconService.debug = true;

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mainmapRouting,
    TNSFontIconModule.forRoot({'fa': 'font-awesome.css'})
  ],
  declarations: [
    SIDEDRAWER_DIRECTIVES,
    MapComponent
  ]
})
export class MapModule {}

import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

import { NgModule } from "@angular/core";
import { mainmapRouting } from "./mainmap.routing";
import { MapComponent } from "./map.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mainmapRouting
  ],
  declarations: [
    SIDEDRAWER_DIRECTIVES,
    MapComponent,

  ]
})
export class MapModule {}

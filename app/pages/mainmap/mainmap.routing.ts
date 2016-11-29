import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MapComponent } from "./map.component";
import { AuthGuard } from "../../auth-guard.service";

const MainMapRoutes: Routes = [
  { path: "mainmap", component: MapComponent, canActivate: [AuthGuard] },
];
export const mainmapRouting: ModuleWithProviders = RouterModule.forChild(MainMapRoutes);

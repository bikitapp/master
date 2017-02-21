import { Component } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
  selector: "bk-main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor(private pluginService: TNSFontIconService) { 
    }

  }

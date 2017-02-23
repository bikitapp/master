import { Component } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { isIOS } from 'platform';
import { topmost } from 'ui/frame';

@Component({
  selector: "gf-main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor(private pluginService: TNSFontIconService) {
      var page = topmost().currentPage;
      page.backgroundSpanUnderStatusBar = true;
      if (isIOS) {
          topmost().ios.controller.navigationBar.barStyle = 1;
      }
    }

  }

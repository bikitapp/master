import { Component } from "@angular/core";
import { isIOS } from 'platform';
import { topmost } from 'ui/frame';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
  selector: "gf-main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor(private fonticon: TNSFontIconService) {
      //var page = topmost().currentPage;
      //page.backgroundSpanUnderStatusBar = true;
    }

  }

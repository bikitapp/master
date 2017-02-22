import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import { Router } from "@angular/router";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import {Observable} from 'rxjs/Observable';

let geolocation = require('nativescript-geolocation');
import {MapView, Marker, Polyline, Position} from 'nativescript-google-maps-sdk';

import {Page} from "ui/page";
import {RadSideDrawer} from 'nativescript-telerik-ui/sidedrawer';
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import {RadSideDrawerComponent, SideDrawerType} from 'nativescript-telerik-ui/sidedrawer/angular';
import {Config} from "../../shared/config";
import {BackendService, FirebaseService} from "../../services";

import { alert } from "../../shared";

import {Color} from 'color';

import {
    FlexboxLayout,
    FlexDirection,
    FlexWrap,
    JustifyContent,
    AlignItems,
    AlignContent,
    AlignSelf
} from "ui/layouts/flexbox-layout";


var style = require("./mapstyle.json");

registerElement('MapView', () => MapView);

let vm;
@Component({
    moduleId: module.id,
    selector: 'gf-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css'],
})
export class MapComponent implements AfterViewInit {
    mapView:any = null;
    watchId:number = null;
    gpsLine:Polyline;
    tapLine:Polyline;
    tapMarker:any;
    gpsMarker:any;
    centeredOnLocation:boolean = true;

    public message$: Observable<any>;

    constructor(private router: Router,
      private page: Page,
      private routerExtensions: RouterExtensions,
      private firebaseService: FirebaseService) {
          vm = this;
    }

    ngOnInit() {
      this.page.actionBarHidden = true;
      this.message$ = <any>this.firebaseService.getMyMessage();
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;

    ngAfterViewInit() {
       vm.drawer = vm.drawerComponent.sideDrawer;
    }

    openDrawer(){
        vm.drawer.showDrawer();
    }

    closeDrawer(){
        vm.drawer.closeDrawer();
    }

    enableLocation() {
        if (!geolocation.isEnabled()) {
            return geolocation.enableLocationRequest();
        } else {
            return Promise.resolve(true);
        }
    }

    getLocation() {
        if (geolocation.isEnabled()) {
            return geolocation.getCurrentLocation({
                desiredAccuracy: 10,
                updateDistance: 10,
                minimumUpdateTime: 1000,
                maximumAge: 20000
            })
        }
        return Promise.reject('GPS no habilitado.');
    }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');
        if (vm.mapView || !event.object) return;

        vm.mapView = event.object;

        vm.mapView.markerSelect = vm.onMarkerSelect;
        vm.mapView.cameraChanged = vm.onCameraChanged;
        vm.mapView.setStyle( style );

        vm.enableLocation()
            .then(vm.getLocation)
            .then(() => {
                vm.watchId = geolocation.watchLocation(vm.locationReceived, vm.error, {
                    desiredAccuracy: 10,
                    updateDistance: 10,
                    minimumUpdateTime: 20000,
                    maximumAge: 200000
                });
            }, vm.error);
    };

    mapTapped(event) {
        console.log('Map Tapped');

        vm.tapLine = vm.addPointToLine({
            color: new Color('LightRed'),
            line: vm.tapLine,
            location: event.position,
            geodesic: true,
            width: 10
        });

        vm.removeMarker(vm.tapMarker);
        vm.tapMarker = vm.addMarker({
            location: event.position,
            title: 'Tap Location'
        });
    };

    locationReceived(position:Position) {
        console.log('GPS Update Received');

        if (vm.mapView && position && !vm.centeredOnLocation) {
            vm.mapView.latitude = position.latitude;
            vm.mapView.longitude = position.longitude;
            vm.mapView.zoom = 16;
            vm.centeredOnLocation = true;
        }

        vm.gpsLine = vm.addPointToLine({
            color: new Color('LightGreen'),
            line: vm.gpsLine,
            location: position,
            geodesic: true,
            width: 10
        });

        vm.removeMarker(vm.gpsMarker);
        vm.gpsMarker = vm.addMarker({
            location: position,
            title: 'Mi ubicación'
        });
    };

    addPointToLine(args:AddLineArgs) {
        if (!vm.mapView || !args || !args.location) return;

        let line = args.line;

        if (!line) {
            line = new Polyline();
            line.visible = true;
            line.width = args.width || 10;
            line.color = args.color || new Color('LightRed');
            line.geodesic = args.geodesic != undefined ? args.geodesic : true;
            vm.mapView.addPolyline(line);
        }
        line.addPoint(Position.positionFromLatLng(args.location.latitude, args.location.longitude));

        return line;
    }

    addMarker(args:AddMarkerArgs) {
        if (!vm.mapView || !args || !args.location) return;

        let marker = new Marker();
        marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        marker.snippet = args.title;
        vm.mapView.addMarker(marker);

        return marker;
    };

    clearGpsLine() {
        vm.removeLine(vm.gpsLine);
        vm.gpsLine = null;
        vm.closeDrawer();
    };

    clearTapLine() {
        vm.removeLine(vm.tapLine);
        vm.tapLine = null;
        vm.removeMarker(vm.tapMarker);
        vm.tapMarker = null;
        vm.closeDrawer();
    }

    removeLine(line:Polyline) {
        if (line) {
            line.removeAllPoints();
        }
    }

    removeMarker(marker:Marker) {
        if (vm.mapView && marker) {
            vm.mapView.removeMarker(marker);
        }
    }

    error(err) {
        console.log('Error: ' + JSON.stringify(err));
    }

    onMarkerSelect(event) {
        console.log('Clicked on ' + event.marker.title);
    }

    onCameraChanged(event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
    }
    
    logoff() {
      this.firebaseService.logout();
      this.routerExtensions.navigate(["/login"], { clearHistory: true } );
    }
}

export class AddLineArgs {
    public color:Color;
    public line:Polyline;
    public location:Position;
    public geodesic:boolean;
    public width:number;
}

export class AddMarkerArgs {
    public location:Position;
    public title:string;
}

import { Component } from "@angular/core";
import { setInterval, setTimeout, clearInterval } from "timer";
import { Color } from "color";

export class SetTimeoutComponent {
    public counter = 0;

    constructor() { }

    public increase(args) {
        let that = this;
        setTimeout(function () {
            that.counter++;
        }, 1000);
    }
    public decrease(args) {
        let that = this;
        setTimeout(function () {
            that.counter--;
        }, 1000);
    }
}

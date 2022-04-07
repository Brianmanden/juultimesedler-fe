import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TimePickersComponent = class TimePickersComponent {
    constructor() {
        this.startTime = new Date(2022, 2, 15, 7, 0, 0);
        this.endTime = new Date(2022, 2, 15, 16, 0, 0);
    }
    ngOnInit() {
    }
};
TimePickersComponent = __decorate([
    Component({
        selector: 'app-time-pickers',
        templateUrl: './time-pickers.component.html',
        styleUrls: ['./time-pickers.component.css']
    })
], TimePickersComponent);
export { TimePickersComponent };
//# sourceMappingURL=time-pickers.component.js.map
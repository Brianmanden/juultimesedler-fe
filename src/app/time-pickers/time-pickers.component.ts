import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-time-pickers',
  templateUrl: './time-pickers.component.html',
  styleUrls: ['./time-pickers.component.css'],
})
export class TimePickersComponent{
  @Input() startTime!: Date;
  @Input() endTime!: Date;

  constructor() {}
}

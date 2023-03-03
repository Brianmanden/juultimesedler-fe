import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-pickers',
  templateUrl: './time-pickers.component.html',
  styleUrls: ['./time-pickers.component.css'],
})
export class TimePickersComponent implements OnInit {
  //startTime: Date = new Date();
  //endTime: Date;
  startTime: Date = new Date(2023, 3, 3, 7, 0, 0);
  endTime: Date = new Date(2023, 3, 3, 16, 0, 0);

  constructor() {}

  ngOnInit(): void {}
}

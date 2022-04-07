import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-pickers',
  templateUrl: './time-pickers.component.html',
  styleUrls: ['./time-pickers.component.css']
})
export class TimePickersComponent implements OnInit {

  startTime: Date = new Date(2022, 2, 15, 7, 0, 0);
  endTime: Date   = new Date(2022, 2, 15, 16, 0, 0);

  constructor() { }

  ngOnInit(): void {
  }

}

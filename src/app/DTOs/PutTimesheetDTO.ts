import { Timesheet } from '../Models/Timesheet';

export class PutTimesheetDTO {
  workerId: number;
  timeSheets: Timesheet[];
}

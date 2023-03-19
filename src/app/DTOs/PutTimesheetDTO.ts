import { Timesheet } from '../Models/Timesheet';
import { Workday } from '../Models/Workday';

export class PutTimesheetDTO {
  workerId: number;
  weekNumber: number;
  workdays?: Workday[];
}

import { Timesheet } from '../models/Timesheet';
import { Workday } from '../models/Workday';

export class PutTimesheetDTO {
  workerId: number;
  weekNumber: number;
  workdays?: Workday[];
}

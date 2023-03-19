/* #region Angular */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
/* #endregion */
/* #region PrimeNG */
import { SelectItemGroup } from 'primeng/api';
/* #endregion */
/* #region Services */
import {
  HttpErrorHandler,
  HandleError,
} from './Services/http-error-handler.service';
import { ProjectsService } from './Services/project.service';
import { TimesheetsService } from './Services/timesheets.service';
import { TasksService } from './Services/task.service';
/* #endregion */
/* #region Models and DTOs */
import { ProjectPickerModel } from './Models/ProjectPickerModel.model';
import { PutTimesheetDTO } from './DTOs/PutTimesheetDTO';
import { GetProjectDTO } from './DTOs/GetProjectDTO';
import { Timesheet } from './Models/Timesheet';
import { Workday } from './Models/Workday';
/* #endregion */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /* #region Public fields */
  APIrootURI: string = 'https://localhost:44352/api';
  workerId: number = 1110;

  results: string[] = [];
  showButtonBar: boolean;
  text: string;
  title = 'juultimesedler';

  // value: Date;

  /* #region PROJECTS */
  items: string[] = [];
  filteredItems: any[];
  /* #endregion */
  /* #region DATES & TIME */
  invalidDates: Array<Date>;
  startTime: Date = new Date('2023-03-03T07:00:00.000Z');
  endTime: Date = new Date('2023-03-03T16:00:00.000Z');

  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  // en: any;
  /* #endregion */
  /* #region PROJECT PICKER */
  projects: ProjectPickerModel[] = [];
  selectedProjectAdvanced: number;
  filteredProjects: GetProjectDTO[];
  /* #endregion */
  /* #region TASKS - LISTBOX */
  renderListbox: boolean = true;
  definedTasks: Array<SelectItemGroup[]> = new Array<Array<SelectItemGroup>>(7);
  selectedTasks: any[];
  taskComments: string;
  /* #endregion */
  /* #region Private fields */
  private handleError: HandleError;
  /* #endregion */

  constructor(
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    private timesheetsService: TimesheetsService,
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('TimesheetService');
  }

  async ngOnInit() {
    this.projects = this.projectsService.getCurrentProjects(this.APIrootURI);

    /* #region DAYS & MONTHS */
    // this.en = {
    //   firstDayOfWeek: 1,
    //   dayNames: [
    //     'Sunday',
    //     'Monday',
    //     'Tuesday',
    //     'Wednesday',
    //     'Thursday',
    //     'Friday',
    //     'Saturday',
    //   ],
    //   dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    //   dayNamesMin: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
    //   monthNames: [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'September',
    //     'October',
    //     'November',
    //     'December',
    //   ],
    //   monthNamesShort: [
    //     'Jan',
    //     'Feb',
    //     'Mar',
    //     'Apr',
    //     'May',
    //     'Jun',
    //     'Jul',
    //     'Aug',
    //     'Sep',
    //     'Oct',
    //     'Nov',
    //     'Dec',
    //   ],
    //   today: 'Today',
    //   clear: 'Clear',
    // };
    /* #endregion */
    /* #region TIME VARIABLES */
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
    /* #endregion */

    await this.tasksService.getTasks(this.APIrootURI).then((res) => {
      for (let i = 0; i < 7; i++) {
        this.definedTasks[i] = res;
      }
    });
  }

  /* #region Public methods */
  filterProject(event: { query: any }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.projects.length; i++) {
      let project = this.projects[i];
      if (project.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(project);
      }
    }

    this.filteredProjects = filtered;
  }

  submitTimesheet(event: any): void {
    const timesheet: PutTimesheetDTO = new PutTimesheetDTO();
    timesheet.workerId = this.workerId;
    timesheet.weekNumber = 12;
    timesheet.workdays = [];

    for (let i = 0; i < 7; i++) {
      const workday = new Workday();
      workday.weekday = i;
      workday.startTime = '0700';
      workday.endTime = '1600';
      workday.selectedProjectId = 1115;
      workday.selectedTasks = ['slæbe gips', 'skrue gips'];
      workday.taskComments = '200.- for diesel';

      timesheet.workdays[i] = workday;
    }

    this.timesheetsService
      .putTimesheet(this.APIrootURI, timesheet)
      .subscribe((res) => {
        console.group('Timesheet upserted');
        console.table(res);
        console.groupEnd();
      });
  }

  clearSearchBox(event: Event): void {
    const listboxSearchfield = document.querySelectorAll(
      'p-listbox .p-inputtext'
    )[0] as HTMLInputElement;

    listboxSearchfield.value = '';
    this.renderListbox = false;
    setTimeout(() => {
      this.renderListbox = true;
    }, 0);
  }
  /* #endregion */
}

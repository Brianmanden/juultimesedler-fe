import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  HttpErrorHandler,
  HandleError,
} from './Services/http-error-handler.service';
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { timesheetDTO } from './DTOs/timesheetDTO';
import { getProjectDTO } from './DTOs/getProjectDTO';
import { ProjectsService } from './Services/project.service';
import { TasksService } from './Services/task.service';
import { TimesheetsService } from './Services/timesheets.service';
import { ProjectPickerModel } from './Models/project-picker-model.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private handleError: HandleError;

  APIrootURI: string = 'https://localhost:44352/api';
  workerId: number = 1110;

  results: string[] = [];
  showButtonBar: boolean;
  text: string;
  title = 'juultimesedler';

  value: Date;

  /* #region PROJECTS */
  items: string[] = [
    'Byg1',
    'Byg2',
    'Byg3',
    'Ombyg1',
    'Ombyg2',
    'Ombyg3',
    'Riv1',
    'Riv2',
    'Riv3',
  ];
  filteredItems: any[];
  /* #endregion */
  jobDesc: string;

  /* #region DATES & TIME */
  invalidDates: Array<Date>;
  startTime: Date = new Date('2023-03-03T07:00:00.000Z');
  endTime: Date = new Date('2023-03-03T16:00:00.000Z');

  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  en: any;
  /* #endregion */

  /* #region PROJECT PICKER */
  projects: ProjectPickerModel[] = [];
  selectedProjectAdvanced: number;
  filteredProjects: getProjectDTO[];
  /* #endregion */

  /* #region LISTBOX */
  selectedTasks: any[];
  definedTasks: SelectItemGroup[];
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

  filterProject(event: { query: any }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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

  async ngOnInit() {
    this.projects = this.projectsService.getCurrentProjects(this.APIrootURI);

    /* #region DAYS & MONTHS */
    this.en = {
      firstDayOfWeek: 1,
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Staurday',
      ],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      today: 'Today',
      clear: 'Clear',
    };
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

    /* #endregion */
    // Fetch tasks defined in BE
    this.definedTasks = await this.tasksService.getTasks(this.APIrootURI);
  }

  search(event: { query: any }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.includes(query.toLowerCase())) {
        filtered.push(item);
        this.results.push(item);
      }
    }

    this.filteredItems = filtered;
  }

  handleDropdown(event: { query: any }) {
    console.log(event.query);
  }

  filterItems(event: { query: any }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.includes(query.toLowerCase())) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }

  submitTimesheet(event: any): void {
    const data: timesheetDTO = new timesheetDTO();
    data.selectedProjectId = 1115; //this.selectedProjectAdvanced;
    data.selectedTasks = this.selectedTasks;
    data.startTime = this.startTime;
    data.endTime = this.endTime;
    data.jobDesc = this.jobDesc;

    this.timesheetsService
      .upsertTimesheet(this.APIrootURI, data)
      .subscribe((res) => {
        console.group("Timesheet upserted");
        console.table(res);
        console.groupEnd();
      });
  }
}

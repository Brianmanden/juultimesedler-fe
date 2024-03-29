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
} from './services/http-error-handler.service';
import { TimesheetsService } from './services/timesheets.service';
import { ProjectsService } from './services/project.service';
import { TasksService } from './services/task.service';
/* #endregion */
/* #region Models and DTOs */
import { ProjectPicker } from './models/ProjectPicker';
import { PutTimesheetDTO } from './DTOs/PutTimesheetDTO';
import { GetProjectDTO } from './DTOs/GetProjectDTO';
import { Workday } from './models/Workday';
import { GetTimesheetDTO } from './DTOs/GetTimesheetDTO';
/* #endregion */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /* #region Public fields */
  APIrootURI: string = 'https://localhost:44352/api';
  showButtonBar: boolean;
  text: string;
  title = 'juultimesedler';
  workerId: number = 1110;

  /* #region PROJECTS */
  filteredItems: any[];
  items: string[] = [];
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
  filteredProjects: GetProjectDTO[];
  projects: ProjectPicker[] = [];
  selectedProjectAdvanced: number;
  timesheet: GetTimesheetDTO;
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
    this.timesheet = await this.timesheetsService.getCurrentTimesheet(
      this.APIrootURI
    );
    this.projects = await this.projectsService.getCurrentProjects(
      this.APIrootURI
    );
    await this.tasksService.getTasks(this.APIrootURI).then((res) => {
      for (let i = 0; i < 7; i++) {
        this.definedTasks[i] = res;
      }
    });
  }

  /* #region Public methods */
  index: number = 0;

  openNext() {
    this.index = this.index === 7 ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = this.index === 0 ? 7 : this.index - 1;
  }

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

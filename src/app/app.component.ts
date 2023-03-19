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
import { TimesheetsService } from './Services/timesheets.service';
import { ProjectsService } from './Services/project.service';
import { TasksService } from './Services/task.service';
/* #endregion */
/* #region Models and DTOs */
import { ProjectPickerModel } from './Models/ProjectPickerModel.model';
import { PutTimesheetDTO } from './DTOs/PutTimesheetDTO';
import { GetProjectDTO } from './DTOs/GetProjectDTO';
import { Workday } from './Models/Workday';
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
  timesheet: GetTimesheetDTO;
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

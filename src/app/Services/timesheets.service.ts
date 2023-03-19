import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { PutTimesheetDTO } from '../DTOs/PutTimesheetDTO';
import { GetTimesheetDTO } from '../DTOs/GetTimesheetDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable()
export class TimesheetsService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimesheetsService');
  }

  putTimesheet(
    timesheetsURI: string,
    timesheet: PutTimesheetDTO
  ): Observable<PutTimesheetDTO> {
    return this.http
      .put<PutTimesheetDTO>(
        timesheetsURI + '/timesheets',
        timesheet,
        httpOptions
      )
      .pipe(catchError(this.handleError('upsertTimesheet', timesheet)));
  }

  getCurrentTimesheet(APIrootURI: string): GetTimesheetDTO {
    let timesheet: GetTimesheetDTO = new GetTimesheetDTO();

    fetch(APIrootURI + '/gettimesheetweek/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO Fix / remove / ignore Access-Control-Allow-Origin
        'Access-Control-Allow-Origin': 'QWEQWE',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        timesheet.weekNumber = data.weekNumber;
        timesheet.weekDays = data.weekDays;
        timesheet.weekDates = data.weekDates;
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return timesheet;
  }
}

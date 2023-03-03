import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { timesheetDTO } from '../DTOs/timesheetDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  timesheetsUrl: string = '/timesheets';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimesheetsService');
  }

  postTimesheet(APIrootURI: string, data: timesheetDTO): string {
    this.http
      .put<string>(APIrootURI + this.timesheetsUrl, data)
      .subscribe((someData) => {
        console.log('-2-', data);
      });

    return 'heps';
  }
}

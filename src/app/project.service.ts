import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { ConfigService } from './config/config.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpErrorHandler,
  HandleError,
} from '../app/http-error-handler.service';

import { ProjectPickerModel } from './Models/project-picker-model.model';
import { getProjectDTO } from './DTO/getProjectDTO';
import { timesheetDTO } from './DTO/timesheetDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable()
export class ProjectsService {
  projectsUrl: string = 'api/projects';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProjectsService');
  }

  getCurrentProjects(APIrootURI: string): ProjectPickerModel[] {
    let returnList: ProjectPickerModel[] = [];

    fetch(APIrootURI + '/projects/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO Fix / remove / ignore Access-Control-Allow-Origin
        'Access-Control-Allow-Origin': 'QWEQWE',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item: getProjectDTO) => {
          console.log('-getProjectDTO-', item);
          returnList.push({
            id: item.projectId,
            name: item.projectName,
            fullName: item.projectFullName,
          });
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        console.log('Finally - projects: ' + returnList);
      });

    return returnList;
  }

  postProject(
    postProjectURI: string,
    data: timesheetDTO
  ): Observable<timesheetDTO> {
    console.log(postProjectURI, data);

    return this.http
      .post<timesheetDTO>(postProjectURI, data, httpOptions)
      .pipe(catchError(this.handleError('postProject', data)));
  }
}

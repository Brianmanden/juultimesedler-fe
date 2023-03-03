import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ProjectPickerModel } from '../Models/project-picker-model.model';
import { getProjectDTO } from '../DTOs/getProjectDTO';

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
          returnList.push({
            id: item.projectId,
            name: item.projectName,
            fullName: item.projectFullName,
          });
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return returnList;
  }
}

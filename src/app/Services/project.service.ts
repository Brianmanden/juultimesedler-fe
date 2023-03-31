import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ProjectPicker } from '../models/ProjectPicker';
import { GetProjectDTO } from '../DTOs/GetProjectDTO';

@Injectable()
export class ProjectsService {
  projectsUrl: string = 'api/projects';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProjectsService');
  }

  async getCurrentProjects(APIrootURI: string): Promise<ProjectPicker[]> {
    let returnList: ProjectPicker[] = [];

    await fetch(APIrootURI + '/projects/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item: GetProjectDTO) => {
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

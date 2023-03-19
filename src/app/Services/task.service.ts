import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { SelectItem, SelectItemGroup } from 'primeng/api';

import { TasksGroupDTO } from '../DTOs/TasksGroupDTO';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  projectsUrl: string = 'api/tasks';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TasksService');
  }

  async getTasks(APIrootURI: string): Promise<SelectItemGroup[]> {
    let returnList: SelectItemGroup[] = [];
    // let returnList: string[] = [];

    await fetch(APIrootURI + '/tasks/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO Fix / remove / ignore Access-Control-Allow-Origin
        'Access-Control-Allow-Origin': 'QWEQWE',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((taskGroup: TasksGroupDTO) => {
          let taskItems: SelectItem[] = [];

          taskGroup.taskNames.forEach((taskName: string) => {
            taskItems.push({
              label: taskName,
              value: taskName,
            });
          });

          let taskGroupObj = {
            label: taskGroup.taskGroupName,
            value: taskGroup.taskGroupName,
            items: taskItems,
          };

          returnList.push(taskGroupObj);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return returnList;
  }
}

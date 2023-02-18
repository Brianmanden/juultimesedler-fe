import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { TasksGroupDTO } from '../DTOs/tasksGroupDTO';
import { SelectItem, SelectItemGroup } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  projectsUrl: string = 'api/tasks';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TasksService');
  }

  getTasks(APIrootURI: string): SelectItemGroup[] {
    let returnList: SelectItemGroup[] = [];
    // let returnList: string[] = [];

    fetch(APIrootURI + '/tasks/', {
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
            // console.log(taskName);

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

    // TODO BJA HERTIL
    return returnList;
  }
}

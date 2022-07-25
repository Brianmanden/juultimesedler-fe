import { Injectable } from '@angular/core';
import { getProjectDTO } from './DTO/getProjectDTO';
import { ProjectPickerModel } from './Models/project-picker-model.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  getProjects(APIrootURI: string, workerId: number): ProjectPickerModel[] {
    let returnList: ProjectPickerModel[] = [];

    fetch(APIrootURI + '/projects/' + '1110', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item: getProjectDTO) => {
          console.log(item);
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
}

import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './model';
import { keyframes } from '@angular/animations';

const key = 'mija-tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private storage: StorageMap) {}

  get(): Observable<Task[]> {
    return this.storage.get(key).pipe(
      map(value => value || [])
    ) as Observable<Task[]>;
  }
}

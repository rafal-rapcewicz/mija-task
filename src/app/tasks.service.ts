import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { Task, Prediction } from './model';

const key = 'mija-tasks';

// images taken from google image search using filter flag: labeled for noncommercial reuse
export const taskImageNames = [
  's-5798937223_b7187d1731_b',
  's-28674222645_a1b417d35c_b',
  's-30292622052_4e9c0e6f63_b',
  's-31344021255_ab66f7a7e1_b',
  's-aircraft-airplane-aviate-946071',
  's-animal-bee-2420751',
  's-animal-close-up-cute-1972531',
  's-architecture-covered-foliage-1599899',
  's-art-artistic-artsy-2566639',
  's-beer-cup-blue-cup-1051743',
  's-birds-birdsofindia-indianbirds-roshankamath-1661149',
  's-crystals-healing-rattle-709618',
  's-dragonfly-2376614_1280',
  's-la-palm-palm-trees-535011',
  's-new-york-2149526_1280',
  's-pexels-photo-574282',
  's-pexels-photo-948331',
  's-Port_Fouad_,_photo_by_Hatem_Moushir_13'
];

export const getMockInitialTasks = (): Task[] => {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consequat erat eget venenatis sollicitudin. Vivamus cursus elit vel arcu convallis, sagittis volutpat nisi tincidunt. Nunc volutpat suscipit diam, vitae iaculis nisi mollis vel. Etiam imperdiet tortor nec sapien fringilla elementum. Aliquam et erat purus. Ut laoreet ante sed mauris mollis placerat. Pellentesque vitae orci urna. Morbi consequat tellus a mi bibendum ornare. Vivamus efficitur gravida magna quis pulvinar. Nulla maximus sapien nec magna condimentum gravida. Nam nec libero dictum, tristique ante vel, luctus dui. Ut vehicula purus nisi. Vestibulum lorem diam, interdum nec nibh eu, pharetra viverra sem. Sed venenatis urna eu pellentesque mollis.
    Suspendisse tincidunt tempus metus, vitae gravida ipsum sodales vitae. Vivamus pellentesque, est et suscipit egestas, nisl neque vestibulum turpis, sed lobortis leo mi a felis. Vivamus non velit quis nunc porta viverra. Praesent blandit nibh vitae sapien finibus vestibulum. Proin maximus eget purus quis vulputate. Praesent congue nisl nisi, quis congue risus finibus eget. Cras ullamcorper augue ligula. Donec gravida efficitur mauris, eu posuere nisl consequat a. Nunc quis posuere nisi, id imperdiet magna. In ut aliquam odio. Nulla et interdum nulla. Duis viverra massa sed elit laoreet, a imperdiet lacus sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse efficitur lobortis luctus.  
    Nullam ac tempus justo, vitae elementum ante. Pellentesque nec nibh consequat, pulvinar dolor nec, tincidunt lorem. Curabitur tristique ipsum erat, ut ornare metus convallis condimentum. Donec gravida nibh id tristique dictum. Aenean egestas sapien sed metus tristique, quis posuere est imperdiet. Duis efficitur eros nisi, sed ultrices mauris placerat sit amet. Etiam et nulla pellentesque, dapibus nunc ut, tempus turpis. Phasellus risus metus, laoreet at molestie sed, auctor non lectus. Nam scelerisque nulla sit amet quam tincidunt iaculis. Cras vitae lectus enim. Vivamus sodales ornare rutrum. Sed a purus vel orci volutpat vulputate ac ut enim. Nulla nulla diam, viverra in magna at, pharetra condimentum arcu. Nulla eget faucibus est.`;

  return loremIpsum
    .split('.')
    .slice(0, taskImageNames.length)
    .map((sentence, index) => ({
      id: index,
      imageName: taskImageNames[index],
      name: sentence.trim().split(' ').slice(0, 2).join(' '),
      description: `${sentence}.`,
      isOpen: true
    }));
};

const ensureInitialData = (tasks: Task[]): Task[] =>
  tasks || getMockInitialTasks();

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private storage: StorageMap) { }

  get(condition?: Prediction<Task>): Observable<Task[]> {
    return this.storage.get(key).pipe(
      map<any, Task[]>(ensureInitialData),
      map(tasks => condition ? tasks.filter(condition) : tasks)
    ) as Observable<Task[]>;
  }

  update(changedTask: Task): Observable<Task[]> {
    return this.storage.get(key).pipe(
      map(ensureInitialData),
      map((tasks: Task[]) => {
        const position = _.findIndex(tasks, task => task.id === changedTask.id);
        
        return Object.assign(
          [],
          tasks,
          {
            [position]: {
              ...tasks[position],
              isOpen: changedTask.isOpen
            }
          });
      }),
      switchMap((updatedTasks: Task[]) =>
        this.storage.set(key, updatedTasks).pipe(
          map(() => updatedTasks)
        )
      )
    );
  }
}

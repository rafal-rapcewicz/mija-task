import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import * as _ from 'lodash';

import { TasksService, getMockInitialTasks } from './tasks.service';
import { Task } from './model';

describe('TasksService', () => {
  let service: TasksService;
  let storageMapMock: jasmine.SpyObj<StorageMap>;

  beforeEach(() => {
    storageMapMock = jasmine.createSpyObj('StorageMap', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        { provide: StorageMap, useValue: storageMapMock }
      ]
    });

    service = TestBed.get(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('when indexDB is empty then should return predefined mocked data', (done: DoneFn) => {
      const mockedData = getMockInitialTasks();
      storageMapMock.get.and.returnValue(of(null));

      service.get().subscribe(tasks => {
        expect(_(tasks).differenceWith(mockedData, _.isEqual).isEmpty()).toBe(true);

        done();
      });
    });

    it('when indexDB contains data then that data should be returned', (done: DoneFn) => {
      const mockedData: Task[] = [
        {
          id: 1,
          imageName: 'imageNameFoo',
          name: 'nameFoo',
          description: 'descriptionFoo',
          isOpen: true
        }
      ];
      storageMapMock.get.and.returnValue(of(mockedData));

      service.get().subscribe(tasks => {
        expect(tasks).toBe(mockedData);

        done();
      });
    });
  });

  describe('update', () => {
    it('when indexDB is empty then should update correct item by its id', (done: DoneFn) => {
      const change: any = {
        id: 0,
        isOpen: false
      };
      storageMapMock.get.and.returnValue(of(null));
      storageMapMock.set.and.returnValue(of(null));

      service.update(change).subscribe(updatedTasks => {
        expect(updatedTasks[0].isOpen).toBe(false);

        done();
      });
    });

    it('when indexDB contains data then should update correct item by its id', (done: DoneFn) => {
      const mockedData: Task[] = [
        {
          id: 1,
          imageName: 'imageNameFoo',
          name: 'nameFoo',
          description: 'descriptionFoo',
          isOpen: true
        }
      ];
      const change: any = {
        id: 1,
        imageName: '-',
        name: '-',
        description: '-',
        isOpen: false
      };
      storageMapMock.get.and.returnValue(of(mockedData));
      storageMapMock.set.and.returnValue(of(null));

      service.update(change).subscribe(updatedTasks => {
        expect(_.isEqual(updatedTasks[0], change)).toBe(true);

        done();
      });
    });
  });
});

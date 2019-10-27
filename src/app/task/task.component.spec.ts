import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
       ],
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.task = {
      id: 1,
      imageName: 'mockImageName',
      name: 'mockName',
      description: 'mockDescription',
      isOpen: true
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});

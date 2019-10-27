import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TriStateCheckboxComponent } from './tri-state-checkbox/tri-state-checkbox.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        TriStateCheckboxComponent,
        TaskComponent,
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mija-task'`, () => {
    expect(app.title).toEqual('Mija Task');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header h1').textContent).toContain(app.title);
  });
});

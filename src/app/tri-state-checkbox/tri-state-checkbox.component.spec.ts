import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TriStateCheckboxComponent } from './tri-state-checkbox.component';

describe('TriStateCheckboxComponent', () => {
  let component: TriStateCheckboxComponent;
  let fixture: ComponentFixture<TriStateCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatCheckboxModule ],
      declarations: [ TriStateCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriStateCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

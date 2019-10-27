import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TasksService } from './tasks.service';
import { Task, Prediction } from './model';

interface Filter {
  phrase: string;
  isOpen: boolean;
}

const getCondition = (filter: Filter): Prediction<Task> => {
  const phrase = filter.phrase ? filter.phrase.toLowerCase() : filter.phrase;

  return (task: Task) =>
    (
      typeof filter.isOpen === 'boolean'
        ? task.isOpen === filter.isOpen
        : true
    )
    && (
      filter.phrase
        ? (task.name.toLowerCase().indexOf(phrase) !== -1 || task.description.toLowerCase().indexOf(phrase) !== -1)
        : true
    );
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Mija Task';
  form: FormGroup;
  tasks$: Observable<Task[]>;
  tasksChanged$: Subject<Task[]> = new Subject();

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService) {
  }

  ngOnInit() {
    this.setupForm();

    this.tasks$ = merge(
      this.tasksService.get(),
      this.form.valueChanges.pipe(
        switchMap(value => this.tasksService.get(
          getCondition(value)))
      ),
      this.tasksChanged$.pipe(
        map(changedTasks => changedTasks.filter(
          getCondition(this.form.value)
        ))
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onTaskChanged(changedTask: Task) {
    this.subscriptions.push(
      this.tasksService.update(changedTask).subscribe(updatedTasks =>
        this.tasksChanged$.next(updatedTasks))
    )
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      phrase: [null],
      isOpen: [null]
    });
  }
}

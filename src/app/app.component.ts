import { Component, OnInit } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
export class AppComponent implements OnInit {
  readonly title = 'Mija Task';
  form: FormGroup;
  tasks$: Observable<Task[]>;

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService) {
  }

  ngOnInit() {
    this.setupForm();

    this.tasks$ = merge(
      this.tasksService.get(),
      this.form.get('phrase').valueChanges.pipe(
        switchMap(value => this.tasksService.get(
          getCondition({
            phrase: value,
            isOpen: this.form.get('isOpen').value
          })))
      )
    );

    this.tasks$.subscribe(x => console.log(`tasks$: ${JSON.stringify(x)}`))
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      phrase: [null],
      isOpen: [null]
    });
  }
}

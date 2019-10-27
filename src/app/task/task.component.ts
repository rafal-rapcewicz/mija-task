import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Task } from '../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  @Output() changed = new EventEmitter<Task>();

  isOpen: FormControl;

  private subscriptions: Subscription[] = [];

  get imagePath(): string {
    return `../../assets/images/${this.task.imageName}.png`;
  }

  constructor() { }

  ngOnInit() {
    this.isOpen = new FormControl(this.task.isOpen);

    this.subscriptions.push(
      this.isOpen.valueChanges.subscribe(value => this.changed.emit({
        ...this.task,
        isOpen: value
      }))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

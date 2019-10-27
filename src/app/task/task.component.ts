import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Task } from '../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  isOpen: FormControl;

  get imagePath(): string {
    return `../../assets/images/${this.task.imageName}.png`;
  }

  constructor() { }

  ngOnInit() {
    this.isOpen = new FormControl(this.task.isOpen);
  }

}

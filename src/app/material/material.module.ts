import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }

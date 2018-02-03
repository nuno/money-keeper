import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [],
  exports: [
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}

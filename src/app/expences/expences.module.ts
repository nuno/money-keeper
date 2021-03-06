import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { AddExpenceComponent } from './add-expence/add-expence.component';
import { LogComponent } from './log/log.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {ExpencesRoutingModule} from './expences-routing.module';
import { ExpencesComponent } from './expences.component';
import {SharedModule} from '../shared/shared.module';
import {MainCreateCategoryComponent} from "./create-category/create-category.component";
// import {BrowserModule} from "@angular/platform-browser";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    ExpencesRoutingModule,
    SharedModule,
    // BrowserAnimationsModule,
    NgxChartsModule
  ],
  declarations: [CategoriesComponent, AddExpenceComponent, LogComponent, StatisticsComponent, ExpencesComponent, MainCreateCategoryComponent]
})
export class ExpencesModule { }

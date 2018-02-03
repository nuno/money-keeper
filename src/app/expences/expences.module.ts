import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { AddExpenceComponent } from './add-expence/add-expence.component';
import { LogComponent } from './log/log.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {ExpencesRoutingModule} from './expences-routing.module';
import { ExpencesComponent } from './expences.component';

@NgModule({
  imports: [
    CommonModule,
    ExpencesRoutingModule
  ],
  declarations: [CategoriesComponent, AddExpenceComponent, LogComponent, StatisticsComponent, ExpencesComponent]
})
export class ExpencesModule { }

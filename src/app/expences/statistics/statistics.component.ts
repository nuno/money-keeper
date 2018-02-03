import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mk-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

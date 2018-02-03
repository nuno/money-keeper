import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mk-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

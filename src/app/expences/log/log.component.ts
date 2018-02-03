import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'mk-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent implements OnInit {
  expenses: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.expenses = this.db.collection('expenses').valueChanges();
  }
  ngOnInit() {
  }
}

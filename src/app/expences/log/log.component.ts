import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'mk-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent implements OnInit {
  expenses$: Observable<any[]>;

  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      let path = `users/${user.uid}/expenses`;
      console.log(`path: ${JSON.stringify(path)}`);
      this.expenses$ = this.db.collection(path).valueChanges();

      // this.db.collection(path).valueChanges().subscribe(() => {
      //   console.log(`new Date: ${JSON.stringify(new Date())}`);
      // });
    });
  }

  ngOnInit() {
  }

  addExpense() {
    this.router.navigate(['expenses/add']);
  }
}

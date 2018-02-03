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
  categories: any[];

  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
    const self = this;
    this.afAuth.authState.subscribe(user => {
      const path = `users/${user.uid}/expenses`;
      this.expenses$ = this.db.collection(path).valueChanges();

      this.db.collection(`users/${user.uid}/categories`).snapshotChanges().subscribe(categories => {
        self.categories = categories.map(c => {
          const data = c.payload.doc.data();
          data.id = c.payload.doc.id;
          return data;
        });
      });
    });
  }

  ngOnInit() {
  }

  addExpense() {
    this.router.navigate(['expenses/add']);
  }

  getCategory(categoryId) {
    for (let x of this.categories){
      if (x.id === categoryId){
        return x.title;
      }
    }
  }
}

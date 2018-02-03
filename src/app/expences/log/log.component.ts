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
    let self = this;
    this.afAuth.authState.subscribe(user => {
      let path = `users/${user.uid}/expenses`;
      this.expenses$ = this.db.collection(path).valueChanges();

      this.db.collection(`users/${user.uid}/categories`).snapshotChanges().subscribe(categories => {
        self.categories = categories.map(c => {
          let data = c.payload.doc.data();
          data.id = c.payload.doc.id;
          return data;
        });
        console.log(`self.categories: ${JSON.stringify(self.categories)}`);
      });

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

  getCategory(categoryId) {
    for (let x of this.categories){
      if (x.id === categoryId){
        return x.title;
      }
    }
  }
}

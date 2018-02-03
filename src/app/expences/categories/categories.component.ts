import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'mk-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  categories: Observable<any[]>;

  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.categories = this.db.collection(`users/${user.uid}/categories`).valueChanges();
    });
  }

  ngOnInit() {
  }


  addCategory() {
    this.router.navigate(['expenses/add-category']);
  }
}

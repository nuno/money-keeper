import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, map, switchMap} from 'rxjs/operators';
import {getEntityWithId} from '../../shared/helpers/firestore.helper';


@Component({
  selector: 'mk-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  categories = this.afAuth.authState
    .pipe(
      filter(user => !!user),
      switchMap(user => this.db.collection(`users/${user.uid}/categories`)
        .snapshotChanges()
        .pipe(
          map(getEntityWithId)
        )
      )
    );

  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {

  }


  addCategory() {
    this.router.navigate(['/expenses/add-category']);
  }

  addExpense(category) {
    this.router.navigate([`/expenses/add/${category.id}`]);
  }
}

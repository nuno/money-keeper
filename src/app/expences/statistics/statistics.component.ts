import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {getEntityWithId} from "../../shared/helpers/firestore.helper";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'mk-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit, OnDestroy {

  data = [];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // expenses$: Observable<any[]>;
  categories: any[];
  sub = new Subscription();

  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth,
              private cd: ChangeDetectorRef) {
    this.sub.add(this.afAuth.authState.subscribe(user => {
      this.db.collection(`users/${user.uid}/expenses`)
        .snapshotChanges()
        .pipe(
          map(getEntityWithId)
        ).subscribe((expenses => {

        this.db.collection(`users/${user.uid}/categories`)
          .snapshotChanges()
          .pipe(
            map(getEntityWithId)
          )
          .subscribe(categories => {
            for (let category of categories) {
              let sum = 0;
              for (let expense of expenses) {
                if (expense.category === category.id) {
                  sum += expense.amount;
                }
              }
              this.data = [...this.data, {
                name: category.title,
                value: sum
              }];
              sum = 0;
            }
            this.cd.detectChanges();
          });
      }));
    }));
  }


  getCategory(categoryId) {
    for (let x of this.categories) {
      if (x.id === categoryId) {
        return x.title;
      }
    }
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

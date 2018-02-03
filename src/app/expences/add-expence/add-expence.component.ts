import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Expense} from '../../data-access/expense.interface';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'mk-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenceComponent implements OnInit {
  form: FormGroup;
  expenses: AngularFirestoreCollection<any>;
  categories: any[];

  constructor(private router: Router, private fb: FormBuilder, private db: AngularFirestore, private afAuth: AngularFireAuth) {
    let self = this;
    this.afAuth.authState.subscribe(user => {
        this.db.collection(`users/${user.uid}/categories`).snapshotChanges().subscribe(categories => {
          self.categories = categories.map(c => {
            let data = c.payload.doc.data();
            data.id = c.payload.doc.id;
            return data;
          });
        });


        // .
        // valueChanges().subscribe((categories) => {
        //   console.log(`categories: ${JSON.stringify(categories)}`);
        //   // this.categories$
        // });
        this.expenses = this.db.collection(`users/${user.uid}/expenses`);
      }
    )
    ;
  }

  ngOnInit() {
    this.initForm();
  }

  submit(): void {
    if (this.isSubmitDisabled()
    ) {
      return;
    }
    const expense: Expense = {
      amount: +this.form.value.amount,
      category: this.form.value.category,
      comment: this.form.value.comment,
      createdAt: new Date()
    };

    console.log(`expense: ${JSON.stringify(expense)}`);
    this.expenses.add(expense)
      .then(function (docRef) {
        console.log('Expense added: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding expense: ', error);
      });

    this.router.navigate(['/expenses/logs']);
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  goToMainPage() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
  }

  initForm() {
    this.form = this.fb.group({
      'amount': [undefined, Validators.required],
      'category': [undefined, Validators.required],
      'comment': [undefined]
    });
  }
}

import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {Expense} from '../../data-access/expense.interface';
import {Category} from '../../data-access/category.interface';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'mk-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenceComponent implements OnInit {
  form: FormGroup;
  categories: Observable<any[]>;

  constructor(private router: Router, private fb: FormBuilder, private db: AngularFirestore) {
    this.categories = this.db.collection('categories').valueChanges();
  }

  ngOnInit() {
    this.initForm();
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const expense: Expense = {
      amount: +this.form.value.amount,
      category: this.form.value.category,
      comment: this.form.value.comment,
      createdAt: new Date()
    };

    console.log(`expense: ${JSON.stringify(expense)}`);
    this.db.collection('expenses').add(expense)
      .then(function (docRef) {
        console.log('Expense added: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding expense: ', error);
      });

    this.router.navigate(['/expenses']);
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  goToMainPage() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
  }

  private initForm() {
    this.form = this.fb.group({
      'amount': [undefined, Validators.required],
      'category': [undefined, Validators.required],
      'comment': [undefined]
    });
  }
}

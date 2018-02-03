import {Component, OnInit} from '@angular/core';
import {Category} from '../../data-access/category.interface';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'mk-main-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.sass'],
})
export class MainCreateCategoryComponent implements OnInit {
  form: FormGroup;
  categories: AngularFirestoreCollection<any>;

  constructor(private router: Router,
              private fb: FormBuilder, private db: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.categories = this.db.collection(`users/${user.uid}/categories`);
    });
    this.initForm();
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const category: Category = {
      title: this.form.value.title, createdAt: new Date()
    };

    console.log(`category: ${JSON.stringify(category)}`);



    this.categories.add(category)
      .then(function (docRef) {
        console.log('Category added: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding category: ', error);
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
      'title': ['', Validators.required]
    });
  }
}

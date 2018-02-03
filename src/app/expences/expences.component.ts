import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from "angularfire2/firestore";


@Component({
  selector: 'mk-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpencesComponent implements OnInit {
  user$: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      console.log('user:', user);

      let uid = user.uid;
      this.db.doc(`users/${user.uid}`).valueChanges().subscribe(user => {
        if (user === null) {
          this.db.doc(`users/${uid}`).set({categories: {}, expenses: {}});
          console.log(`added`);
        }
      });

      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }

  signOut(): void {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/']))
      .catch(console.error);
  }

}

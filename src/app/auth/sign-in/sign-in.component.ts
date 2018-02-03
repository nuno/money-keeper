import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'mk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.sub.add(
      this.afAuth.authState.pipe(filter(user => !!user)).subscribe(() => this.router.navigate(['/expenses']))
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  signIn(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['/expenses']))
      .catch(console.error);
  }
}

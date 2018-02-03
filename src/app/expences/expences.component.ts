import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase/app';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'mk-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpencesComponent implements OnInit {
  user$: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      console.log('user:', user);
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

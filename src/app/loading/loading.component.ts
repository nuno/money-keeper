import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'mk-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/auth']);
  }

}

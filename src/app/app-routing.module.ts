import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadingComponent} from './loading/loading.component';


const routes: Routes = [
  {
    path: '',
    component: LoadingComponent
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'expences',
    loadChildren: './expences/expences.module#ExpencesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

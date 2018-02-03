import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [SignInComponent]
})
export class AuthModule {
}

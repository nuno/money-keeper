import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [SignInComponent]
})
export class AuthModule {
}

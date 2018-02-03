import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';


const matModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule
];

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    ...matModules
  ]
})
export class MaterialModule {
}

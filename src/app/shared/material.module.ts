import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';


const matModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
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

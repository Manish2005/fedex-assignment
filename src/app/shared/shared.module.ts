import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {HeaderComponent, FooterComponent, CardComponent, InputErrorComponent} from './components';
import {AutofocusDirective} from './directives';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    InputErrorComponent,

    AutofocusDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    InputErrorComponent,
    AutofocusDirective
  ]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'sign-up'
}, {
  path: 'sign-up',
  pathMatch: 'full',
  component: SignUpComponent
}, {
  path: '**',
  redirectTo: 'sign-up'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

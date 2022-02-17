import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { FirebaseLogoutComponent } from './firebase-logout/firebase-logout.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { PublicationComponent } from './publication/publication.component';

const routes: Routes = [
  {path: 'login', component: FirebaseLoginComponent},
  {path: 'logout', component: FirebaseLogoutComponent},
  {path: 'phone-login', component: PhoneLoginComponent},
  {path: 'publication', component: PublicationComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

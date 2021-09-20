import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { FirebaseLoginHandlerComponent } from './firebase-login-handler/firebase-login-handler.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicationComponent } from './publication/publication.component';
import { FirebaseLogoutComponent } from './firebase-logout/firebase-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    FirebaseLoginHandlerComponent,
    FirebaseLoginComponent,
    PublicationComponent,
    FirebaseLogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

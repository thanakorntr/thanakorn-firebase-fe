import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { FirebaseLoginHandlerComponent } from './firebase-login-handler/firebase-login-handler.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicationComponent } from './publication/publication.component';
import { FirebaseLogoutComponent } from './firebase-logout/firebase-logout.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { WindowService } from './window.service';

@NgModule({
  declarations: [
    AppComponent,
    FirebaseLoginHandlerComponent,
    FirebaseLoginComponent,
    PublicationComponent,
    FirebaseLogoutComponent,
    PhoneLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BackendService, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }

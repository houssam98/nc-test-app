import * as firebase from 'firebase/compat/app';
firebase.default.initializeApp(environment.firebase);
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from 'src/auth/auth.module';
import { WindowService } from 'src/window.service';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { Firestore } from 'src/firestore';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    AuthModule,
  ],
  providers: [Firestore, WindowService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

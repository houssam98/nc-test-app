import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AuthModule } from 'src/auth/auth.module';
import { WindowService } from 'src/window.service';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AuthGuard } from './guards/auth.guard';
import { Firestore } from 'src/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    // MATERIAL
    MatButtonModule,
  ],
  providers: [Firestore, WindowService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RecaptchaVerifier, User } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;

  auth$ = this.auth.authState.pipe(
    tap((user) => (user ? (this.userNumber = user.phoneNumber) : {}))
  );

  userNumber!: string | null;

  constructor(private auth: AngularFireAuth) {}

  get currentUser() {
    return this.auth.currentUser;
  }

  async login(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) {
    return this.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
  }

  async logout() {
    return this.auth.signOut();
  }

  getRecaptchaVerifier() {
    return new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
      size: 'invisible',
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response);
      },
    });
  }

  createUser(phoneNumber: string) {
    // this.auth.creat
  }
}

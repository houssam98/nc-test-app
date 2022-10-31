import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RecaptchaVerifier, User } from 'firebase/auth';
import { of, switchMap } from 'rxjs';
import { Firestore } from 'src/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;

  auth$ = this.auth.authState.pipe(
    switchMap((next) => (next ? this.fs.doc(`users/${next.uid}`) : of(null)))
  );

  constructor(
    @Optional() private auth: AngularFireAuth,
    private fs: Firestore
  ) {}

  get currentUser() {
    return this.auth.currentUser;
  }

  async login(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) {
    return this.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
  }

  async logout() {
    return this.auth.signOut();
  }

  verifyLoginCode(verificationCode: string) {
    window.confirmationResult
      .confirm(verificationCode)
      .then((result: any) => {
        this.user = result.user;
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
  }

  createUser(phoneNumber: string) {
    // this.auth.creat
  }
}

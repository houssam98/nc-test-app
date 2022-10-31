import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WindowService } from 'src/window.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export class PhoneNumber {
  country!: string;
  area!: string;
  prefix!: string;
  line!: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  phoneNumber = new FormControl('', Validators.required);

  verificationCode = new FormControl('', Validators.required);

  windowRef: any;

  error!: any;

  constructor(private win: WindowService) {}

  ngAfterViewInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'phone-sign-in-recaptcha',
      {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      }
    );
    this.windowRef.recaptchaVerifier.render();
  }

  async onSubmit() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    if (this.phoneNumber.valid && this.phoneNumber.value) {
      await firebase
        .auth()
        .signInWithPhoneNumber(`+${this.phoneNumber.value}`, appVerifier)
        .then((res) => {
          console.log(res);
          this.windowRef.confirmationResult = res;
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        });
    } else {
      this.error = 'Invalid phone number';
    }
  }

  onVerify() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
  }
}

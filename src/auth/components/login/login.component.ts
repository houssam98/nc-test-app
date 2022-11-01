import { AfterViewInit, Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { WindowService } from 'src/window.service'
import { AuthService } from 'src/auth/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  phoneNumber = new FormControl('', Validators.required)

  verificationCode = new FormControl('', Validators.required)

  windowRef: any

  error!: any

  constructor(
    private win: WindowService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = this.authService.getRecaptchaVerifier()
    this.windowRef.recaptchaVerifier.render()
  }

  async onSubmit() {
    const appVerifier = this.windowRef.recaptchaVerifier
    if (this.phoneNumber.valid && this.phoneNumber.value) {
      await this.authService
        .login(`+${this.phoneNumber.value}`, appVerifier)
        .then((res) => {
          this.windowRef.confirmationResult = res
        })
        .catch((error) => {
          console.log(error)
          this.error = error
        })
    } else {
      this.error = 'Invalid phone number'
    }
  }

  onVerify() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode.value)
      .then((result: any) => {
        console.log(result)
        this.router.navigate(['/profile'])
      })
      .catch((error: any) => {
        console.log(error);
        this.error = error;
      })
  }
}

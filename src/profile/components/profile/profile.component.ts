import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { take } from 'rxjs'
import { AuthService } from 'src/auth/services/auth.service'
import { Firestore } from 'src/firestore'
import { ProfileService } from '../../services/profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.profileService.profile$.pipe(take(1)).subscribe((profile: any) => {
      this.form.patchValue(profile)
    })
  }

  saveProfile() {
    this.form.markAllAsTouched()

    if (this.form.valid) {
      this.profileService.saveProfile(this.form.value).then(() =>
        this.snackbar.open('Profile has been updated!', 'Dismiss', {
          duration: 3000,
        }),
      )
    }
  }
}

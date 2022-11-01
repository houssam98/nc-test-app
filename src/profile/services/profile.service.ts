import { Injectable } from '@angular/core'
import { AuthService } from 'src/auth/services/auth.service'
import { Firestore } from 'src/firestore'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private authService: AuthService, private fs: Firestore) {}

  profile$ = this.fs.doc(`users/${this.authService.userNumber as string}`)

  saveProfile(data: { name: string; email: string }) {
    return this.fs.set('users', this.authService.userNumber as string, data)
  }
}

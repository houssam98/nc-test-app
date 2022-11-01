import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'firebase/auth'
import { Observable } from 'rxjs'
import { AuthService } from 'src/auth/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nc-test-app'

  auth$!: Observable<any>

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth$ = this.authService.auth$
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']))
  }
}

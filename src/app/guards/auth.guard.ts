import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.auth$.pipe(
      map((user) => {
        console.log(user);
        if (!user) {
          this.router.navigate(['/login']);
        }
        return !!user;
      })
    );
  }
}

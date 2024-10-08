import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(): boolean {
    if (this.usersService.isLoggedIn()) {
      this.usersService.resetTimeout(); // Resetear el tiempo de inactividad
      return true;
    } else {
      this.router.navigate(['/registro']);
      return false;
    }
  }
}

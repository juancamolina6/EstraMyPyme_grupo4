import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser = {
    id: 1,
    name: 'erika',
    email: 'contacto@empresaabc.com',
    role: 'admin'
  };

  constructor() {}

  getLoggedInUser() {
    return this.loggedInUser;
  }
}

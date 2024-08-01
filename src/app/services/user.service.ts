import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../components/user-detail/user-detail.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users'; // URL de la API de json-server
  private loginUrl = 'http://localhost:3000/login'; // URL para la autenticación

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Método para validar al usuario
  validateUser(email: string, password: string): Observable<{ success: boolean }> {
    return this.httpClient.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0 && users[0].password === password) {
          return { success: true };
        } else {
          return { success: false };
        }
      })
    );
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../components/user-detail/user-detail.component';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users'; // URL de la API de json-server
  private loginUrl = 'http://localhost:3000/login'; // URL para la autenticación

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      map((response: any) => {
        const users: User[] = [];
        if (response.users && Array.isArray(response.users)) {
          response.users.forEach((userGroup: any) => {
            if (userGroup.admin && Array.isArray(userGroup.admin)) {
              users.push(...userGroup.admin.map((user: any) => ({ ...user, type: 'admin' })));
            }
            if (userGroup.companies && Array.isArray(userGroup.companies)) {
              users.push(...userGroup.companies.map((user: any) => ({ ...user, type: 'company' })));
            }
            if (userGroup.Consultores && Array.isArray(userGroup.Consultores)) {
              if (userGroup.Consultores[0].profesores && Array.isArray(userGroup.Consultores[0].profesores)) {
                users.push(...userGroup.Consultores[0].profesores.map((user: any) => ({ ...user, type: 'profesor' })));
              }
              if (userGroup.Consultores[0].estudiantes && Array.isArray(userGroup.Consultores[0].estudiantes)) {
                users.push(...userGroup.Consultores[0].estudiantes.map((user: any) => ({ ...user, type: 'estudiante' })));
              }
            }
          });
        }
        return users;
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/all/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/all`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/all/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/all/${id}`);
  }

  // Método para validar al usuario
  validateUser(
    email: string,
    password: string
  ): Observable<{ success: boolean }> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/all?email=${email}`).pipe(
      map((users) => {
        if (users.length > 0 && users[0].password === password) {
          return { success: true };
        } else {
          return { success: false };
        }
      })
    );
  }
}

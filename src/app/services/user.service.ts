import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../components/user-detail/user-detail.component';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/'; // URL de la API de json-server
  private readonly TIMEOUT = 20 * 60 * 1000; // 30 minutos
  private lastActivityTime: number = Date.now();
  private inactivityInterval: any;
  private sessionExpired$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

  resetTimeout() {
    this.lastActivityTime = Date.now();
  }
  startInactivityCheck() {
    if (this.inactivityInterval) {
      clearInterval(this.inactivityInterval);
    }
    this.inactivityInterval = setInterval(() => {
      if (Date.now() - this.lastActivityTime > this.TIMEOUT) {
        this.logout(); // Logout si el usuario ha estado inactivo por más de TIMEOUT
      }
    }, 1000); // Comprobación cada segundo
  }

  logout() {
    localStorage.removeItem('userToken'); // Borra el token de usuario
    localStorage.removeItem('userRole');  // Borra el rol de usuario
    clearInterval(this.inactivityInterval); // Detiene el chequeo de inactividad
    this.sessionExpired$.next(true);
    this.router.navigate(['/login']); // Redirige al login
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }
  getSessionExpired(): Observable<boolean> {
    return this.sessionExpired$.asObservable();
  }

  // Método para obtener todos los usuarios permitidos según el rol del usuario logueado
  getAllUsers(): Observable<User[]> {
    const role = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    if (role === 'admin') {
      // El admin puede ver todos los usuarios
      return forkJoin([
        this.getCompanies(),
        this.getProfessors(),
        this.getStudents(),
      ]).pipe(
        map(([companies, professors, students]) => [
          ...companies,
          ...professors,
          ...students,
        ])
      );
    } else if (role === 'profesor') {
      // Los profesores solo pueden ver estudiantes y empresas asignadas
      return forkJoin([
        this.getCompaniesByProfessorId(Number(userId)),
        this.getStudentsByProfessorId(Number(userId)),
      ]).pipe(
        map(([companies, students]) => [
          ...companies,
          ...students,
        ])
      );
    } else {
      // Otros roles no pueden ver usuarios (esto puede ajustarse según la necesidad)
      return new Observable<User[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  }
  getUsersByType(type: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}${type}`);
  }
  
  getCompanies(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}companies`);
  }

  getProfessors(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}profesores`);
  }

  getStudents(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}estudiantes`);
  }

  // Obtener estudiantes asignados al profesor logueado
  getStudentsByProfessorId(profesorId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}estudiantes?profesorId=${profesorId}`);
  }

  // Obtener empresas asignadas al profesor logueado
  getCompaniesByProfessorId(profesorId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}companies?profesorId=${profesorId}`);
  }

  // Método para actualizar un usuario
  updateUser(user: User): Observable<User> {
    let url = `${this.apiUrl}`;
    if (user.type === 'company') {
      url += `companies/${user.id}`;
    } else if (user.type === 'profesor') {
      url += `profesores/${user.id}`;
    } else if (user.type === 'estudiante') {
      url += `estudiantes/${user.id}`;
    }
    return this.httpClient.put<User>(url, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // Método para eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }


  // Método para validar al usuario
  validateUser(
    email: string,
    password: string
  ): Observable<{ success: boolean; role: string, userId: number }> {
    return this.httpClient
      .get<User[]>(`${this.apiUrl}admins?email=${email}`)
      .pipe(
        map((users) => {
          if (users.length > 0 && users[0].password === password) {
            return { success: true, role: users[0].role, userId: users[0].id };
          } else {
            return { success: false, role: 'usuario no existe', userId: 0 };
          }
        })
      );
  }
}

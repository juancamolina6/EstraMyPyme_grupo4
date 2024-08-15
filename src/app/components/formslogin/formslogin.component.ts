import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-formslogin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,FormsModule],
  templateUrl: './formslogin.component.html',
  styleUrl: './formslogin.component.css'
})
export class FormsloginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  login(): void {
    this.usersService.validateUser(this.email, this.password).subscribe(
      (response) => {
        if (response.success && response.role === 'admin') {
          localStorage.setItem('userToken', 'some-auth-token'); // Guarda el token o alguna señal de autenticación
          this.usersService.getAllUsers().subscribe((users) => {
            this.sharedService.setUsers(users);
            this.router.navigate(['/administracion']);
          });
        } else {
          alert('Credenciales incorrectas o no autorizado');
        }
      },
      (error) => {
        console.error('Error de validación de inicio de sesión:', error);
      }
    );
  }
      
}

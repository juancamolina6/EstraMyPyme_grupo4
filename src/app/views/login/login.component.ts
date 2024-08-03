import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la redirección
import { UsersService } from '../../services/user.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private usersService: UsersService, private router: Router) { }

  login(): void {
    // Llama al método del servicio para validar al usuario
    this.usersService.validateUser(this.email, this.password).subscribe(
      response => {
        if (response.success) {
          // Redirige a la página de administración si la validación es exitosa
          this.router.navigate(['/administracion']);
        } else {
          // Muestra un mensaje de error si la validación falla
          alert('Credenciales incorrectas');
        }
      },
      error => {
        // Maneja el error aquí
        console.error('Error de validación de inicio de sesión:', error);
      }
    );
  }
}

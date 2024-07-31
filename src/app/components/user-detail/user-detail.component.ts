import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  empresa_asociada?: string;
  edad?: number;
  carrera?: string;
  semestre?: number;
  especialidad?: string;
  anos_experiencia?: number;
  cursos_impartidos?: string[];
  sector?: string;
  empleados?: number;
  fundacion?: number;
  productos?: string[];
  facturacion_anual?: number;
  estudantes_profesor?: number[];
  image?: string;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnChanges {
  @Input() user!: User;
  @Output() userUpdated = new EventEmitter<User>();
  editUser!: User;
  fieldsVisibility: { [key: string]: boolean } = {};
  isEditing: boolean = false;
  originalUser!: User;

  constructor(private usersService: UsersService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.originalUser = { ...this.user };
      this.editUser = { ...this.user };
      this.updateFieldVisibility();
    }
  }

  private updateFieldVisibility() {
    this.fieldsVisibility = {
      name: 'name' in this.editUser,
      email: 'email' in this.editUser,
      empresa_asociada: 'empresa_asociada' in this.editUser,
      edad: 'edad' in this.editUser,
      carrera: 'carrera' in this.editUser,
      semestre: 'semestre' in this.editUser,
      especialidad: 'especialidad' in this.editUser,
      anos_experiencia: 'anos_experiencia' in this.editUser,
      cursos_impartidos: 'cursos_impartidos' in this.editUser,
      sector: 'sector' in this.editUser,
      empleados: 'empleados' in this.editUser,
      fundacion: 'fundacion' in this.editUser,
      productos: 'productos' in this.editUser,
      facturacion_anual: 'facturacion_anual' in this.editUser,
    };
  }
  get visibleFields() {
    return Object.keys(this.fieldsVisibility)
      .filter((key) => this.fieldsVisibility[key])
      .slice(0, 3);
  }

  saveChanges() {
    if (this.isEditing) {
      this.usersService.updateUser(this.editUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          alert('Los datos se han guardado correctamente.');
          this.isEditing = false;
          this.user = { ...this.editUser }; // Actualizar el usuario original
          this.userUpdated.emit(this.user); // Emitir evento de usuario actualizado
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.isEditing = true;
    }
  }

  cancelEdit() {
    this.editUser = { ...this.originalUser }; // Restaurar los datos originales
    this.isEditing = false;
  }
}

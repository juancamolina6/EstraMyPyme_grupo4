import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnChanges {
  @Input() user!: User;
  fieldsVisibility: { [key: string]: boolean } = {};
  isEditing: boolean = false;
  originalUser!: User;

  constructor(private usersService: UsersService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.originalUser = { ...this.user }; 
      this.updateFieldVisibility();
    }
  }


  private updateFieldVisibility() {
    this.fieldsVisibility = {
      name: 'name' in this.user,
      email: 'email' in this.user,
      empresa_asociada: 'empresa_asociada' in this.user,
      edad: 'edad' in this.user,
      carrera: 'carrera' in this.user,
      semestre: 'semestre' in this.user,
      especialidad: 'especialidad' in this.user,
      anos_experiencia: 'anos_experiencia' in this.user,
      cursos_impartidos: 'cursos_impartidos' in this.user,
      sector: 'sector' in this.user,
      empleados: 'empleados' in this.user,
      fundacion: 'fundacion' in this.user,
      productos: 'productos' in this.user,
      facturacion_anual: 'facturacion_anual' in this.user,
    };
  }
  get visibleFields() {
    return Object.keys(this.fieldsVisibility).filter(key => this.fieldsVisibility[key]).slice(0, 3);
  }

  saveChanges() {
    if (this.isEditing) {
      this.usersService.updateUser(this.user).subscribe(response => {
        console.log('User updated successfully:', response);
        alert('Los datos se han guardado correctamente.');
        this.isEditing = false;
      }, error => {
        console.error('Error updating user:', error);
      });
    } else {
      this.isEditing = true;
    }
  }
  cancelEdit() {
    this.user = { ...this.originalUser }; // Restaurar los datos originales
    this.isEditing = false;
  }
}

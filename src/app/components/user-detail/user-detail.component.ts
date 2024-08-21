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
  success: boolean;
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  type: string;
  telefono?: string;
  companyName?: string;
  personType?: string;
  nit?: string;
  sector?: string;
  address?: string;
  phone?: string;
  website?: string;
  acceptTerms?: boolean;
  empresa_id?: number;
  Departamento?: string;
  programa?: string;
  año?: string;
  periodo?: string;
  empresa_asignada: number[];
  estudiante_asignado: number[];
  image?: string;
  nombre_empresa?: string[];
  nombre_estudiante?: string[];
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
      console.log(this.updateFieldVisibility(), 'datos');
    }
  }

  private updateFieldVisibility() {
    this.fieldsVisibility = {
      name: 'name' in this.editUser,
      email: 'email' in this.editUser,
      programa: 'programa' in this.editUser,
      periodo: 'periodo' in this.editUser,
      sector: 'sector' in this.editUser,
      companyName: 'companyName' in this.editUser,
      nit: 'nit' in this.editUser,
      role: 'role' in this.editUser,
      password: 'password' in this.editUser,
      address: 'address' in this.editUser,
      phone: 'phone' in this.editUser,
      website: 'website' in this.editUser,
      empresa_asignada: 'empresa_asignada' in this.editUser,
      estudante_asignado: 'estudante_asignado' in this.editUser,
      nombre_empresa: Array.isArray(this.editUser.nombre_empresa) && this.editUser.nombre_empresa.length > 0,
      nombre_estudiantes: Array.isArray(this.editUser.nombre_estudiante) && this.editUser.nombre_estudiante.length > 0,
    };
  }

  get visibleFields() {
    return Object.keys(this.fieldsVisibility)
      .filter((key) => this.fieldsVisibility[key])
      .slice(0, 3);
  }
  get userName(): string {
    return this.editUser.name || '';
  }

  set userName(value: string) {
    if ('name' in this.editUser) {
      this.editUser.name = value;
    }
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
  addEmpresa(empresa: string) {
    if (empresa && !this.editUser.nombre_empresa?.includes(empresa)) {
      this.editUser.nombre_empresa?.push(empresa);
    }
  }

  removeEmpresa(index: number) {
    this.editUser.nombre_empresa?.splice(index, 1);
  }

  addEstudiante(estudiante: string) {
    if (estudiante && !this.editUser.nombre_estudiante?.includes(estudiante)) {
      this.editUser.nombre_estudiante?.push(estudiante);
    }
  }

  removeEstudiante(index: number) {
    this.editUser.nombre_estudiante?.splice(index, 1);
  }
}

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
  'id-empresa'?: number | number[];
  'id-estudante'?: number[];
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
      programa: 'programa' in this.editUser,
      periodo: 'periodo' in this.editUser,
      sector: 'sector' in this.editUser,
      companyName: 'companyName' in this.editUser,
      nit: 'nit' in this.editUser,
    };
  }

  get visibleFields() {
    return Object.keys(this.fieldsVisibility)
      .filter((key) => this.fieldsVisibility[key])
      .slice(0, 3);
  }
  get userName(): string {
    return this.editUser.name|| '';
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
}

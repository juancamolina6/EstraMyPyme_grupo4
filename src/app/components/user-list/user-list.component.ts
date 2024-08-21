import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user-detail/user-detail.component';
import { SharedService } from '../../services/shared.service';
import { UsersService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  filteredUsers: User[] = [];
  allUsers: User[] = [];
  selectedUserType: string = 'Todos';
  selectedUser: User | null = null;
  searchTerm: string = '';
  
  @Input() students: User[] = [];
  @Input() companies: User[] = [];
  @Output() userSelected = new EventEmitter<User>();

  constructor(
    private usersService: UsersService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.onTabClick(this.selectedUserType);
  }

  // Cargar los usuarios según el tipo seleccionado
  onTabClick(type: string) {
    this.selectedUserType = type;

    if (type === 'Todos') {
      this.usersService.getAllUsers().subscribe(
        (users) => {
          this.allUsers = users;
          this.filterUsers();
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
    } else {
      const userType = this.getUserType(type);
      this.usersService.getUsersByType(userType).subscribe(
        (users) => {
          this.allUsers = users;
          this.filterUsers();
        },
        (error) => {
          console.error('Error loading users by type:', error);
        }
      );
    }
  }

  // Filtrar usuarios según el término de búsqueda
  filterUsers() {
    if (this.searchTerm) {
      this.filteredUsers = this.allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.allUsers;
    }
    this.selectFirstUser();
  }

  getUserType(selectedType: string): string {
    switch (selectedType) {
      case 'Profesores':
        return 'profesores';
      case 'Estudiantes':
        return 'estudiantes';
      case 'Empresas':
        return 'companies';
      default:
        return ''; // Si no se reconoce, retorna una cadena vacía
    }
  }

  onSearch() {
    this.filterUsers();
    }
  // Método para seleccionar automáticamente el primer usuario de la lista filtrada
  selectFirstUser() {
    if (this.filteredUsers.length > 0) {
      this.selectUser(this.filteredUsers[0]);
    }
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    this.selectedUser = user;
  }
}

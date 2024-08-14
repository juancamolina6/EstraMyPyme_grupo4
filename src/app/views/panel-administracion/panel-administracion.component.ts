import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import {
  UserDetailComponent,
  User,
} from '../../components/user-detail/user-detail.component';
import { ChartComponent } from '../../components/chart/chart.component';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-panel-administracion',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    UserListComponent,
    UserDetailComponent,
    ChartComponent,
  ],
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css'],
})
export class PanelAdministracionComponent {
  selectedUser!: User;
  users: User[] = [];

  constructor(private usersService: UsersService) {}
  selectedCompanyId: number | null = null;

  onUserSelected(user: User) {
    if (user && user.empresa_id) {
      this.selectedCompanyId = user.empresa_id;
    }
  }


  // Método para actualizar el usuario en la lista
  updateUser(updatedUser: User) {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.refreshUserList(); // Opcional: Puedes emitir un evento para notificar a otros componentes
    }
  }

  refreshUserList() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
}

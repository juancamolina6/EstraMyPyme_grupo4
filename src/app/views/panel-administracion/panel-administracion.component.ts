import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserDetailComponent, User } from '../../components/user-detail/user-detail.component';
import { ChartComponent } from '../../components/chart/chart.component';
import { UsersService } from '../../services/user.service';
import { CirculoDoradoComponent } from '../../components/circulo-dorado/circulo-dorado.component';
import { FuncionesglobalesComponent } from '../../components/funcionesglobales/funcionesglobales.component';
import { LogomassloganComponent } from '../../components/logomasslogan/logomasslogan.component';

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
    CirculoDoradoComponent,
    FuncionesglobalesComponent,
    LogomassloganComponent
  ],
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css'],
})
export class PanelAdministracionComponent implements OnInit {
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

  // Modo claro
  currentTheme: string = 'dark-mode'; // Valor por defecto

  ngOnInit() {
    // Inicializa el tema desde localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    this.currentTheme = savedTheme;
    
    // Inicializa el comportamiento del botón y loader
    this.initializeButtonLoader();
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  private initializeButtonLoader() {
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.querySelector('.button') as HTMLButtonElement;
      const loader = document.querySelector('.loader') as HTMLElement;
      const check = document.querySelector('.check') as HTMLElement;

      if (btn && loader && check) {
        btn.addEventListener('click', () => {
          loader.classList.add('active');
        });

        loader.addEventListener('animationend', () => {
          check.classList.add('active');
        });
      }
    });
  }
}

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
import { CounterService } from '../../services/counter.service';  // Importar el servicio

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
  pdfUrl: string | null = null;
  selectedCompanyId: number | null = null;

  // Variables para los contadores
  viewsCount!: number;
  downloadsCount!: number;
  registrationsCount!: number;

  constructor(private usersService: UsersService, private counterService: CounterService) {}  // Inyectar el servicio

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    this.currentTheme = savedTheme;

    // Inicializar el botón y el loader
    this.initializeButtonLoader();

    // Actualizar los contadores al iniciar
    this.updateCounts();
  }

  private updateCounts() {
    this.viewsCount = this.counterService.getViews();
    this.downloadsCount = this.counterService.getDownloads();
    this.registrationsCount = this.counterService.getRegistrations();
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  private initializeButtonLoader() {
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
  }

  // Subir archivo PDF
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.pdfUrl = reader.result as string; // Guardar la URL del PDF
        this.counterService.incrementDownloads();  // Incrementar descargas
        this.updateCounts();  // Actualizar contadores en la vista
      };

      reader.readAsDataURL(file); // Convertir el archivo a DataURL
    }
  }

  // Descargar PDF subido por el usuario
  downloadPDF() {
    if (this.pdfUrl) {
      const link = document.createElement('a');
      link.href = this.pdfUrl;
      link.download = 'archivo-subido.pdf'; // Nombre con el que se descargará el archivo
      link.click();
    }
  }

  // Descargar PDF desde Google Drive
  downloadPDFFromDrive() {
    const link = document.createElement('a');
    link.href = "https://drive.google.com/uc?export=download&id=1F0GuYyru106BSJyJJ1hwUUykuknqG71i";
    link.download = 'archivo.pdf'; // Nombre con el que se descargará el archivo
    link.click();
    
    this.counterService.incrementDownloads();  // Incrementar descargas
    this.updateCounts();  // Actualizar contadores en la vista
  }

  // Simula el evento de login
  onLogin() {
    this.counterService.incrementViews();
    this.updateCounts();
  }

  // Simula el evento de registro
  onRegister() {
    this.counterService.incrementRegistrations();
    this.updateCounts();
  }

  onUserSelected(user: User) {
    if (user && user.empresa_id) {
      this.selectedCompanyId = user.empresa_id;
    }
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.refreshUserList();
    }
  }

  refreshUserList() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  currentTheme: string = 'dark-mode';
}


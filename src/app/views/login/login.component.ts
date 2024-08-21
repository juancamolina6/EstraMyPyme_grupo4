import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { LogomassloganComponent } from "../../components/logomasslogan/logomasslogan.component";
import { FormsloginComponent } from "../../components/formslogin/formslogin.component";
import { FuncionesglobalesComponent } from '../../components/funcionesglobales/funcionesglobales.component';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-login',
  //imports: [SidebarComponent, RouterOutlet, FormsModule],
  standalone: true,
  imports: [SidebarComponent, FormsModule,RouterLink, RouterOutlet, LogomassloganComponent, FormsloginComponent, FuncionesglobalesComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private counterService: CounterService) {}

  onLoginSubmitted() {
    // Llamar al servicio para incrementar el contador de vistas
    this.counterService.incrementViews();
  }
}

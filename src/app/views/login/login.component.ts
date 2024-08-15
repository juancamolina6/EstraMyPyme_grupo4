import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { LogomassloganComponent } from "../../components/logomasslogan/logomasslogan.component";
import { FormsloginComponent } from "../../components/formslogin/formslogin.component";
import { FuncionesglobalesComponent } from '../../components/funcionesglobales/funcionesglobales.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SidebarComponent, FormsModule,RouterLink, RouterOutlet, LogomassloganComponent, FormsloginComponent, FuncionesglobalesComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserDetailComponent, User } from '../../components/user-detail/user-detail.component';
import { ChartComponent } from '../../components/chart/chart.component';


@Component({
  selector: 'app-panel-administracion',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    UserListComponent,
    UserDetailComponent,
    ChartComponent
  ],
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css']
})
export class PanelAdministracionComponent {
  selectedUser!: User; 
}

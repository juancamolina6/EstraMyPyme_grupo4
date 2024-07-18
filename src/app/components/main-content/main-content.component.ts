import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, UserDetailComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  users = [
    { name: 'Helena Hills', email: 'email@fakedomain.net', image: 'path/to/image1.jpg' },
    { name: 'Oscar Dum', email: 'email@fakedomain.net', image: 'path/to/image2.jpg' },
    // Más usuarios...
  ];

  editUser(user: any) {
    // Lógica para editar usuario
  }
}

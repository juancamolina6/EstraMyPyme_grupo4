import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<User>();

  users: User[] = [
    {
      id: 1,
      name: "Helena Hills",
      email: "email@fakedomain.net",
      empresa_asociada: "Empresa 1",
      type: "Estudiantes",
      edad: 22,
      carrera: "Ingeniería Agrónoma",
      semestre: 7,
      image: "path/to/image1.png"
    },
    {
      id: 2,
      name: "Carlo Emilion",
      empresa_asociada: "Empresa 2",
      email: "email@fakedomain.net",
      type: "Estudiantes",
      edad: 20,
      carrera: "Administración de Empresas",
      semestre: 5,
      image: "path/to/image1.png"
    },
    {
      id: 3,
      name: "Juan",
      empresa_asociada: "Empresa 1",
      email: "email@fakedomain.net",
      type: "Estudiantes",
      edad: 23,
      carrera: "Agronomía",
      semestre: 8,
      image: "path/to/image1.png"
    },
    {
      id: 4,
      name: "Oscar Dum",
      email: "email@fakedomain.net",
      type: "Profesores",
      especialidad: "Agricultura Sostenible",
      anos_experiencia: 15,
      cursos_impartidos: ["Agroecología", "Sistemas de Riego"],
      estudantes_profesor: [1, 3],
      image: "path/to/image1.png"
    },
    {
      id: 5,
      name: "Daniel Herrera",
      email: "email@fakedomain.net",
      type: "Profesores",
      especialidad: "Gestión Empresarial",
      anos_experiencia: 10,
      cursos_impartidos: ["Marketing Digital", "Finanzas para Emprendedores"],
      estudantes_profesor: [2],
      image: "path/to/image1.png"
    },
    {
      id: 6,
      sector: "agrario",
      name: "Empresa 1",
      email: "djpark@gmail.com",
      type: "Empresas",
      empleados: 50,
      fundacion: 2005,
      productos: ["Fertilizantes orgánicos", "Semillas certificadas"],
      facturacion_anual: 5000000,
      image: "path/to/image1.png"
    },
    {
      id: 7,
      sector: "comercio",
      name: "Empresa 2",
      email: "rojasmar@skiff.com",
      type: "Empresas",
      empleados: 75,
      fundacion: 1998,
      productos: ["Equipos de oficina", "Suministros de papelería"],
      facturacion_anual: 8000000,
      image: "path/to/image1.png"
    }
  ];

  selectedUserType: string = 'Estudiantes';
  selectedUserId: number | null = null;

  get filteredUsers() {
    return this.users.filter(user => user.type === this.selectedUserType);
  }
  

  selectUser(user: User) {
    this.userSelected.emit(user);
    this.selectedUserId = user.id;

  }
}

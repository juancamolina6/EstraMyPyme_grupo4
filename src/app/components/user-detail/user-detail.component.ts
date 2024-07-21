import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  empresa_asociada?: string;
  edad?: number;
  carrera?: string;
  semestre?: number;
  especialidad?: string;
  anos_experiencia?: number;
  cursos_impartidos?: string[];
  sector?: string;
  empleados?: number;
  fundacion?: number;
  productos?: string[];
  facturacion_anual?: number;
  estudantes_profesor?: number[];
  image?: string;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnChanges {
  @Input() user!: User;
  fieldsVisibility: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.initializeFieldsVisibility();
    }
  }

  initializeFieldsVisibility() {
    if (this.user) {
      this.fieldsVisibility = {
        name: 'name' in this.user,
        email: 'email' in this.user,
        empresa_asociada: 'empresa_asociada' in this.user,
        edad: 'edad' in this.user,
        carrera: 'carrera' in this.user,
        semestre: 'semestre' in this.user,
        especialidad: 'especialidad' in this.user,
        anos_experiencia: 'anos_experiencia' in this.user,
        cursos_impartidos: 'cursos_impartidos' in this.user,
        sector: 'sector' in this.user,
        empleados: 'empleados' in this.user,
        fundacion: 'fundacion' in this.user,
        productos: 'productos' in this.user,
        facturacion_anual: 'facturacion_anual' in this.user
      };
    }
  }
}

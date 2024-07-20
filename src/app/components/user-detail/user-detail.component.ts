import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {  // Exporta la interfaz User
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
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user!: User;
}

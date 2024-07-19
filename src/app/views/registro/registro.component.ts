import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements AfterViewInit{
  
  empresaPasswordVisible: boolean = false; 
  consultorPasswordVisible: boolean = false;
  isEmpresaActive: boolean = true; // Controla la visibilidad del formulario de empresa
  isConsultorActive: boolean = false; // Controla la visibilidad del formulario de consultor

  password: string = '';
  passwordVisible: boolean = false;

  constructor(
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef
  ) {}


  ngAfterViewInit(): void {
    this.initializeValidators();
  }

  initializeValidators(): void {
    if (this.isEmpresaActive) {
      this.validationService.initializeEmpresaValidator();
    } else if (this.isConsultorActive) {
      this.validationService.initializeConsultorValidator();
    }
    this.cdr.detectChanges();
  }

  toggleView(view: string): void {
    if (view === 'empresa') {
      this.isEmpresaActive = true;
      this.isConsultorActive = false;
    } else if (view === 'consultor') {
      this.isEmpresaActive = false;
      this.isConsultorActive = true;
    }
    this.cdr.detectChanges(); // Detectar los cambios en el DOM
    setTimeout(() => this.initializeValidators(), 0); // Inicializar las validaciones después de que el DOM se haya actualizado
  }

 



//contraseña 

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePassword(type: string): void {
    if (type === 'empresa') {
      this.empresaPasswordVisible = !this.empresaPasswordVisible;
    } else if (type === 'consultor') {
      this.consultorPasswordVisible = !this.consultorPasswordVisible;
    }
  }

 
}







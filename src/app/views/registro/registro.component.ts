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
    this.initializeThemeMode();
   
  
  }
    
  //validaciones
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



//modos

checkbox!: HTMLInputElement; // Utilizamos "!" para indicar que será inicializado más tarde
contenedor!: HTMLElement; // Utilizamos "!" para indicar que será inicializado más tarde

 

  changeTheme() {
    if (this.checkbox.checked) {
      // Si el checkbox está marcado, aplica la clase de modo claro
      this.contenedor.classList.add('dark-mode');
      this.contenedor.classList.remove('light-mode');
    } else {
      // Si el checkbox NO está marcado, aplica la clase de modo oscuro
      this.contenedor.classList.add('light-mode');
      this.contenedor.classList.remove('dark-mode');
    }
  }

  onCheckboxChange() {
    this.changeTheme();
  }


  // Método para inicializar el modo de tema
  initializeThemeMode() {
    this.checkbox = document.getElementById('input') as HTMLInputElement;
    this.contenedor = document.querySelector('.register-container') as HTMLElement;

    this.changeTheme();

    // Agrega un event listener al checkbox para cambiar el tema
    this.checkbox.addEventListener('change', this.changeTheme.bind(this));
  }

 
}


 
  //modos









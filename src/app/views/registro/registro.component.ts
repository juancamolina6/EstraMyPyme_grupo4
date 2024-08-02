import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements AfterViewInit, OnInit {

  empresaPasswordVisible: boolean = false;
  consultorPasswordVisible: boolean = false;
  isEmpresaActive: boolean = true; // Controla la visibilidad del formulario de empresa
  isConsultorActive: boolean = false; // Controla la visibilidad del formulario de consultor

  password: string = '';
  passwordVisible: boolean = false;


  /*inicio validaciones vanderas inicializacion */
  private empresaValidatorInitialized = false;
  private consultorValidatorInitialized = false;

  registroForm: FormGroup;

  constructor(
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', Validators.required],
      password: ['', Validators.required],
      tipo1: ['', Validators.required],
      departamento1: [''],
      programa: [''],
      año: [''],
      tipo3: [''],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }
/*elimanr validaciones segun tipo */
  ngOnInit(): void {
    this.onTipoChange(); 
   
  }

  onTipoChange(): void {
    const tipo = this.registroForm.get('tipo1')?.value;
    if (tipo === 'profesor') {
      this.validationService.removeConsultorValidators(this.registroForm);
    } else if (tipo === 'estudiante') {
      this.validationService.applyConsultorValidators(this.registroForm);
    }
    this.updateFormControlsValidity();
  }



  applyConsultorValidators(): void {
    const tipo = this.registroForm.get('tipo1')?.value;
    if (tipo === 'profesor') {
      this.validationService.removeConsultorValidators(this.registroForm);
    } else if (tipo === 'estudiante') {
      this.validationService.applyConsultorValidators(this.registroForm);
    }
    this.updateFormControlsValidity();
  }

  updateFormControlsValidity(): void {
    this.registroForm.get('departamento1')?.updateValueAndValidity();
    this.registroForm.get('programa')?.updateValueAndValidity();
    this.registroForm.get('año')?.updateValueAndValidity();
    this.registroForm.get('tipo3')?.updateValueAndValidity();
  }


/*cambiar formularios y inicializacion de validaciones ok*/

  ngAfterViewInit(): void {
  this.initializeThemeMode(); //modo claro
  this.initializeValidators();//validaciones segun el tipo consultor/empresa
  this.onTipoChange();
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
  
    setTimeout(() => {
      this.initializeValidators(); // Re-inicializar validaciones si es necesario
     
    }, 0);

  }


  //controlvalidaciones
  initializeValidators(): void {
    if (this.isEmpresaActive && !this.empresaValidatorInitialized) {
      this.validationService.initializeEmpresaValidator();
      this.empresaValidatorInitialized = true; // Marcar como inicializado
    } else if (this.isConsultorActive && !this.consultorValidatorInitialized) {
      this.validationService.initializeConsultorValidator();
      this.consultorValidatorInitialized = true; // Marcar como inicializado
    }
    this.cdr.detectChanges();
  }


/*fin validaciones */



  // Contraseña
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

  // Modos oscuro

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




 










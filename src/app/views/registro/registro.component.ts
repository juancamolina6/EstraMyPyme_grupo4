import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ValidationService } from '../../services/validation.service';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements AfterViewInit {

  empresaPasswordVisible: boolean = false;
  consultorPasswordVisible: boolean = false;
  isEmpresaActive: boolean = true; // Controla la visibilidad del formulario de empresa
  isConsultorActive: boolean = false; // Controla la visibilidad del formulario de consultor

  password: string = '';
  passwordVisible: boolean = false;


  /*inicio validaciones vanderas inicializacion */
  private empresaValidatorInitialized = false;
  private consultorValidatorInitialized = false;

  type: string = '';
  areValidationsActive: boolean = false;

  constructor(
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef) {
   
  }
  ngAfterViewInit(): void {
    this.initializeThemeMode(); //modo claro
    this.initializeValidators();//validaciones segun el tipo consultor/empresa
  
    if (this.type === 'estudiante') {
      this.initializestudianteValidators();
    }


  }


/*inicializar validaciones segun el rol estuidiate */



public onTipoChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.type = selectElement.value;

  if (this.type === 'estudiante') {
   
    this.initializestudianteValidators(); // Inicializar validaciones para estudiante
  } else if (this.type === 'profesor') {

    this.desaestudianteValidators();
  }

  // Detectar cambios en el DOM si es necesario
  this.cdr.detectChanges();
}

initializestudianteValidators(): void {
  if (this.type === 'estudiante') {
    if (!this.areValidationsActive) {
      this.validationService.initializeEstudinateValidator();
      this.areValidationsActive = true; // Marcar que las validaciones están activas
    }
  } 

  this.cdr.detectChanges();
}

desaestudianteValidators(): void {
  
  if (this.type === 'profesor') {
    if (this.areValidationsActive) {
      this.validationService.deactivateEstudinateValidator();
      this.areValidationsActive = false; // Marcar que las validaciones no están activas
    }
  }

  this.cdr.detectChanges();

}


/* */


/*cambiar formularios y inicializacion de validaciones ok*/
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

checkbox!: HTMLInputElement;
contenedor!: HTMLElement;

changeTheme() {
  if (this.checkbox.checked) {
    // Si el checkbox está marcado, aplica la clase de modo claro
    this.contenedor.classList.add('light-mode');
    this.contenedor.classList.remove('dark-mode');
  } else {
    // Si el checkbox NO está marcado, aplica la clase de modo oscuro
    this.contenedor.classList.add('dark-mode');
    this.contenedor.classList.remove('light-mode');
  }
}

onCheckboxChange() {
  this.changeTheme();
}

initializeThemeMode() {
  this.checkbox = document.getElementById('input') as HTMLInputElement;
  this.contenedor = document.querySelector('.register-container') as HTMLElement;

  // Configura el checkbox como desmarcado por defecto
  this.checkbox.checked = false;

  this.changeTheme();

  // Agrega un event listener al checkbox para cambiar el tema
  this.checkbox.addEventListener('change', this.changeTheme.bind(this));
}



  /*responsil button desplegable */ 
  toggleButtons(): void {
    const additionalButtons = document.getElementById('additionalButtons');
    if (additionalButtons) {
      additionalButtons.classList.toggle('hidden');
    }
  }

 


    
  


}




 










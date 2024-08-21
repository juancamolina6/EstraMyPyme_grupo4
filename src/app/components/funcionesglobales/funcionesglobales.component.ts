import { Component, EventEmitter, Output, AfterViewInit,OnInit,Input  } from '@angular/core';
import { RouterLink, RouterOutlet,Router   } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-funcionesglobales',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule ],
  template: `
<!-- Contenedor de controles (cambio de tema y selección de idioma) -->
<div class="modos">
<div *ngIf="showElement">
  <button  routerLink="" class="home"></button>
  </div>
  <div class="modos1">
    <div class="langua">
      <!-- Lista desplegable para seleccionar el idioma -->
      <select class="language" id="language">
        <option value="es" selected>idioma</option>
        <option value="en">ENG</option>
        <option value="fr">FRA</option>
        <option value="spa">SPA</option>
      </select>
    </div>

    <div class="modo" id="light-mode">
      <label class="switch">
        <input type="checkbox" id="input" (change)="onCheckboxChange()">
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</div>
  `,
  styles: `
* {
  color: white;
}

body {
  margin: 0;
  padding: 0;
}
.home {
  border: white solid 0.125rem;
  border-radius: 1.875rem; 
  color: white;
  background-color: black;
  width: 3.3rem; 
  height: 1.7rem; 
  padding: 0rem 0.625rem;
  font-size: 1rem; 
  margin-right: -3.125rem; 
  margin-top: 0.8rem;
  z-index: 4;
  position: relative;
  translate: -3.5rem -.8rem;
 
  background: url('https://res.cloudinary.com/dduyeudcy/image/upload/v1722729129/o1bxn3mmr3rzbct5t5v3.png') no-repeat center center;
  background-size: 34% 70%;
}


.home:active {
  background-color:  #0000ff; /* Color de fondo al hacer clic */

}


.modos {
  display: flex;
  padding: 1rem;
  position: fixed; /* Este elemento permanece en la misma posición */
  top: 0;
  right: 5rem; /* Ajusta según sea necesario */
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}

.modos1 {
  display: flex;
  gap: 1rem; /* Espacio entre los botones */
}

.register-container {
  -webkit-transition: .4s;
  transition: .4s;
  display: flex;
  position: fixed; /* Este elemento permanece en la misma posición */
  top: 1rem; /* Ajusta según sea necesario */
  right: 2rem; /* Ajusta según sea necesario */
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}

.language {
  border: white solid 0.125rem;
  border-radius: 1.875rem;
  color: white;
  background-color: black;
  width: 4rem;
  height: 1.7rem;
  padding: 0rem 0.3rem 0rem;
  font-size: .7rem;
}

.modo {
  width: 1rem;
  height: 1.6rem;
  margin-top: .5rem;
  margin-left:-1.9rem;
}

.switch {
  position: relative;
  top: -0.6rem;
  left: 1rem;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  width: 3.6rem;
  height: 1.6rem;
  position: absolute;
  cursor: pointer;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border: white solid 0.125rem;
  border-radius: 1.875rem;
}

.slider:before {
  position: absolute;
  content: "";
  height: 2.5rem;
  width: 2.5rem;
  left: 2.6rem;
  background: url('https://res.cloudinary.com/dduyeudcy/image/upload/v1721485960/icons8-luna-creciente-20_t9pa5h.png') no-repeat center center;
  -webkit-transition: .4s;
  transition: .4s;
  margin-left: -20px;
  top: -7px;
}

.slider:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  width: 2rem;
  opacity: 0;
  height: 2.2rem;
  -webkit-transition: .2s;
  transition: .2s;
  margin-left: -2px;
  top: -10px;
  transform: rotate(180deg);
  background: url('https://res.cloudinary.com/dduyeudcy/image/upload/v1721486195/icons8-sun-20_1_l1bwx3.png') no-repeat center center;
  
}

input:checked + .slider:after {
  left: auto;
  opacity: 1;
  -webkit-transform: translateX(6.22rem);
  -ms-transform: translateX(6.22rem);
  transform: translateX(6.22rem);
  transform: translateY(0.31rem);
  -webkit-transition: .5s;
  transition: .5s;
}

input:checked + .slider {
  background-color: black;
}

.light-mode  {
 
}
:host-context(.light-mode) .home {
  border: black solid 0.125rem;
  background: url('https://res.cloudinary.com/dduyeudcy/image/upload/v1722729083/fznjrjzijebiaijttr6y.png') no-repeat center center;
  }




  `
})
export class FuncionesglobalesComponent implements OnInit,AfterViewInit {
  @Output() themeChange = new EventEmitter<string>();

  checkbox!: HTMLInputElement;

  ngOnInit() {
    // Inicializa el estado del tema al cargar el componente
    this.initializeThemeMode();
    this.resetCheckbox();  // Esto reiniciará el checkbox cuando el componente se cargue
    this.checkbox = document.getElementById('input') as HTMLInputElement;
  }

  ngAfterViewInit() {
    this.checkbox = document.getElementById('input') as HTMLInputElement;
    this.syncCheckboxWithTheme(); // Sincroniza el checkbox con el tema actual
  }

  // Sincroniza el checkbox con el tema actual
  syncCheckboxWithTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isLightMode = savedTheme === 'light-mode';

    if (this.checkbox) {
      this.checkbox.checked = isLightMode;
    }
  
  }

    // Resetea el estado del checkbox y el tema guardado
    resetCheckbox() {
      // Eliminar el tema guardado en localStorage
      localStorage.removeItem('theme');
      
      // Reiniciar el checkbox a desmarcado
      if (this.checkbox) {
        this.checkbox.checked = false;
      }
  
      // Asegurarse de que el estilo "light-mode" se elimine si el checkbox está desmarcado
      document.body.classList.remove('light-mode');
    }

    initializeThemeMode() {
      // Obtener el tema guardado en localStorage
      const savedTheme = localStorage.getItem('theme');
      
      // Determinar si el modo claro está activado
      const isLightMode = savedTheme === 'light-mode';
      
      // Aplicar o eliminar la clase light-mode en el body
      if (isLightMode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
  
      // Asegurarse de que el checkbox refleje el estado actual del tema
      this.checkbox = document.getElementById('input') as HTMLInputElement;
      this.checkbox.checked = isLightMode;
    }
  

    onCheckboxChange() {
      // Determinar si el checkbox está activado (modo claro seleccionado)
      const isLightMode = this.checkbox.checked;
      
      // Emitir el evento de cambio de tema
      this.themeChange.emit(isLightMode ? 'light-mode' : 'dark-mode');
      
      // Aplicar o eliminar la clase light-mode en el body
      if (isLightMode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
      
      // Guardar el tema seleccionado en localStorage
      localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
    }

    /*ocultar boton landin en la landin */
    @Input() showElement: boolean = true; // Por defecto se muestra
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionesglobales',
  standalone: true,
  imports: [],
  template: `
<!-- Contenedor de controles (cambio de tema y selección de idioma) -->
<div class="modos">
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
        <input type="checkbox" id="input" onchange="onCheckboxChange()">
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


  `
})
export class FuncionesglobalesComponent {


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

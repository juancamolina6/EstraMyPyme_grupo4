import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `

<div class="register-container">
   <div class="modos">
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
         <input type="checkbox" checked onChange="changeTheme();" id="input">
         <span class="slider round"></span>
      </label>
   </div> 
</div>


  <div class="menu_landing">
        <button>Quienes somos</button>
        <button>Razon social</button>
        <h4>+MyPyme</h4>
        <button>Diagnostico</button>
        <button>Contactanos</button>
  <div>
  `,
  styles: `


  .menu_landing{
    padding-top:3rem;
    color:white;
    display:flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 100vh;
    gap: 1.6rem;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
  
  }

  
  h4{
    color: #FFF;
    font-style: italic;
    font-weight: 900;
    line-height: normal;
  }

  button {
    background-color: white;     /* Fondo blanco */
    color: black;                /* Texto negro */
    border-radius: 2rem;         /* Bordes redondeados */
    padding: 0.5rem 1rem;          /* Espaciado interno */
    font-size: 0.64rem;             /* Tamaño de la fuente */
    cursor: pointer;             /* Cursor de mano al pasar por encima */
    display: inline-block;       /* Para mantener la alineación de los botones */
    text-align: center;          /* Centrar el texto */
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;                 /* Espacio entre botones */
   
    white-space: nowrap;  
  }

  button:hover{
    box-shadow: 0 0 0 3px blue; 
    transition: box-shadow 0.3s ease-in-out;
  }


  .register-container {
   top:0
   -webkit-transition: .4s;
   transition: .4s;
   display:flex;
   position: absolute; /* Posiciona el objeto de manera absoluta con respecto al contenedor */
   top: 1rem;             /* Alinea el objeto en la parte superior */
   right: 8rem;  
}


.language {
  
   border: white solid 0.125rem;
   border-radius: 1.875rem;
   color: white;
   background-color: black;
   width: 4rem;
   height: 1.7rem;
   padding: 0rem 0.3rem 0rem;
   font-size:.7rem;
}


.modo {
   width: 1rem;
   height: 1.6rem;
   margin-top: -10px;
}

.switch {
   position: relative;
   margin-left: 100%;
   top: 40%;
   transform: translateX(-50%) translateY(25rem);
   width: 8.6rem;
   height: 4.375rem;
}

.switch input { 
   opacity: 0;
   width: 0;
   height: 0;
}

.slider {
   width: 3.6rem;
   height: 1.7rem;
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
   top: -8px;
}

.slider:after {
   content: "";
   position: absolute;
   border-radius: 50%;
   width: 2rem;
   opacity: 0;
   height: 2.2rem;
   -webkit-transition:.2s;
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
export class HeaderComponent {

}

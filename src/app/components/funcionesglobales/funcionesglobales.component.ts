import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionesglobales',
  standalone: true,
  imports: [],
  template: `
     <div class="register-container">
   <div class="modos">
      <!-- Lista desplegable para seleccionar el idioma -->
      <select class="language" id="language">
         <option value="es" selected>SPA</option>
         <option value="en">ENG</option>
      </select>
   </div>
   <div class="modo" id="light-mode"> 
      <label class="switch">
         <input type="checkbox" checked onChange="changeTheme();" id="input">
         <span class="slider round"></span>
      </label>
   </div> 
</div>
  `,
  styles: `
  

  *{
    color: white;
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
   margin-top: .6rem;
}

.switch {
   position: relative;
   margin-left: 100%;
   top: -.6rem;
   left: 1rem;
   transform: translateX(-50%) translateY(25rem);
   
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
export class FuncionesglobalesComponent {
      
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `

  <div class="menu_landing">
        <button>Quienes somos</button>
        <button>Razon social</button>
        <h4>+MyPyme</h4>
        <button>Diagnostico</button>
        <button>Contactanos</button>
</div>
  <div class="ingresalogin">
      <button>ingresa <img src="https://res.cloudinary.com/dpeqdynym/image/upload/v1722015231/Male_User_1_vwwndu.png" width="40px"></button>

  </div>
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
      /* Para mantener la alineación de los botones */
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
    padding: 0.5rem 1rem;        /* Espaciado interno */
    font-size: 0.64rem;          /* Tamaño de la fuente */
    cursor: pointer;             /* Cursor de mano al pasar por encima */
    text-align: center;          /* Centrar el texto */
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;                 /* Espacio entre botones */
    white-space: nowrap;  
    border:  black; 
}

.ingresalogin {
    position: absolute;
    padding: 10rem 10rem;
    right: 0; 
    top: 0; 

}

.ingresalogin button {
    padding: .1rem 1.2rem; /* Ajusta el espaciado interno del botón para hacerlo más grande */
    font-size: .9rem; 
    font-weight: 800;
    text-transform: none;

}


button:hover {
    box-shadow: 0 0 0 6px black, 0 0 0 9px blue; 
    transition: box-shadow 0.3s ease-in-out;
}

button img {
    vertical-align: middle;     /* Alinea la imagen verticalmente con el texto */
    margin-left: .2rem;
    margin-right: -1rem;
}
  
  `
})
export class HeaderComponent {

}

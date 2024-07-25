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
    padding: 0.5rem 1rem;        /* Espaciado interno */
    font-size: 0.64rem;          /* Tamaño de la fuente */
    cursor: pointer;             /* Cursor de mano al pasar por encima */
    display: inline-block;       /* Para mantener la alineación de los botones */
    text-align: center;          /* Centrar el texto */
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;                 /* Espacio entre botones */
    white-space: nowrap;  
}

button:hover {
    box-shadow: 0 0 0 3px black, 0 0 0 6px blue; 
    transition: box-shadow 0.3s ease-in-out;
}
  
  `
})
export class HeaderComponent {

}

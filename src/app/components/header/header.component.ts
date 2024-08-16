import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  template: `
    <div class="menu_icon" (click)="toggleMenu()">
      <span>{{ isMenuOpen ? '&#10006;' : '&#9776;' }}</span>
    </div>
    <div class="menu_landing" [ngClass]="{ 'open': isMenuOpen }">
      <button  (click)="scrollToSection('quienessomos')">Quienes somos</button>
      <button (click)="scrollToSection('razonsocial')">Razon social</button>
      <h4>+MyPyme</h4>
      <button (click)="scrollToSection('diagnostico')">Diagnostico</button>
      <button (click)="scrollToSection('contactanos')">Contactanos</button>
    </div>
    <div class="ingresalogin">
      <button   routerLink="login">ingresa <img src="https://res.cloudinary.com/dpeqdynym/image/upload/v1722015231/Male_User_1_vwwndu.png" width="40px"></button>
    </div>
  `,
  styles: [
    `
    .menu_landing {
      padding-top: 3rem;
      color: white;
      display: flex;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 1.6rem;
      font-size: 1rem;
      font-family: 'Inter', sans-serif;
      position: relative;
      background-color: black;
      transition: background-color 0.3s ease, transform 0.3s ease;
      transform: translateY(0);
    }

    .menu_landing.open {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transform: translateY(0);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 4rem;
    }



    .menu_icon {
      display: none;
      position: absolute;
      top: 1rem;
      left: 1rem;
      font-size: 2rem;
      cursor: pointer;
      z-index: 1001;
    }

    .menu_icon span {
      color: white;
    }

    h4 {
      color: #FFF;
      font-style: italic;
      font-weight: 900;
      line-height: normal;
    }

    button {
      background-color: white;
      color: black;
      border-radius: 2rem;
      padding: 0.5rem 1rem;
      font-size: 0.64rem;
      cursor: pointer;
      text-align: center;
      font-weight: 900;
      text-transform: uppercase;
      margin: 0;
      white-space: nowrap;  
      border: black; 
    }

    button:hover {
    box-shadow: 0 0 0 6px black, 0 0 0 9px blue; 
    transition: box-shadow 0.3s ease-in-out;
    }



    .ingresalogin {
      position: absolute;
      padding: 3rem; 
      right:-18px;
      top: 80px;
    }

    .ingresalogin button {
      padding: 0rem 1.4rem;
      font-size: .8rem; 
      font-weight: 700;
      text-transform: none;
    }

    button img {
      vertical-align: middle;
      margin-left: .2rem;
      margin-right: -1rem;
    }

    @media (max-width: 768px) {
      .menu_landing {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: black;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1000;
        transform: translateY(-100%);
        padding-top: 4rem;
      }

      .menu_landing.open {
        transform: translateY(0);
      }

      .menu_icon {
        display: block;
      }

      button {
        font-size: 1rem;
        padding: 0.8rem 1.5rem;
        margin: 0.5rem 0;
      }
    }
    `
  ]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const body = document.body;

    if (this.isMenuOpen) {
      body.classList.add('mobile-menu-active');
    } else {
      body.classList.remove('mobile-menu-active');
    }
  }

  //metodo para enrutar la landin


  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}

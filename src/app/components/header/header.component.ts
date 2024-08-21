import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.component.html', // Corregido a 'templateUrl'
  styleUrls: ['./header.component.css']   // Corregido a 'styleUrls'
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
}

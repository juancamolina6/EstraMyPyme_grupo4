import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-razonsocial',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './razonsocial.component.html',
  styleUrl: './razonsocial.component.css'
})
export class RazonsocialComponent {
}



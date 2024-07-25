import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
=======
import {RegistroComponent } from './views/registro/registro.component'
>>>>>>> 0b038aee1d2130849c59da5e5afcb3cf7d5538f8
import { LandingPageComponent } from './views/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet,LandingPageComponent],
=======
  imports: [RouterOutlet,LandingPageComponent,RegistroComponent],
>>>>>>> 0b038aee1d2130849c59da5e5afcb3cf7d5538f8
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'EstraMyPyme';
}



import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegistroComponent } from './views/registro/registro.component'
import { LandingPageComponent } from './views/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LandingPageComponent,RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'EstraMyPyme';
}



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FuncionesglobalesComponent } from '../../components/funcionesglobales/funcionesglobales.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,FuncionesglobalesComponent,HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}

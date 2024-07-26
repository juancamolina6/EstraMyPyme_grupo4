import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FuncionesglobalesComponent } from '../../components/funcionesglobales/funcionesglobales.component';
import { PresentacionComponent } from '../../components/presentacion/presentacion.component';
import { QuienessomosComponent } from '../../components/quienessomos/quienessomos.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,FuncionesglobalesComponent,HeaderComponent,PresentacionComponent,QuienessomosComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}

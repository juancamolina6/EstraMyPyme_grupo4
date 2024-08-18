import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FuncionesglobalesComponent } from '../../components/funcionesglobales/funcionesglobales.component';
import { PresentacionComponent } from '../../components/presentacion/presentacion.component';
import { QuienessomosComponent } from '../../components/quienessomos/quienessomos.component';
import { RazonsocialComponent } from "../../components/razonsocial/razonsocial.component";
import { DiagnosticoComponent } from '../../components/diagnostico/diagnostico.component';
import { ContactanosComponent } from '../../components/contactanos/contactanos.component';
import { EncuentranosComponent } from '../../components/encuentranos/encuentranos.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FuncionesglobalesComponent, HeaderComponent, PresentacionComponent, QuienessomosComponent, RazonsocialComponent,DiagnosticoComponent,ContactanosComponent,EncuentranosComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  currentTheme: string = 'dark-mode'; // Valor por defecto

  ngOnInit() {
    // Inicializa el tema desde localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    this.currentTheme = savedTheme;

    this.applyExcludeOverflowClass();//logica para no aplicar no scrool a la landin
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
  }

//logica para no aplicar no scrool a la landin
  ngAfterViewInit() {
    this.applyExcludeOverflowClass();
  }

  private applyExcludeOverflowClass() {
    document.body.classList.add('exclude-overflow');
  }

}

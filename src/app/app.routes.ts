import {Routes } from '@angular/router';
import { PanelAdministracionComponent } from './views/panel-administracion/panel-administracion.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import {RegistroComponent } from './views/registro/registro.component'
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  { path: 'administracion', component: PanelAdministracionComponent },
  {
    path: '',
    component: LandingPageComponent,
  },

    {
        path: 'registro', component: RegistroComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    
];

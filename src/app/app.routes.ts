import { Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import {RegistroComponent } from './views/registro/registro.component'

export const routes: Routes = [
    {
        path: '', component: LandingPageComponent
    },
    {
       path:'landingpage', component: LandingPageComponent},

    {
        path: 'registro', component: RegistroComponent
    },
];



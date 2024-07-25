import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegistroComponent } from './views/registro/registro.component';  // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    // Asegúrate de declarar el componente aquí
  ],
  imports: [
    BrowserModule,
    FormsModule  // Asegúrate de importar FormsModule aquí
  ],
  providers: [],

})
export class AppModule { }
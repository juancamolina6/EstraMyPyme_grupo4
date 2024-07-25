import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor() {}

  // Métodos del servicio
  validateRegistrationForm(formData: any): boolean {
    // Implementa tu lógica de validación aquí
    return true;
  }
}
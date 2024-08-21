import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private radarUrl = 'http://localhost:3000/radarData';
  private relojUrl = 'http://localhost:3000/relojData';
  private circuloUrl = 'http://localhost:3000/circulo_dorado';

  constructor(private http: HttpClient) {}
//trae los datos de el reloj
  getClockData(companyId: number): Observable<any> {
    return this.http.get(`${this.relojUrl}?id-empresa=${companyId}`);
  }
  //Trae los datos de el radar 
  getRadarData(companyId: number): Observable<any> {
    return this.http.get(`${this.radarUrl}?id-empresa=${companyId}`);
  }

   // Trae los datos del círculo con manejo de errores
   getCirculoData(companyId: number): Observable<any> {
    return this.http.get(`${this.circuloUrl}?id-empresa=${companyId}`).pipe(
      catchError(error => {
        console.error('Error al obtener datos del círculo:', error);
        return throwError(() => new Error('Error al obtener datos del círculo'));
      })
    );
  }
}

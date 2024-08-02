import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private apiUrl = 'http://localhost:3000/data'; // URL del json-server

  constructor(private http: HttpClient) {}

  getChartData(): Observable<any> {
    console.log('Fetching data from:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener datos del gráfico:', error);
        return throwError(
          () => new Error('Error al cargar los datos del gráfico')
        );
      })
    );
  }
}

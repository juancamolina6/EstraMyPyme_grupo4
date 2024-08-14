import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private radarUrl = 'http://localhost:3000/radarData';
  private relojUrl = 'http://localhost:3000/relojData';

  constructor(private http: HttpClient) {}
//trae los datos de el reloj
  getClockData(companyId: number): Observable<any> {
    return this.http.get(`${this.relojUrl}?id-empresa=${companyId}`);
  }
  //Trae los datos de el radar 
  getRadarData(companyId: number): Observable<any> {
    return this.http.get(`${this.radarUrl}?id-empresa=${companyId}`);
  }
}

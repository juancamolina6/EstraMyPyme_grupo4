import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/users'; // URL del backend

  constructor(private http: HttpClient) { }

  addCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/companies`, companyData);
  }




  addConsultant(consultantData: any): Observable<any> {
    if (consultantData.role === 'profesor') {
      return this.http.post(`${this.baseUrl}/consultores/profesores`, consultantData);
    } else {
      return this.http.post(`${this.baseUrl}/consultores/estudiantes`, consultantData);
    }
  }
}



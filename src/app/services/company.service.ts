import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/companies'; // URL de la API para empresas

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCompany(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCompany(company: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, company);
  }

  updateCompany(company: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${company.id}`, company);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

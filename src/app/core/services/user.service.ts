import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= AUTH =================

 register(data: any) {
  return this.http.post(`${this.baseUrl}/saveUser`, data, {
    responseType: 'text'
  });
}

  login(data: any): Observable<string> {
  return this.http.post(`${this.baseUrl}/login`, data, { responseType: 'text' });
}

  forgotPassword(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forgot?email=${email}`);
  }

  unlock(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/unlock`, data,{
      responseType:'text'
    });
  }
checkEmail(email: any) {
    return this.http.get(`${this.baseUrl}/emailcheck/email`, { responseType: 'text' })
  }
  // ================= LOCATION =================

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countries`);
  }

  getStates(countryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/states/${countryId}`);
  }

  getCities(stateId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cities/${stateId}`);
  }

}
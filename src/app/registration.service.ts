import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8088/api/usuarios/registrar'; // URL da sua API Java

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Define o cabeçalho para o tipo de conteúdo
    });

    // Faz a chamada POST para a API, enviando os dados do usuário
    return this.http.post<any>(this.apiUrl, userData, { headers });
  }
}

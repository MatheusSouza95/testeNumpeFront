import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abastecimento } from '../models/abastecimento.model';

@Injectable({
  providedIn: 'root'
})

// Service padrão para as chamadas ao abastecimento.
export class AbastecimentoService {
  private apiUrl = 'http://localhost:8080/abastecimentos';

  constructor(private http: HttpClient) {}
//Faz o get onde a placa é opcional
  getAbastecimentos(placa?: string): Observable<Abastecimento[]> {
    const url = placa ? `${this.apiUrl}?placa=${placa}` : this.apiUrl;
    return this.http.get<Abastecimento[]>(url); 
  }

  addAbastecimento(abastecimento: Abastecimento): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(this.apiUrl, abastecimento);
  }

  removeAbastecimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

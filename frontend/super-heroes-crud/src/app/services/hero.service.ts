import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { HeroCreateRequest } from '../models/hero_create_request';
import { Superpoder } from '../models/superpoder';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:9090/api';

  // Listar todos os heróis
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.API_URL}/herois`)
      .pipe(catchError(this.handleError));
  }

  // Buscar herói por ID
  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.API_URL}/herois/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Criar novo herói
  createHero(hero: HeroCreateRequest): Observable<Hero> {
    return this.http.post<Hero>(`${this.API_URL}/herois`, hero)
      .pipe(catchError(this.handleError));
  }

  // Atualizar herói
  updateHero(id: number, hero: HeroCreateRequest): Observable<Hero> {
    return this.http.put<Hero>(`${this.API_URL}/herois/${id}`, hero)
      .pipe(catchError(this.handleError));
  }

  // Deletar herói
  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/herois/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Listar superpoderes
  getSuperpowers(): Observable<Superpoder[]> {
    return this.http.get<Superpoder[]>(`${this.API_URL}/superpoderes`)
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = error.error?.message || `Erro ${error.status}: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
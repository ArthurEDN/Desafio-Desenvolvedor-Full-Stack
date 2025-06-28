import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero, HeroRequest } from '../models/hero';
import { Superpower } from '../models/super_power';


@Injectable({ providedIn: 'root' })
export class HeroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:9090/api';

  getHeroes(): Observable<{ content: Hero[] }> {
    // A API retorna um objeto Page, pegamos apenas o 'content'
    return this.http.get<{ content: Hero[] }>(`${this.apiUrl}/herois`);
  }

  getSuperpowers(): Observable<Superpower[]> {
    return this.http.get<Superpower[]>(`${this.apiUrl}/superpoderes`);
  }

  createHero(hero: HeroRequest): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiUrl}/herois`, hero);
  }

  updateHero(id: number, hero: HeroRequest): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/herois/${id}`, hero);
  }

  deleteHero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/herois/${id}`);
  }
}
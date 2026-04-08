import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { HpCharacter } from '../models/hp-character';

const BASE = 'https://hp-api.onrender.com/api';

@Injectable({
  providedIn: 'root',
})
export class HpApiService {
  private readonly http = inject(HttpClient);

  getAllCharacters(): Observable<HpCharacter[]> {
    return this.http.get<HpCharacter[]>(`${BASE}/characters`);
  }

  getCharactersByHouse(house: string): Observable<HpCharacter[]> {
    const path = encodeURIComponent(house);
    return this.http.get<HpCharacter[]>(`${BASE}/characters/house/${path}`);
  }

  getCharacterById(id: string): Observable<HpCharacter> {
    return this.http.get<HpCharacter[]>(`${BASE}/character/${id}`).pipe(
      switchMap((rows) => {
        const c = rows?.[0];
        return c ? of(c) : throwError(() => new Error('Character not found'));
      }),
    );
  }
}

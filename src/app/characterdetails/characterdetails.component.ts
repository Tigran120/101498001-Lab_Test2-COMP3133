import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { HpCharacter } from '../models/hp-character';
import { HpApiService } from '../services/hp-api.service';
import { houseAccentColor } from '../utils/house-color';

@Component({
  selector: 'app-characterdetails',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.scss',
})
export class CharacterdetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(HpApiService);

  character: HpCharacter | null = null;
  loading = true;
  error: string | null = null;

  readonly houseColor = houseAccentColor;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => {
          this.loading = true;
          this.error = null;
          this.character = null;
        }),
        switchMap((params) => {
          const id = params.get('id');
          if (!id) {
            return of({ id: null as string | null, character: null as HpCharacter | null });
          }
          return this.api.getCharacterById(id).pipe(
            map((character) => ({ id, character })),
            catchError(() => of({ id, character: null })),
          );
        }),
      )
      .subscribe(({ id, character }) => {
        this.loading = false;
        this.character = character;
        if (!id) {
          this.error = 'Missing character id.';
        } else if (!character) {
          this.error = 'Could not load this character.';
        }
      });
  }

  wandLength(length: number | null | undefined): string {
    if (length === null || length === undefined) {
      return '—';
    }
    return String(length);
  }
}

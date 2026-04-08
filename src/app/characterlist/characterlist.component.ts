import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HpCharacter } from '../models/hp-character';
import { HpApiService } from '../services/hp-api.service';
import { houseAccentColor } from '../utils/house-color';

@Component({
  selector: 'app-characterlist',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.scss',
})
export class CharacterlistComponent implements OnInit {
  private readonly api = inject(HpApiService);
  private readonly router = inject(Router);

  characters: HpCharacter[] = [];
  loading = true;
  error: string | null = null;

  readonly houseColor = houseAccentColor;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.api.getAllCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load characters. Try refresh.';
        this.loading = false;
      },
    });
  }

  goToDetails(character: HpCharacter): void {
    void this.router.navigate(['/character', character.id]);
  }

  displayHouse(house: string): string {
    return house?.trim() ? house : '—';
  }
}

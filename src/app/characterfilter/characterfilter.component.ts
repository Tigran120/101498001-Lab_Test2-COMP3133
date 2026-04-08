import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HpCharacter } from '../models/hp-character';
import { HpApiService } from '../services/hp-api.service';
import {
  HOGWARTS_HOUSES,
  HogwartsHouse,
  houseAccentColor,
} from '../utils/house-color';

@Component({
  selector: 'app-characterfilter',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.scss',
})
export class CharacterfilterComponent implements OnInit {
  private readonly api = inject(HpApiService);
  private readonly router = inject(Router);

  readonly houses = [...HOGWARTS_HOUSES];
  selectedHouse: HogwartsHouse = 'Gryffindor';

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
    this.api.getCharactersByHouse(this.selectedHouse).subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load characters for this house.';
        this.loading = false;
      },
    });
  }

  goToDetails(character: HpCharacter): void {
    void this.router.navigate(['/character', character.id]);
  }
}

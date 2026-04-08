import { Routes } from '@angular/router';

import { CharacterlistComponent } from './characterlist/characterlist.component';
import { CharacterfilterComponent } from './characterfilter/characterfilter.component';
import { CharacterdetailsComponent } from './characterdetails/characterdetails.component';

export const routes: Routes = [
  { path: '', component: CharacterlistComponent },
  { path: 'filter', component: CharacterfilterComponent },
  { path: 'character/:id', component: CharacterdetailsComponent },
  { path: '**', redirectTo: '' },
];

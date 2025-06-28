import { Routes } from '@angular/router';
import { HeroListComponent } from './features/hero/components/hero_list/hero_list.component';


export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent }
];
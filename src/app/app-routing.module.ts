import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleStartComponent } from './star-wars/people/people-start/people-start.component';
import { PeopleDetailComponent } from './star-wars/people/people-detail/people-detail.component';
import { PlanetStartComponent } from "./star-wars/planet/planet-start/planet-start.component";
import { PlanetDetailComponent } from "./star-wars/planet/planet-detail/planet-detail.component";
import { PeopleComponent } from "./star-wars/people/people.component";
import { PlanetComponent } from "./star-wars/planet/planet.component";
import { StarshipComponent } from "./star-wars/starship/starship.component";
import { StarshipStartComponent } from "./star-wars/starship/starship-start/starship-start.component";
import { StarshipDetailComponent } from "./star-wars/starship/starship-detail/starship-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/peoples', pathMatch: 'full' },
  {
    path: 'peoples', component: PeopleComponent, children: [
      { path: '', component: PeopleStartComponent, pathMatch: 'full' },
      // { path: 'new', component: CharacterEditComponent },
      { path: ':id', component: PeopleDetailComponent },
      // { path: ':id/edit', component: CharacterEditComponent },
    ]
  },
  {
    path: 'planets', component: PlanetComponent, children: [
      { path: '', component: PlanetStartComponent, pathMatch: 'full' },
      // { path: 'new', component: CharacterEditComponent },
      { path: ':id', component: PlanetDetailComponent },
      // { path: ':id/edit', component: CharacterEditComponent },
    ]
  },
  {
    path: 'starships', component: StarshipComponent, children: [
      { path: '', component: StarshipStartComponent, pathMatch: 'full' },
      // { path: 'new', component: CharacterEditComponent },
      { path: ':id', component: StarshipDetailComponent },
      // { path: ':id/edit', component: CharacterEditComponent },
    ]
  },
  { path: '**', redirectTo: '/peoples' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

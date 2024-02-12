import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PeopleStartComponent } from './star-wars/people/people-start/people-start.component'
import { PeopleListComponent } from './star-wars/people/people-list/people-list.component'
import { PeopleDetailComponent } from './star-wars/people/people-detail/people-detail.component'
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"
import { HeaderComponent } from './header/header.component'
import { LoaderComponent } from './loader/loader.component';
import { PlanetListComponent } from './star-wars/planet/planet-list/planet-list.component';
import { PlanetDetailComponent } from './star-wars/planet/planet-detail/planet-detail.component';
import { PlanetStartComponent } from './star-wars/planet/planet-start/planet-start.component';
import { PlanetComponent } from './star-wars/planet/planet.component';
import { PeopleComponent } from './star-wars/people/people.component';
import { StarshipStartComponent } from './star-wars/starship/starship-start/starship-start.component';
import { StarshipListComponent } from './star-wars/starship/starship-list/starship-list.component';
import { StarshipDetailComponent } from './star-wars/starship/starship-detail/starship-detail.component';
import { StarshipComponent } from './star-wars/starship/starship.component'

@NgModule({
  declarations: [
    AppComponent,
    PeopleStartComponent,
    PeopleListComponent,
    PeopleDetailComponent,
    HeaderComponent,
    LoaderComponent,
    PlanetListComponent,
    PlanetDetailComponent,
    PlanetStartComponent,
    PlanetComponent,
    PeopleComponent,
    StarshipStartComponent,
    StarshipListComponent,
    StarshipDetailComponent,
    StarshipComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

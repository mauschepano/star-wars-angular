import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HeaderComponent } from './header/header.component'
import { LoaderComponent } from './loader/loader.component';
import { MainComponent } from './main/main.component';
import { MainListComponent } from './main/main-list/main-list.component';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { MainDetailComponent } from "./main/main-detail/main-detail.component";
import { PeopleComponent } from "./main/main-detail/people/people.component";
import { PlanetComponent } from "./main/main-detail/planet/planet.component";
import { StarshipComponent } from "./main/main-detail/starship/starship.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    MainComponent,
    MainListComponent,
    MainDetailComponent,
    CapitalizePipe,
    PeopleComponent,
    PlanetComponent,
    StarshipComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

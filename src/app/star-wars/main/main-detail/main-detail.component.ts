import { Component } from '@angular/core'
import { ActivatedRoute, Params } from "@angular/router"
import { HttpClient } from "@angular/common/http"

import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service"
import { People } from "../../people/people";

@Component({
  selector: 'app-people-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss']
})
export class MainDetailComponent {
  people: People
  id: string
  loading = true

  constructor(private starWarsService: StarWarsService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params
      .subscribe(
          (params: Params) => {
            this.loading = true
            this.id = params['id']
            this.starWarsService.getListItem(StarWarsTopic.People, this.id)
              .subscribe((people) => {
                this.people = people as People
                this.loading = false
              });
          }
      )
  }
}

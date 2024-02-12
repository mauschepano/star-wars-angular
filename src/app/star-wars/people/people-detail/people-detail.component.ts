import { Component } from '@angular/core'
import { ActivatedRoute, Params } from "@angular/router"
import { HttpClient } from "@angular/common/http"

import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service"
import { PeopleInterface } from '../people.interface'

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent {
  people: PeopleInterface
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
                this.people = <PeopleInterface>people
                this.loading = false
              });
          }
      )
  }
}

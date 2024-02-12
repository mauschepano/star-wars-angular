import { Component, ViewChild } from '@angular/core'

import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service"
import { TopicItemInterface } from "../../topic-item.interface"
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  @ViewChild('f') newCharacterForm: NgForm
  peopleList$: TopicItemInterface[]

  constructor(private starWarsService: StarWarsService) {}

  ngOnInit() {
    this.initPeopleList();
  }

  initPeopleList () {
    this.starWarsService
      .getListFromApi(StarWarsTopic.People)
      .subscribe((peopleList) => {
        this.peopleList$ = peopleList
      })
  }

  onSubmit() {
    this.addPeople(this.newCharacterForm.value.name)
    this.newCharacterForm.reset()
  }

  addPeople(name: string) {
    const topicItem: TopicItemInterface = {name: name}
    this.peopleList$.push(topicItem)
  }
}

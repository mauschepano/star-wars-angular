import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { concatAll, switchMap, tap } from 'rxjs/operators';

import { StarWarsService, StarWarsTopic } from "./services/star-wars.service";
import { TopicItem } from '../models/topic-item.interface';
import { ActivatedRoute, Params } from "@angular/router";
import { ExtendedEntity } from "../models/extendedEntity.interface";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  searchForm: FormArray;
  items$: Observable<TopicItem[]> = this.starWarsService.listItems$;
  item$: Observable<ExtendedEntity | null> = this.starWarsService.item$;
  subHeadline: StarWarsTopic = StarWarsTopic.People;

  constructor(
    private readonly starWarsService: StarWarsService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  )
  {}

  ngOnInit() {
    this.createSearchForm();
    this.registerOnRoutParameterChange().subscribe();
  }

  onSubmit() {
    console.log(this.searchForm)
  }

  public isFormControlValid(): boolean {
    // const formControl = this.searchForm.get('search') as FormControl
    const formControl = this.searchForm.controls

    console.log(formControl);

    return true
  }

  private registerOnRoutParameterChange(): Observable<any> {
    return this.route.params.pipe(
      tap((params: Params) => this.subHeadline = params['topic']),
      tap(() => this.starWarsService.resetDetailState()),
      switchMap((params: Params) => this.starWarsService.loadItemsByRoute(params['topic'])),
      concatAll(),
    );
  }

  private createSearchForm() {
    this.searchForm = this.fb.group({
      searchForm: this.fb.array([
        new FormControl('', {
          validators: [
            Validators.required()
          ]
        })
      ])
    })
  }
}

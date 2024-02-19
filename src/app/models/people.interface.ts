import { BaseEntity } from "./baseEntity.interface";

export interface People extends BaseEntity {
  gender: string,
  birth_year: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,

  films?: string[],
  species?: string[],
  vehicles?: string[],
  starships?: string [],
  homeworld?: string,
  created?: string,
  edited?: string,
}

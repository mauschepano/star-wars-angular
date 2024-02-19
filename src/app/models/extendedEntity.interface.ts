import { People } from "./people.interface";
import { Planet } from "./planet.interface";
import { Starship } from "./starship.interface";
import { StarWarsTopic } from "../main/services/star-wars.service";

export interface ExtendedEntity extends People, Planet, Starship {
  entityType: StarWarsTopic
}

import { BaseEntity } from "./baseEntity.interface";

export interface Planet extends BaseEntity {
  population: string,
  climate: string,
  terrain: string,
  diameter: string,
  rotation_period: string,
  orbital_period: string,

  gravity?: string,
  surface_water?: string,
  created?: string,
  edited?: string,
  type: PlanetType
}

export type PlanetType = 'M' | 'N' | 'D';

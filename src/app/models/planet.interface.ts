export interface Planet {
  name: string,
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
  url?: string
  type: PlanetType
}

export type PlanetType = 'M' | 'N' | 'D';

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;

  sprites: {
    front_default: string | null;
  };

  types: {
    type: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
  }[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
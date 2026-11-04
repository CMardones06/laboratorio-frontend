import type { Pokemon, PokemonApiResponse} from "../types";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemon(
    query: string,
    signal: AbortSignal
): Promise<Pokemon> {
    const normalizeQuery = query.trim().toLowerCase();

    if (!normalizeQuery) {
        throw new Error("Ingresa el ID o nombre de un Pokémon");
    }

    let response: Response;

    try {
        response = await fetch(
            `${API_URL}/${encodeURIComponent(normalizeQuery)}`,
            { signal }
        );
    } catch (error: unknown) {

        if (signal.aborted) {
            throw error;
        }

        throw new Error(
            "No se pudo conectar con la Api. Revisa tu conexión a Internet.",
            {cause: error}
        );
    }

    if (response.status === 404) {
        throw new Error(
            `No existe ningún Pokemón con el código o nombre "${normalizeQuery}".`
        );
    }
    
    if (!response.ok) {
        throw new Error(
            `Error del servidor (HTTP ${response.status}).`
        );
    }

    const raw = (await response.json()) as PokemonApiResponse;

      return {
    id: raw.id,
    name: raw.name,

    types: raw.types.map((item) => item.type.name),

    abilities: raw.abilities.map((item) => item.ability.name),

    imageUrl: raw.sprites.front_default,

    height: raw.height,
    weight: raw.weight,

    stats: raw.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
  };
}
import type { Pokemon } from "../types";

interface DetallePokemonProps {
  cargando: boolean;
  error: string | null;
  pokemon: Pokemon | null;
}

export default function DetallePokemon({
  cargando,
  error,
  pokemon,
}: DetallePokemonProps) {
  if (cargando) {
    return (
      <p className="estado estado--cargando" role="status">
        Cargando Pokémon…
      </p>
    );
  }

  if (error) {
    return (
      <p className="estado estado--error" role="alert">
        {error}
      </p>
    );
  }

  if (!pokemon) return null;

  return (
    <article className="tarjeta">
      <p className="estado estado--exito" role="status">
        Pokémon encontrado
      </p>

      <h3 className="tarjeta__nombre">
        #{pokemon.id} {pokemon.name}
      </h3>

      {pokemon.imageUrl ? (
        <img
          className="tarjeta__imagen"
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={160}
          height={160}
        />
      ) : (
        <p>Este Pokémon no tiene una imagen disponible.</p>
      )}

      <div className="detalle">
        <p className="detalle__tipos">
          Tipos: {pokemon.types.join(", ")}
        </p>

        <h4>Habilidades</h4>

        <ul className="detalle__etiquetas">
          {pokemon.abilities.map((habilidad) => (
            <li key={habilidad}>{habilidad}</li>
          ))}
        </ul>

        <p className="detalle__medida">
          Altura: {pokemon.height / 10} m
        </p>

        <p className="detalle__medida">
          Peso: {pokemon.weight / 10} kg
        </p>

        <h4>Estadísticas</h4>

        <ul className="detalle__stats">
          {pokemon.stats.map((estadistica) => (
            <li key={estadistica.name}>
              <span>{estadistica.name}</span>{" "}
              <strong>{estadistica.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
import type { Pokemon } from "../types";

interface DetallePokemonProps {
  pokemon: Pokemon;
}

export default function DetallePokemon({
  pokemon,
}: DetallePokemonProps) {
  return (
    <div className="detalle">
      <p className="detalle__tipos">
        Tipos: {pokemon.types.join(", ")}
      </p>

      <p className="detalle__medida">
        Altura: {pokemon.height / 10} m
      </p>

      <p className="detalle__medida">
        Peso: {pokemon.weight / 10} kg
      </p>

      <ul className="detalle__stats">
        {pokemon.stats.map((s) => (
          <li key={s.name}>
            {s.name}: {s.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
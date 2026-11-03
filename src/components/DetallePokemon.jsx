export default function DetallePokemon({ pokemon }) {
  return (
    <div className="detalle">
      <p className="detalle__tipos">
        Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <p className="detalle__medida">Altura: {pokemon.height / 10} m</p>
      <p className="detalle__medida">Peso: {pokemon.weight / 10} kg</p>

      <ul className="detalle__stats">
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
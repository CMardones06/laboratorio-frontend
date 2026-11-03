import { useState } from "react";
import DetallePokemon from "./DetallePokemon";

export default function BuscadorPokemon() {
  const [id, setId] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const buscar = (e) => {
    e.preventDefault();
    if (!id) return;

    setCargando(true);
    setError(null);
    setPokemon(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró ese Pokémon");
        return res.json();
      })
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  };

  return (
    <section className="buscador">
      <h2 className="buscador__titulo">Buscador de Pokémon</h2>

      <form className="buscador__form" onSubmit={buscar}>
        <input
          className="buscador__input"
          type="number"
          min="1"
          placeholder="ID del Pokémon (ej: 25)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="buscador__boton" type="submit">
          Buscar
        </button>
      </form>

      {cargando && <p className="buscador__cargando">Cargando…</p>}
      {error && <p className="buscador__error">{error}</p>}

      {pokemon && (
        <div className="tarjeta">
          <h3 className="tarjeta__nombre">
            #{pokemon.id} {pokemon.name}
          </h3>
          <img
            className="tarjeta__imagen"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <DetallePokemon pokemon={pokemon} />
        </div>
      )}
    </section>
  );
}
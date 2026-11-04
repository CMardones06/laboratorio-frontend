import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Pokemon } from "../types";
import { fetchPokemon } from "../services/pokemonService";
import DetallePokemon from "./DetallePokemon";

export default function BuscadorPokemon() {
  // Lo que el usuario escribe.
  const [inputValue, setInputValue] = useState("25");

  // La búsqueda confirmada al enviar el formulario.
  const [query, setQuery] = useState("25");

  // Estados de la petición.
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const cargarPokemon = async (): Promise<void> => {
      setCargando(true);
      setError(null);
      setPokemon(null);

      try {
        const resultado = await fetchPokemon(
          query,
          controller.signal
        );

        if (controller.signal.aborted) return;

        setPokemon(resultado);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        setPokemon(null);
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error inesperado."
        );
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    };

    void cargarPokemon();

    // Cancela la petición al cambiar query o desmontar el componente.
    return () => controller.abort();
  }, [query]);

  const buscar = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nuevaQuery = inputValue.trim().toLowerCase();

    if (!nuevaQuery) return;

    setQuery(nuevaQuery);
  };

    return (
    <section className="buscador">
      <h2 className="buscador__titulo">Buscador de Pokémon</h2>

      <form className="buscador__form" onSubmit={buscar}>
        <input
          className="buscador__input"
          type="number"
          min="1"
          required
          aria-label="ID del Pokémon"
          placeholder="ID del Pokémon (ej: 25)"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <button className="buscador__boton" type="submit">
          Buscar
        </button>
      </form>

      <DetallePokemon
        cargando={cargando}
        error={error}
        pokemon={pokemon}
      />
    </section>
  );
}
import React, { useEffect, useState } from "react";
import Pokemones from "./components/Pokemones/Pokemones";
import "./App.css";
import Modal from "./Modal/Modal";

const App = () => {
    const [pokemones, setPokemones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [detallesPokemon, setDetallesPokemon] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
    const [orden, setOrden] = useState("ascendente");

    const tiposPokemon = [
        "todos",
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
    ];

    useEffect(() => {
        async function obtenerPokemones() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=120&offset=0"
            );
            const data = await response.json();

            // Obtener detalles de cada Pokémon
            const pokemonesConDetalles = await Promise.all(
                data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const detalles = await response.json();
                    return {
                        ...pokemon,
                        tipos: detalles.types.map((type) => type.type.name),
                    };
                })
            );

            setPokemones(pokemonesConDetalles);
        }
        obtenerPokemones();
    }, []);

    const pokemonesFiltrados = pokemones.filter((pokemon) => {
        const cumpleBusqueda = pokemon.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const cumpleTipo =
            tipoSeleccionado === "todos" ||
            pokemon.tipos.includes(tipoSeleccionado);
        return cumpleBusqueda && cumpleTipo;
    });

    const pokemonesOrdenados = [...pokemonesFiltrados].sort((a, b) => {
        if (orden === "ascendente") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const abrirModal = async (pokemon) => {
        setModalAbierto(true);
        const response = await fetch(pokemon.url);
        const data = await response.json();
        setDetallesPokemon(data);
    };

    return (
        <div className="container">
            <div className="filtros-container">
                <input
                    className="input-search"
                    type="text"
                    placeholder="Buscar Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="select-tipo"
                    value={tipoSeleccionado}
                    onChange={(e) => setTipoSeleccionado(e.target.value)}
                >
                    {tiposPokemon.map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </option>
                    ))}
                </select>

                <select
                    className="select-orden"
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                >
                    <option value="ascendente">A-Z</option>
                    <option value="descendente">Z-A</option>
                </select>
            </div>

            <p>
                {pokemonesOrdenados.length === 1
                    ? "Se encontró un Pokémon"
                    : `Se encontraron ${pokemonesOrdenados.length} Pokemones`}
            </p>

            <Pokemones array={pokemonesOrdenados} pokemonClicked={abrirModal} />

            <Modal
                detallesPokemon={detallesPokemon}
                modalAbierto={modalAbierto}
                setModalAbierto={setModalAbierto}
            />
        </div>
    );
};

export default App;

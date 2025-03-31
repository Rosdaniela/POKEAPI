import React, { useEffect, useState } from "react";
import "./Pokemon.css";

const Pokemon = ({ name, url, onClick }) => {
    const [pokemonImage, setPokemonImage] = useState();
    const [types, setTypes] = useState([]);

    useEffect(() => {
        async function getPokemon() {
            const response = await fetch(url);
            const data = await response.json();
            setPokemonImage(data.sprites.front_default);
            setTypes(data.types.map((type) => type.type.name));
        }
        getPokemon();
    }, []);

    return (
        <div className="card" onClick={onClick}>
            <img src={pokemonImage} alt={name} />
            <p style={{ textTransform: "capitalize" }}>{name}</p>
            <div className="types-container">
                {types.map((type, index) => (
                    <span
                        key={index}
                        className={`pokemon-type-badge type-${type}`}
                    >
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Pokemon;

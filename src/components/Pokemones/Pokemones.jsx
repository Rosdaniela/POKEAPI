import React from "react";

import Pokemon from "../Pokemon/Pokemon";

const Pokemones = ({ array, pokemonClicked }) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="grid-container">
            {array.map((pokemon, index) => {
                return (
                    <Pokemon
                        key={pokemon.name + index}
                        name={capitalizeFirstLetter(pokemon.name)}
                        url={pokemon.url}
                        onClick={() => pokemonClicked(pokemon)}
                    />
                );
            })}
        </div>
    );
};

export default Pokemones;

import React from "react";

const Modal = ({ modalAbierto, setModalAbierto, detallesPokemon }) => {
    if (!modalAbierto || !detallesPokemon) return null;

    const handleClickOutside = (e) => {
        if (e.target.className === "modal-backdrop") {
            setModalAbierto(false);
        }
    };

    // Función para capitalizar el nombre
    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return (
        <div className="overlay">
            <div className="modal-backdrop" onClick={handleClickOutside}></div>
            <div className="modal">
                <h2 style={{ textTransform: "capitalize" }}>
                    {detallesPokemon.name}
                </h2>
                <img
                    src={detallesPokemon.sprites.front_default}
                    alt={detallesPokemon.name}
                />
                <p>Altura: {detallesPokemon.height}</p>
                <p>Peso: {detallesPokemon.weight}</p>
                <button onClick={() => setModalAbierto(false)}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;

import React from 'react'

function PokemonList({ pokemon }) {
    return (
        <div className='cards'>
            {pokemon.map(p => {
                const url = p.url
                const pokemonIndex = url.split('/')[url.split('/').length - 2];
                return (
                    <div className="card">
                        <img src={process.env.REACT_APP_IMAGE_URL+''+pokemonIndex+'.png'}  alt='pokemonimage'/>
                        <div className="card-body">
                            <h2>{p.name}</h2>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PokemonList
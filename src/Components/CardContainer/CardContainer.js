import React, { Component } from 'react';
import PokeCard from '../PokeCard/PokeCard';
import './CardContainer.css';

const CardContainer = (props) =>{
  return(
    <div
      className='cardContainerRoot'
    >
      {props.pokemon ?
        props.pokemon.map(pokemon =>(
          <PokeCard
            openDetailsPage={props.openDetailsPage}
            pokemon={pokemon}
          />
        ))
        :null}
    </div>
  );
};

export default CardContainer;
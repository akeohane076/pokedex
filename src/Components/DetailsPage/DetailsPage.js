import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../../styles/pokecolors.css';
import './DetailsPage.css';
import SelectionMenu from './_SelectionMenu';

const SimpleModal = (props) => {
  const body = (
    <div
      className={'modelRoot'}
    >
      <div className={`detailHeaderRoot ${props.selectedPokemon.type? props.selectedPokemon.type[0] :null}`}>
        <h2 className="detailHeader">{props.selectedPokemon.name? props.selectedPokemon.name :null}</h2>
        <h4
          className={'detailsPageNum'}
        >
          {props.selectedPokemon.num}
        </h4>
        {props.selectedPokemon.type? props.selectedPokemon.type.map(type =>(
          <p
            className={`typeChip ${type}Light`}
          >
            {type}
          </p>
        )): null}
      </div>
      <div>
        <SelectionMenu
          changePokemon={props.changePokemon}
          selectedPokemon={props.selectedPokemon}/>
      </div>
      <img
        className={'detailPageImg'}
        src={props.selectedPokemon.img}
      />
    </div>
  );

  return (
    <div>
      <Modal
        open={props.detailsPageOpen}
        onClose={props.closeDetailsPage}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default SimpleModal;
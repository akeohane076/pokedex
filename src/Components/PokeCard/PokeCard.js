/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './PokeCard.css';
import '../../styles/pokecolors.css';

const useStyles = makeStyles({
  root: {
    width: '25%',
    minWidth: '276px',
    backgroundColor: 'red',
    maxWidth: '150px',
    position: 'relative',
    margin: '0 !important',
    maxHeight: '260px',
    height: '180px',
    minHeight: '180px',
    marginTop: '12px !important',
    marginLeft: '6px !important',
    marginRight: '6px !important',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PokeCard = (props) => {
  const classes = useStyles();
  return (
    <Card onClick={()=>props.openDetailsPage(props.pokemon)} classes={{root: props.pokemon.type[0]}} className={'pokeCardRoot'}>
      <CardContent >
        <Typography variant="h5" component="h2">
          {props.pokemon.name}
        </Typography>
        <Typography className={'pokeNum'}>
          {props.pokemon.num}
        </Typography>
        <Typography className={'pokeList'} variant="body2" component="p">
          <span className='boldSpan'>Type(s):</span> {props.pokemon.type.join(', ')}
        </Typography>
        <Typography className={'pokeList'} variant="body2" component="p">
          <span className='boldSpan'>Weaknesses:</span> {props.pokemon.weaknesses.join(', ')}
        </Typography>
        <img
          src={props.pokemon.img}
          className="pokeImage"
        />
      </CardContent>
    </Card>
  );
};

export default PokeCard;

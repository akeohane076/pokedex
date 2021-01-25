/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */
import React, { Component } from 'react';
// import Filter from '../Filter'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import CardContainer from '../CardContainer'
import Pagination from '@material-ui/lab/Pagination';
import './Container.css'
import '../../styles/pokecolors.css'
import DetailsPage from '../DetailsPage'


const types = [
  'Grass',
  'Poison',
  'Fire',
  'Flying',
  'Water',
  'Bug',
  'Normal',
  'Electric',
  'Ground',
  'Fairy',
  'Fighting',
  'Ghost',
  'Psychic',
  'Rock',
  'Steel',
  'Ice',
  'Dragon'
];

const styles = (theme) => ({
  formControl: {
    marginLeft: '12px !important',
    minWidth: 120,
    maxWidth: 300,

  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      nameString: '',
      selectedWeaknesses: [],
      selectedTypes: [],
      filteredData: null,
      pageNum: 1,
      dataToShow: null,
      detailsPageOpen: false,
      selectedPokemon: {}
    };
  }

  componentDidMount() {
    this.pullPokeData()
  };

  // hits api to pull pokemon json
  pullPokeData = () => {
    axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then((response)=>{
        this.setState({
            data: response.data.pokemon,
            filteredData: response.data.pokemon,
        },()=>{
            this.paginateData()
        })
      })
  };

  // filters data when input changes on the pokename data field
  // recieves event object
  filterByName = (event) =>{
    this.setState({
        nameString: event.target.value
    },()=>{
        this.filterTable()
    })
  }

  // function that actually filters the data
  filterTable = () =>{
    let data = this.state.data
    if(this.state.nameString.length > 0){
        data = data.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(this.state.nameString.toLowerCase())
        })
    }
    if(this.state.selectedWeaknesses.length > 0){
      for(const string of this.state.selectedWeaknesses){
        data = data.filter(pokemon => {
          return pokemon.weaknesses.includes(string)
        })
      }
    }
    if(this.state.selectedTypes.length>0){
      for(const string of this.state.selectedTypes){
        data = data.filter(pokemon => {
          return pokemon.type.includes(string)
        })
      }
    }
    this.setState({
        filteredData: data,
        pageNum: 1
    },()=>{
      this.paginateData()
    })
  }

  // changes the type of pokemon one is filtering by, calls the filtering function
  // recieves event as an object
  handleChangeType = (event) =>{
    this.setState({
      selectedTypes: event.target.value
    },()=>{
      this.filterTable()
    })
  }

  // changes the weaknesess one is filtering by, calls filtering function
  // recieves event as an obj
  handleChangeWeakness = (event) =>{
    this.setState({
      selectedWeaknesses: event.target.value
    },()=>{
      this.filterTable()
    })
  }

  // controls pagination of displated pokemon
  // recieves page as a number
  onPageChange = (event, page) =>{
    this.setState({
      pageNum: page,
    },()=>{
      this.paginateData()
    })
  }

  // finds the data to render on the page
  paginateData = () =>{
    this.setState({
      dataToShow: this.state.filteredData.slice((this.state.pageNum-1)*20, this.state.pageNum*20)
    })
  }

  // opens the details page about the selected pokemon
  // recieves pokemon as obj
  openDetailsPage = (pokemon) =>{
    this.setState({
      selectedPokemon: pokemon,
      detailsPageOpen: true
    })
  }

  // closes details page
  closeDetailsPage = () =>{
    this.setState({
      detailsPageOpen: false
    })
  }

  // finds the pokemon in the original json by num
  changePokemon = (pokeId) =>{
    const foundPokemon = this.state.data.find(pokemon => pokemon.num === pokeId)
    this.setState({
      selectedPokemon: foundPokemon
    })
  }

  render() {
    const classes = this.props
    return (
      <div>
          {this.state.data ?
            <div
              className='filteringOptionsContainer'
            >
              <FormControl
                classes={{
                  root: 'formControlRoot'
                  }}>
                <TextField
                  classes={{
                    root: 'textfieldRoot'
                  }}
                  onChange={this.filterByName}
                  label="Pokemon Name"
                />
              </FormControl>
              <FormControl classes={{
                root: 'formControlRoot'
                }}>
                <InputLabel>Type</InputLabel>
                <Select
                  classes={{
                    root: 'selectRoot'
                  }}
                  multiple
                  value={this.state.selectedTypes}
                  onChange={this.handleChangeType}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={`chip ${value}`} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {types.map((name) => (
                    <MenuItem key={name} value={name} >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl classes={{
                root: 'formControlRoot'
                }}>
                <InputLabel >Weaknesses</InputLabel>
                <Select
                  classes={{
                    root: 'selectRoot'
                  }}
                  multiple
                  value={this.state.selectedWeaknesses}
                  onChange={this.handleChangeWeakness}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={`chip ${value}`} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {types.map((name) => (
                    <MenuItem key={name} value={name} >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Pagination
                classes={{
                  root: 'paginationRoot'
                }}
                page={this.state.pageNum}
                onChange={this.onPageChange}
                count={Math.ceil(this.state.filteredData.length/20)} />
            </div>
            :null
          }
          {this.state.dataToShow ? 
            <CardContainer
              openDetailsPage={this.openDetailsPage}
              pokemon={this.state.dataToShow}/>
            :null
          }
          <DetailsPage
            closeDetailsPage={this.closeDetailsPage}
            openDetailsPage={this.openDetailsPage}
            changePokemon={this.changePokemon}
            detailsPageOpen={this.state.detailsPageOpen}
            selectedPokemon={this.state.selectedPokemon}
            changePokemon={this.changePokemon}
          />
      </div>
    );
  }
}

export default Container;

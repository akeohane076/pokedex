/* eslint-disable */
import React, { Component } from 'react';
import './_SelectionMenu.css';

const subpages = ['About', 'Evolution'];

class SelectionMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedSubpage: 'About'
    };
  }

  // changes the subpage
  changePage = (page) =>{
    this.setState({
      selectedSubpage: page
    });
  } 

  render(){
    return(
      <div
        className={'selectionMenuRoot'}
      >
        {subpages.map(page=>(
          <p
            onClick={()=>this.changePage(page)}
            className={`subpageHeader ${this.state.selectedSubpage === page? 'activeSubpage' : null}`}> {page}</p>
        ))}
        {this.state.selectedSubpage === "About" ?
            <div>
                <p>
                    <span className={'subpageSpan'}>Height:</span> {this.props.selectedPokemon.height}
                </p>
                <p>
                    <span className={'subpageSpan'}>Weight:</span> {this.props.selectedPokemon.height}
                </p>
            </div>
            : this.state.selectedSubpage === "Evolution" ?
            <div>
                {this.props.selectedPokemon.prev_evolution ?
                    <div
                      className={'evolutionParent'}
                    >
                        <p className={'evolutionHeaders'}>Previous Evolutions</p>
                        {this.props.selectedPokemon.prev_evolution.map(evolution=>(
                            <p
                                className={'detailPageEvolution'}
                                onClick={()=>this.props.changePokemon(evolution.num)}
                            >
                                {evolution.name}
                            </p>
                        ))}
                    </div>
                :null}
                {this.props.selectedPokemon.next_evolution ?
                <div
                  className={'evolutionParent'}
                >
                    <p className={'evolutionHeaders'}>Future Evolutions</p>
                    {this.props.selectedPokemon.next_evolution.map(evolution=>(
                        <p
                            className={'detailPageEvolution'}
                            onClick={()=>this.props.changePokemon(evolution.num)}
                        >
                            {evolution.name}
                        </p>
                    ))}
                    </div>
                :null}
            </div>
            :null
        }
      </div>
    );
  }
}

export default SelectionMenu;
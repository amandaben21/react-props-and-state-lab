import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeFilterType = (type) => {
    this.setState({
      filters: Object.assign({}, this.state.filters,{   //Object.assign{} already returns target object
        type: type
      })
    })
  }

  getThePets = () => {
    let url = '/api/pets';
    if(this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({pets}));
  }

  handleAdoptPet = petId => {
    let petsToAdopt = this.state.pets;
    const adoptedPet = petsToAdopt.find(pet => pet.id === petId);

    adoptedPet.isAdopted = true;

    this.setState({
      pets: petsToAdopt
    });

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.filters} onchangeType={this.handleChangeFilterType} onFindPetsClick={this.getThePets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adpotedPets={this.state.adoptedPets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

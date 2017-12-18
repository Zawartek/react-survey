import React, { Component } from 'react';

import { PieChart, Pie, Tooltip, LabelList } from 'recharts';

import Choices from './components/Choices';
import { defaultChoices } from './components/defaultChoices';
import { choiceHelper } from './components/choiceHelper'
import { AddChoice } from './components/AddChoice';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      choices: defaultChoices,
      activeIndex:0
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Survey</h1>
        </header>
        <ul>
          <span>Quel sport fais-tu?</span>
          <Choices choices={this.state.choices} updateChoice={this.updateChoice} />
          <AddChoice addChoice={this.addChoiceToState}/>
        </ul>
        
        <PieChart width={730} height={250}>
          <Tooltip />
          <Pie data={this.state.choices} dataKey="nbVote" nameKey="value"
             cx="50%" cy="50%" outerRadius={50} fill="#8884d8" >
             <LabelList dataKey="value" position="outside"/>
            </Pie>
        </PieChart>
      </div>
    );
  }

  addChoiceToState = (newChoice) => {
    const updatedChoices = choiceHelper.addChoice(this.state.choices, newChoice);
    this.setState({ choices: updatedChoices });
  };

  updateChoice = (id, updatedNbVote) => {

    var arrayNbVote = Array.from(this.state.choices.map(c => (c.id === id) ? updatedNbVote : c.nbVote));
    var totalNbVote = arrayNbVote.reduce(function (a, b) { return a + b }, 0);

    const updatedChoices = choiceHelper.updateChoice(this.state.choices, id, updatedNbVote, totalNbVote);
    this.setState({ choices: updatedChoices });
  }
}

export default App;

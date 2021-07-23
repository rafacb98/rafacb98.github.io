import React, { Component } from 'react';
import './App.css';
import Tablero from './Tablero.js';


// Definimos el componente Juego con la anchura y altura del tablero y el número de minas
class Juego extends React.Component {
  state = {
    altura: 10,
    anchura: 10,
    n_minas: 10,
  };

  // Pintamos el componente Tablero con sus dimensiones y sus numeros de minas
  render() {
    const {altura,anchura,n_minas} = this.state;
    return (
 
       
        <Tablero altura={altura} anchura={anchura} n_minas={n_minas} /> 
       
    );
   
  }
 
}

export default Juego;


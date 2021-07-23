import React, { Component } from 'react';
import './App.css';

// Definimos el componente Celda, que tendra su estado, donde comprobaremos como se encuentra
class Celda extends React.Component {
  estado() {
    const { value } = this.props;
    // Si no ha sido revelada y hacemos clic derecho con la bandera mostramos su valor
    if (!value.revelada) {
      return this.props.value.bandera ? "🚩" : null;
    }
    // Si esta minada devolvemos la bomba
    if (value.minada) {
      return "💣";
    }

    // Si es no hay nada que devuelva nada
    if (value.celdaVecina === 0) {
      return null;
    }
    return value.celdaVecina;
  }

  // Pintamos la celda
  render() {
    const { value, onClick, bandera } = this.props;
    // Declaramos esta clase que sera celda + oculta o minada o bandera dependiendo
    var className = "celda" + (value.revelada ? "" : " oculta") + (value.minada ? " minada" : "") + (value.bandera ? " bandera" : "");
    return (
      <div onClick={onClick} className={className} onContextMenu={bandera}>
        {this.estado()}
      </div>
    );
  }
}

export default Celda;
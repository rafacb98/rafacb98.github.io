import React, { Component } from 'react';
import Celda from './Celda.js';
import './App.css';
import {Navbar,NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './FooterComponent.js';
import bomba from "./bomba.png";

// Definimos el componente Tablero con su estado, sus puntos, sus minas y su inicilizacion
class Tablero extends React.Component {
    state = {
          datosTablon: this.inicializar(this.props.altura, this.props.anchura, this.props.n_minas),
          estadoJuego: "EN JUEGO 🎮",
          nMinasTotal: this.props.n_minas,
          jugando:0,
      };
  

      // Función para obtener un número aleatorio dada una dimension del tablero
      generarAleatorio(aux) {
        return Math.floor((Math.random() * 1000) + 1) % aux;
      }

      // Función para obtener las minas de las celdas, donde recorremos las celdas y las metemos en un array
      // si se encuentran con una mina
      cogerMinas(aux) {
          var minitas = [];
          aux.map(fila => {
              fila.map((celda) => {
                  if (celda.minada) {
                      minitas.push(celda);
                  }
              });
          });
          return minitas;
      }

  
      // Función para obtener las banderas, que funciona de las misma manera que la función de arriba de coger las minas
      cogerBanderas(aux) {
          var banderitas = [];
          aux.map(fila => {
              fila.map((celda) => {
                  if (celda.bandera) {
                    banderitas.push(celda);
                  }
              });
          });
          return banderitas;
      }
  
      // Función para obtener las celdas ocultas, que funciona de la misma manera que la función de arriba de coger las minas
      cogerOcultas(aux) {
          var ocultas = [];
          aux.map(fila => {
              fila.map((celda) => {
                  if (!celda.revelada) {
                      ocultas.push(celda);
                  }
              });
          });
          return ocultas;
      }
  

      // Función para obtener el tablero inicial donde inicializamos con las minas y sus adyacentes
      inicializar(altura, anchura, n_minas) {
          var aux = this.vacio(altura, anchura);
          aux = this.pegarMina(aux, altura, anchura, n_minas);
          aux = this.obtenerCeldasVecinas(aux, altura, anchura);
          return aux;
      }

      vacio(altura, anchura) {
          var aux = [];  
          for (var i = 0; i < altura; i++) {
              aux.push([]);
              for (var j = 0; j < anchura; j++) {
                aux[i][j] = {x: i, y: j, minada: false, celdaVecina: 0, revelada: false, estaVacia: false, bandera: false,};
              }
          }
          return aux;
      }
  
      // Función para pintar las minas en el tablero
      pegarMina(aux, altura, anchura, n_minas) {
          var randomx, randomy, minasPuestas = 0;
          while (minasPuestas < n_minas) {
              randomx = this.generarAleatorio(anchura);
              randomy = this.generarAleatorio(altura);
              if (!(aux[randomx][randomy].minada)) {
                aux[randomx][randomy].minada = true;
                  minasPuestas++;
              }
          }
          return (aux);
      }
  
      // Función para obtener el número de minas vecinas para cada celda del tablero
      obtenerCeldasVecinas(aux, altura, anchura) {
          var contenidoActualizado = aux, index = 0;
  
          for (var i = 0; i < altura; i++) {
              for (var j = 0; j < anchura; j++) {
                  if (aux[i][j].minada !== true) {
                      var mina = 0;
                      const area = this.consultarVecinas(aux[i][j].x, aux[i][j].y, aux);
                      area.map(value => {
                          if (value.minada) {
                              mina++;
                          }
                      });
                      if (mina === 0) {
                          contenidoActualizado[i][j].estaVacia = true;
                      }
                      contenidoActualizado[i][j].celdaVecina = mina;
                  }
              }
          }
          return (contenidoActualizado);
      };
  
      // Función para buscar las celdas vecinas y devolverlas
      consultarVecinas(x, y, aux) {
          const aux2 = [];
          // Arriba
          if (x > 0) {
            aux2.push(aux[x - 1][y]);
          }
          // Abajo
          if (x < this.props.altura - 1) {
            aux2.push(aux[x + 1][y]);
          }
          // Izquierda
          if (y > 0) {
            aux2.push(aux[x][y - 1]);
          }
          // Derecha
          if (y < this.props.anchura - 1) {
            aux2.push(aux[x][y + 1]);
          }
          // Esquina superior izquierda
          if (x > 0 && y > 0) {
            aux2.push(aux[x - 1][y - 1]);
          }
          // Esquina superior derecha
          if (x > 0 && y < this.props.anchura - 1) {
            aux2.push(aux[x - 1][y + 1]);
          }
          // Esquina inferior derecha
          if (x < this.props.altura - 1 && y < this.props.anchura - 1) {
            aux2.push(aux[x + 1][y + 1]);
          }
          // Esquina inferior izquierda
          if (x < this.props.altura - 1 && y > 0) {
            aux2.push(aux[x + 1][y - 1]);
          }
          return aux2;
      }
  
      // Función para revelar todo el tablero y luego actualizamos la informacion con ayuda del setState
      revelarTablero() {
          var contenidoActualizado = this.state.datosTablon;
          contenidoActualizado.map((fila) => {
              fila.map((celda) => {
                  celda.revelada = true;
              });
          });
          this.setState({
            datosTablon: contenidoActualizado
          })
      }
  
      // Función para revelar el procedimiento lógico de la celda vacía
      revelarCeldaVacia(x, y, aux) {
          var area = this.consultarVecinas(x, y, aux);
          area.map(value => {
              if (!value.bandera && !value.revelada && (value.estaVacia || !value.minada)) {
                aux[value.x][value.y].revelada = true;
                  if (value.estaVacia) {
                      this.revelarCeldaVacia(value.x, value.y, aux);
                  }
              }
          });
          return aux;
  
      }
  
      // Evento de hacer clic en la celda
      _handleClicarCelda(x, y) {
        var contadorpuntos = this.state.jugando;
          // Comprueba si ha sido revelada
          if (this.state.datosTablon[x][y].revelada || this.state.datosTablon[x][y].bandera) 
          {  
            return null;
          }
          // Comprueba si esta minada, en caso de estarlo, se acaba la partida
          if (this.state.datosTablon[x][y].minada) {
              // Cambiamos y mostramos el mensaje de que ha perdido
              this.setState({estadoJuego: "¡HAS PERDIDO! 😱"});
              this.revelarTablero();
              alert("¡HAS PERDIDO! 😱");
          }
  
          var contenidoActualizado = this.state.datosTablon;
          contenidoActualizado[x][y].bandera = false;
          contenidoActualizado[x][y].revelada = true;
  
          // Si esta vacía vamos sumando mas puntos
          if (contenidoActualizado[x][y].estaVacia) {
              contenidoActualizado = this.revelarCeldaVacia(x, y, contenidoActualizado);
              contadorpuntos+=80;
          }
  
          // Si el número de minas es igual a las ocultas, quiere decir que ha ganado
          if (this.cogerOcultas(contenidoActualizado).length === this.props.n_minas) {
              // Cambiamos y mostramos el mensaje de que ha ganado
              this.setState({nMinasTotal: 0, estadoJuego: "¡ENHORABUENA, HAS GANADO! 🏆"});
              this.revelarTablero();
              alert("¡ENHORABUENA, HAS GANADO! 🏆");
          }

          // Vamos sumando puntos por cada clic
          contadorpuntos++;
          
          this.setState({
            datosTablon: contenidoActualizado,
              jugando: contadorpuntos,
              nMinasTotal: this.props.n_minas - this.cogerBanderas(contenidoActualizado).length,
          });
      }
  
      // Evento de la bandera
      _handleBandera(e, x, y) {
          e.preventDefault();
          var contadorpuntos = this.state.jugando;
          var contenidoActualizado = this.state.datosTablon;
          var n_minas = this.state.nMinasTotal;
  
          // Comprueba si se han revelado
          if (contenidoActualizado[x][y].revelada) {    
              return;
          }
          // Si no matado una bomba la sumamos
          if (contenidoActualizado[x][y].bandera) {
              contenidoActualizado[x][y].bandera = false;
              n_minas++;
          // Si ha puesto una bandera, la restamos               
          } else {
              contenidoActualizado[x][y].bandera = true;
              n_minas--;     
          }
          if (n_minas === 0) {
              const minitas = this.cogerMinas(contenidoActualizado);
              const banderitas = this.cogerBanderas(contenidoActualizado);
              // Si las minas y banderas son iguales, establecemos que ha ganado y revelamos el tablero
              if (JSON.stringify(minitas) === JSON.stringify(banderitas)) {
                  this.setState({nMinasTotal: 0, estadoJuego: "¡ENHORABUENA, HAS GANADO!"});
                  this.revelarTablero();
                  alert("¡ENHORABUENA, HAS GANADO!");
              }
          }
  
          // Actualizamos los datos del tablero, las minas y los puntos
          this.setState({
            datosTablon: contenidoActualizado,
            nMinasTotal: n_minas,
            jugando: contadorpuntos,
          });
      }
  
      // Función para pintar el tablero donde ya llamamos el componente Celda y lo pintamos
      pintarTablero(aux) {
          return aux.map((fila) => {
              return fila.map((celda) => {
                  return (
                      <div key={celda.x * fila.length + celda.y}>
                          <Celda
                              onClick={() => this._handleClicarCelda(celda.x, celda.y)}
                              bandera={(e) => this._handleBandera(e, celda.x, celda.y)}
                              value={celda}
                          />
                          {(fila[fila.length - 1] === celda) ? <div className="clear" /> : ""}
                      </div>
                      );
              })
          });
  
      }
  
    // Pintamos todo empezando por el Header, luego el panel de información, luego la tabla y por último el footer
    render() {
          return (
              <div>
                  <Header/>
                  <div id="panel" > 
                        <h2 className="info">{this.state.estadoJuego}</h2>
                        <button class="btn btn-primary">Minas: {this.state.nMinasTotal}</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button class="btn btn-warning">Puntos: {this.state.jugando}</button>
                        <br/><br/>
                        <button class="btn btn-danger" onClick={() => window.location.reload(false)}>Reiniciar</button>  
                  </div>
                  <center>
                  <div id="tablita">
                  {    
                      this.pintarTablero(this.state.datosTablon)
                  }
                 </div> 
                 </center>
                <Footer/> 
              </div>
              
          );
      }
  }

  // Definimos el componente Header para usarlo luego al pintar
  class Header extends React.Component {
    render(){
        return(
            
            <Navbar dark color="warning">
            <div className="navbar-start">
              <NavbarBrand><img src={bomba} width="30" height="30" class="d-inline-block align-top" alt=""/> <span class="titulo">BUSCAMINAS EN REACTJS</span></NavbarBrand>
            </div>
          </Navbar>
          
        )
    }
}

  export default Tablero;
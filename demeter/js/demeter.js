// Guardamos los valores de errores en una variable para poder luego pintar en el HTML
var errores = document.getElementById("errores");
var totalErrores = document.getElementById("totalErrores");
var numeroMapa = 1;
// Función donde le indicamos que nada más cargar la página muestre el mapa con todas las opciones y errores listos
window.onload = function ()
{
    robot.inicio();
    document.getElementById("orden").value = "";
    document.getElementById("interpretar").onclick = function ()
    {
        let arrayDeErrores = new Array();
        arrayDeErrores = listarErrores();
        let contador = 0;
        if (arrayDeErrores.length > 0)
        {
            errores.innerHTML = "";
            errores.innerHTML += "<b id='num_errores'></b>";
            for (let i = 0; i < arrayDeErrores.length; i++) 
            {
                if (arrayDeErrores[i] != undefined) 
                {
                    contador++;
                    errores.innerHTML += "<span class='aBorrar'>" + arrayDeErrores[i] + "<span>";
                }
            }
            document.getElementById("num_errores").innerHTML = "<span>Errores: " + contador + "</span>";
        }
        else
        {
            errores.innerHTML = "";
            errores.innerHTML = " <b>No hay errores</b>";
        }
        comenzar();
    }

    // Función para ir al mapa posterior
    document.getElementById('mapaposterior').onclick = function () 
    {
        numeroMapa = numeroMapa == 23 ? numeroMapa : numeroMapa + 1;
        clearInterval(reloj.intervalo);
        construirmapaTablero();
    }

    // Función para retroceder al mapa anterior
    document.getElementById('mapaanterior').onclick = function () 
    {
        numeroMapa = numeroMapa == 1 ? numeroMapa : numeroMapa - 1;
        clearInterval(reloj.intervalo);
        construirmapaTablero();
    }
}


// Función con la que se ejecutará cuando lo introducido no es ni asignación, ni bucle
function esOrden(codigo) 
{
    let contador = 0;
    for (let i = 0; i < sentencia.length; i++)
    {
        if (sentencia[i] == orden[0]) 
        {
            orden.shift();
            codigo.push(sentencia[i]);
            return false;
        }
        contador++;
    }
    if (contador == sentencia.length) 
    {
        return true;
    }
}


// Función para interpretar la línea del error
function linea() 
{
    let ordenIntro = document.getElementById("orden").value.toLowerCase();
    let inicioSentencia;
    // La separamos por salto de ĺinea
    ordenIntro = ordenIntro.split("\n");

    for (let i = 0; i < ordenIntro.length; i++) 
    {
        // Le quitamos todos los espacios
        while (ordenIntro[i].indexOf(" ") != -1) 
        {
            ordenIntro[i] = ordenIntro[i].replace(" ", "")
        }
    }

    
    while (ordenIntro[ordenIntro.length - 1] == "") 
    {
        ordenIntro.pop();
    }
    
    // Hasta que no se encuentra un valor undefined, se sigue encontrando el error
    while (orden.length > 0 && typeof (ordenIntro[ordenIntro.length - 1]) != "undefined") 
    {
        inicioSentencia = ordenIntro[ordenIntro.length - 1].indexOf(orden[orden.length - 1]);
        ordenIntro[ordenIntro.length - 1] = ordenIntro[ordenIntro.length - 1].slice(0, inicioSentencia);
        orden.pop();

        if (ordenIntro[ordenIntro.length - 1] == "") 
        {
            ordenIntro.pop();
        }
    }

    // Dependiendo de donde se inicie la orden se indicara si es la misma linea u otra
    return inicioSentencia != 0 ? ordenIntro.length - 1 : ordenIntro.length;
}

// Guardamos el codigo final y esto nos devuelve 0 si no hay nada o el tamaño dependiendo de lo que contenga
var codigoFinal = () => arrayDeCodigo.length - 1 == -1 ? 0 : arrayDeCodigo.length - 1;

// Función usada en el analizador de PHP, para ver si es variable o no
var variable;
var valueVaria;

function esVariable(orden) 
{
    let variable = [];
    for (let i = 0; i < orden.length; i++) 
    {
        if (orden[i] == "=") 
        {
            variable = [orden[i - 1], orden[i + 1]];
        }
    }
    return variable;
}

// Función para ver si es un IF que devuelve el error para poder controlarlo en la función de arriba
function esIf(codigo) 
{
    if (orden[0] == "for" || orden[0] == "while" || orden[0] == "if") 
    {
        codigo.push(new Array());
        arrayDeEnds++;
        let bucleN = codigo.length - 1;

        // Si es un bucle for se comprueba si lo siguiente es un numero
        if (orden[0] == "for") 
        {
            if (Number.isInteger(orden[1] - 1)) 
            {
                codigo[bucleN].push(orden[1]);
                orden.shift();
                orden.shift();
                analizarCodigo(codigo[bucleN]);
                return 3;
            } else 
            {
                return 1;
            }
        // Si es un bucle while se comprueba que despues venga NB
        } else if (orden[0] == "while") 
        {
            for (let e = 0; e < condicion.length; e++) 
            {
                if (condicion[e] == orden[1]) 
                {
                    codigo[bucleN].push(orden[1]);
                    orden.shift();
                    orden.shift();
                    analizarCodigo(codigo[bucleN]);
                    return 3;
                }
            }
            return 1;

        }
        // Si es un bucle if se comprueba lo que venga despues, que será MINE y BLOCK
        else if (orden[0] == "if") 
        {
            for (let i = 0; i < condicion.length; i++) 
            {
                if (condicion[i] == orden[1]) 
                {
                    // Después de la condición se revisa si hay un THEN y su END
                    if (orden[2] == "then") 
                    {
                        codigo[bucleN].push(1);
                        codigo[bucleN].push(orden[1]);
                        orden.shift();
                        orden.shift();
                        orden.shift();
                        analizarCodigo(codigo[bucleN]);
                        return 3;
                    } else 
                    {
                        return 2;
                    }
                }
            }
            return 1;
        }
    }
    return 0;
}

// Función de PHP usada para analizar el código, distinguiremos sentencias, condiciones y bucles
var codigo = new Array();
var arrayDeCodigo = new Array();
var orden;
function analizarCodigo(codigo) 
{
    //var fallo = (es_decremento(bucle_correcto[i]) || es_incremento(bucle_correcto[i]) || es_asignacion_1(bucle_correcto[i]));
    // Guardamos todas las sentencias
    this.sentencia = ["a", "tl", "tr", "deact"];
    // Guardamos todas las condiciones
    this.condicion = ["nb", "mine", "block", "nw"];
    // Guardamos todas los bucles
    this.bucle = ["while", "for", "if"];
    this.arrayDeEnds = codigo.length == 0 ? 0 : arrayDeEnds;
    this.error = codigo.length == 0 ? false : error;
    this.sentencias = codigo.length == 0 ? 0 : sentencias;

    let errorIf;

    do 
    {
        // Se comprueba si se introdujo bien y el IF tiene buena sintaxis
        if ((errorIf = esIf(codigo)) && errorIf != 0) 
        {
            if (errorIf == 1) 
            {
                error = true;
                break;
            } else if (errorIf == 2) 
            {
                error = true;
                break;
            }
        // Metemos en el array de END el END de dicho IF
        } else if (arrayDeEnds > 0 && orden[0] == "end") 
        {
            orden.shift();
            arrayDeEnds--;
            return false;
        } else if (esOrden(codigo)) 
        {
            sentencias++;
        }

        // Se comprueba que no hay un END que no tenga bucle o condición
        let endSinBucle = arrayDeEnds == 0 && orden[0] == "end";
        // Se comprueba si hay algun bucle o condición que no tenga END
        let bucleSinEnd = arrayDeEnds > 0 && orden.length == 0;

        // Si hubiera un END sin condición o bucle se avisa el error
        if (endSinBucle) 
        {
            console.log("Hay  un 'END' suelto en la línea " + linea());
            error = true;
            break;

        // Si hubiera una  condición o bucle sin el END se avisa el error
        } else if (bucleSinEnd) 
        {
            // Si son mas de un error mostramos el mensaje y sino mostramos el otro
            if (arrayDeEnds > 1)
            {
                console.log("Se han encontrado " + arrayDeEnds + " bucles sin cerrar en la línea " + linea());
            }
            else 
            {
                console.log("Se ha encontrado " + arrayDeEnds + " bucle sin cerrar en la línea " + linea());
            }
            error = true;
            break;

        // Si hay sentencias mal escritas
        } else if (sentencias == 2 && orden.length > 0) 
        {
            if ((orden[0].indexOf("=") > 0) || orden[1] == "=") 
            {
                if (orden[0].indexOf("=") > 0) 
                {
                    let arrayDeVariables = orden[0].split("=");
                    if (!hayVariable(arrayDeVariables[0])) 
                    {
                        variables.push(arrayDeVariables[0]);
                        valueVaria.push(arrayDeVariables[1]);
                    }
                    else 
                    {
                        let posicion = valorVariable(arrayDeVariables[0]);
                        valueVaria[posicion] = arrayDeVariables[1];
                    }
                }
                else 
                {
                    if (!hayVariable(orden[0])) 
                    {
                        variables.push(orden[0]);
                        valueVaria.push(orden[1]);
                    }
                    else 
                    {
                        let posicion = valorVariable(orden[0]);
                        valueVaria[posicion] = orden[1];
                    }
                }

            }
            break;

        }

    } while (orden.length > 0 && !error);

    sentencias = 0;
    arrayDeEnds = 0;
    return !error;

}

// Función para comprobar si existe la variable, si es así devuelve true
function hayVariable(variable) 
{
    for (let i = 0; i < variables.length; i++) 
    {
        if (variable == variables[i]) 
        {
            return true;
        }
    }
    return false;
}

// Función para comprobar el valor de la variable
function valorVariable(variable) 
{
    let posicion;
    for (let i = 0; i < variables.length; i++) 
    {
        if (variable == variables[i]) 
        {
            posicion = i;
        }
    }
    return posicion;

}

// Función donde se comprueba todas las ordenes con el IF
function revisarIf() 
{
    if (Array.isArray(arrayDeCodigo[codigoFinal()][0])) 
    {
        let parametro1 = arrayDeCodigo[codigoFinal()][0][0] - 1;
        let parametro2 = arrayDeCodigo[codigoFinal()][0][1];

        // Guardamos las condiciones aprovechando que sabemos como se pondran las sentencias
        let muro = arrayDeCodigo[codigoFinal()][0][0] == "nw" && !robot.saleMapa();
        let block = arrayDeCodigo[codigoFinal()][0][0] == "block" && !robot.comprobarCelda();
        let nb = arrayDeCodigo[codigoFinal()][0][0] == "nb" && robot.comprobarCelda();
        let mine = arrayDeCodigo[codigoFinal()][0][0] == "mine" && robot.comprobarMina();
        let ifMuro = parametro2 == "nw" && !robot.saleMapa();
        let ifBlock = parametro2 == "block" && !robot.comprobarCelda();
        let ifNb = parametro2 == "nb" && robot.comprobarCelda();
        let ifMine = parametro2 == "mine" && robot.comprobarMina();

        // Controlamos en el primer parametro que la condición es una de las cuatro
        if (parametro1 >= 0) 
        {
            if (ifNb || ifMine || ifBlock || ifMuro) 
            {
                // Se borra el número  y la condición
                arrayDeCodigo[codigoFinal()][0].shift();
                arrayDeCodigo[codigoFinal()][0].shift();

                let ordenCopia = arrayDeCodigo[codigoFinal()][0].slice();

                arrayDeCodigo[codigoFinal()].shift();

                arrayDeCodigo.push(copiarArray(ordenCopia));
                revisarIf();

            // Controlamos en el segundo parametro que la condición es o MINE o NB o NW o BLOCK
            } else if (parametro2 != "mine" && parametro2 != "nb" && parametro2 != "nw" && parametro2 != "block") 
            {
                // Por lo que si arriba no se cumple algo, quiere decir que tendremos un bucle FOR
                arrayDeCodigo[codigoFinal()][0].shift();
                let ordenCopia = arrayDeCodigo[codigoFinal()][0].slice();
                arrayDeCodigo[codigoFinal()].shift();

                while (parametro1 >= 0) 
                {
                    arrayDeCodigo.push(copiarArray(ordenCopia));
                    parametro1--;
                }
                revisarIf();
            }
        // Y si no es verdad ninguno de los dos casos anteriores, quiere decir que tendremos un bucle WHILE
        } else if (nb || mine || block || muro) 
        {
            let ordenCopia = arrayDeCodigo[codigoFinal()][0].slice();
            arrayDeCodigo.push(copiarArray(ordenCopia));
            arrayDeCodigo[codigoFinal()].shift();
            revisarIf();
        }
        return false;
    }

}

// Función para comprobar las sentencias introducidas, dependiendo de las que sea, hará una cosa u otra
function compruebaSentencias() 
{
    switch (arrayDeCodigo[codigoFinal()][0]) 
    {
        case "a":
            robot.avanzar();
            arrayDeCodigo[codigoFinal()].shift();
            return true;

        case "tl":
            robot.giraIzquierda();
            arrayDeCodigo[codigoFinal()].shift();
            return true;
        case "tr":"3"
            robot.giraDerecha();
            arrayDeCodigo[codigoFinal()].shift();
            return true;

        case "deact":
            robot.desactivarMina();
            arrayDeCodigo[codigoFinal()].shift();
            return false;

    }
    arrayDeCodigo[codigoFinal()].shift();
    return false;
}

// Función para tener una copia del array
function copiarArray(array) 
{
    let copia = new Array();
    for (let i = 0; i < array.length; i++) 
    {
        if (Array.isArray(array[i])) 
        {
            copia.push(copiarArray(array[i]));
        } else 
        {
            copia.push(array[i]);
        }

    }
    return copia;
}

// Función para comprobar si hay en el array lo que le pasemos
function esta(array, aComprobar) 
{
    let respuesta = false;
    for (let i = 0; i < array.length; i++) 
    {
        if (array[i] == aComprobar)
        {
            respuesta = true;
        }
    }
    return respuesta;
}

// Función que nos dirá la línea para el array
function enQueLinea(array, aux) 
{
    let linea;
    for (let i = 0; i < array.length; i++) 
    {
        if (array[i] == aux) 
        {
            linea = i;
        }
    }
    return linea;
}

// Función para poder mostrar todos los errores
function listarErrores()
{
    // Indicamos todas las sentencias
    let sentencias = ["a", "tl", "tr", "deact"];
    // Indicamos todas las condiciones
    let condiciones = ["nb", "mine", "block", "nw"];
    // Indicamos todos los bucles
    let bucles = ["while", "for", "if","end","then"];
    // Pasamos las ordenes a minusculas
    ordenMinus = document.getElementById("orden").value.toLowerCase();

    let arrayDeBucles= new Array();
    let arrayDeEnds= new Array();
    let arrayCodigos= new Array();
    let falloNumeroFor=1;
    let erroresMens = new Array();

    // Quitamos los saltos de linea
    while (ordenMinus.indexOf("\n") != -1) 
    {
        ordenMinus = ordenMinus.replace("\n", " ")
    }

    // Quitamos los espacios dobles y los sustituimos por un simple espacio
    while (ordenMinus.indexOf("  ") != -1) 
    {
        ordenMinus = ordenMinus.replace("  ", " ")
    }

    // Quitamos los espacios de los extremos
    ordenMinus = ordenMinus.trim(); //Elimina los espacios de los extremos
    // Lo separamos por espacio
    arrayCodigos = ordenMinus.split(" ");
    // Guardamos las vueltas con la longitud del array de código
    let vueltas = arrayCodigos.length;
    for(let i = 0; i < vueltas; i++)
    {
        if(arrayCodigos[i]=="while"  || arrayCodigos[i]=="for" || arrayCodigos[i]=="if")
        {
            // Si es un bucle FOR, parseamos el número que vaya para que no dé error y lo metemos en el array
            if(arrayCodigos[i]=="for")
            {
                falloNumeroFor=arrayCodigos[i+1];
                arrayCodigos[i+1]=parseInt(arrayCodigos[i+1]);
            }
            arrayDeBucles.push(arrayCodigos[i]);
        }
        if(arrayCodigos[i]=="end")
        {
            arrayDeEnds.push(arrayCodigos[i]);
        }
        if((!esta(sentencias,arrayCodigos[i])) && (!esta(condiciones,arrayCodigos[i])) && (!esta(bucles,arrayCodigos[i])))
        {
          if(arrayCodigos[i-1]=="for" || arrayCodigos[i-1]=="while" || arrayCodigos[i-1]=="if")
          {
                if(Number.isInteger(arrayCodigos[i]))
                {
                    console.log("Funciona");
                }
                else
                {
                    // Mostramos los errores por pantalla
                    if(falloNumeroFor!=1)
                    {
                        erroresMens[i]="No existe esa condición <b style='color:blue;'> "+falloNumeroFor+ "</b> en la línea <b>"+i+"</b>";

                    }
                    else
                    {
                        erroresMens[i]="No existe esa condición <b style='color:blue;'> "+arrayCodigos[i]+ "</b> en la línea <b>"+(enQueLinea(arrayCodigos,arrayCodigos[i])+1)+"</b>";
                    }

                }


          }
          // Si es una sentencia desconocida se muestra también el error
          else
          {
            erroresMens[i]="Se desconoce la sentencia <b style='color:blue;'> "+arrayCodigos[i]+ "</b> en la línea <b>"+(enQueLinea(arrayCodigos,arrayCodigos[i])+1)+"</b>";
          }


        }
    }
    // Si hay un bucle que no cerró con su END, se muestra el error
    if(arrayDeBucles.length != arrayDeEnds.length)
    {
        erroresMens.push("Hay un end sin cerrar del bucle <b style='color:blue;'>"+arrayDeBucles[arrayDeBucles.length-1]+"</b> de la línea <b>"+(enQueLinea(arrayCodigos,arrayCodigos[arrayDeBucles.length-1])+1)+"</b>");
    }

    return erroresMens;
}



// Pintamos el mapa vacio inicial con el que cargará la página
var mapaTablero = new Array();
var mapaTableroNuevo = new Array();

var arrayMapaTablero = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
];

// Función donde gracias a jQuery cargaremos los mapas JSON mediante AJAX y los iremos guardando
function tratarMapa() 
{
    let carga = $.ajax({ url: "json/mapa.json", dataType: 'json' });
    carga.done(function (mapitas) { arrayMapaTablero = mapitas.escenarioTablero; });
}

// Función para construir el mapa donde llamamos a la funcion de AJAX de arriba y vamos dibujando el mapa
function construirmapaTablero() 
{
    tratarMapa();
    mapaTablero = arrayMapaTablero[numeroMapa - 1];

    for (let i = 0; i < mapaTablero.length; i++) 
    {
        mapaTableroNuevo[i] = mapaTablero[i].slice();
    }
    pintar();
}

// Función para pintar el mapa
function pintar() 
{
    let mapa = document.getElementById("mapa");
    let mapaTablero = "";

    for (let i = 0; i < 11; i++) 
    {
        mapaTablero += "<div class='filas'>";
        for (let j = 0; j < 15; j++) 
        {
            // Si es undefined las pintamos vacias, para que no pinte UNDEFINED
            if (typeof mapaTableroNuevo[i][j] == "undefined") 
            {
                // En caso de ser una de estas dos casillas pintamos el borde en azul para indicar el comienza y la salida
                if ((i == 0 && j == 1) || (i == 10 && j == 13))
                {
                    if ((i == 0 && j == 1)) 
                    {
                        mapaTablero += "<div class='celdas' style='border-top: 3px dashed blue;'></div>";
                    } else 
                    {
                        mapaTablero += "<div class='celdas' style='border-bottom: 3px dashed blue;'></div>";
                    }
                }
                else 
                {
                    mapaTablero += "<div class='celdas'></div>";
                }
            }
            // Si no es undefined, pintamos el mapa que nos traemos de nuestro fichero JSON
            else
            {
                if ((i == 0 && j == 1) || (i == 10 && j == 13)) 
                {
                    if ((i == 0 && j == 1)) 
                    {
                        mapaTablero += "<div class='celdas' style='border-top: 3px dashed blue;'>" + mapaTableroNuevo[i][j] + "</div>";
                    } else 
                    {
                        mapaTablero += "<div class='celdas' style='border-bottom: 3px dashed blue;'>" + mapaTableroNuevo[i][j] + "</div>";
                    }
                }
                else 
                {
                    mapaTablero += "<div class='celdas'>" + mapaTableroNuevo[i][j] + "</div>";
                }
            }
        }
        mapaTablero += "</div>";
    }
    mapa.innerHTML = mapaTablero;
}

// Función para la posición del robot
function posicion() 
{
    if (robot.posicion == 4) 
    {
        robot.posicion = 0;
    } else if (robot.posicion == -1)
    {
        robot.posicion = 3;
    }

    let icono = "";
    switch (robot.posicion) 
    {
        case 0:
            icono += "▲";
            break;

        case 1:
            icono += "◀";
            break;

        case 2:
            icono += "▼";
            break;

        case 3:
            icono += "►";
    }
    robot.pintar(icono);
}


// Establecemos una velocidad de 1000 por cada movimiento
var reloj = {intervalo: "",velocidad: 1000};

// Función para comenzar el movimiento del robot
var x = 0;
function comenzar() 
{
    contadorBucle = 0;
    robot.inicio();
    clearInterval(reloj.intervalo);
    codigo = new Array();

    // Pasamos las ordenes a minusculas
    ordenMinus = document.getElementById("orden").value.toLowerCase();

    // Quitamos los saltos de línea y los sustituimos por un espacio
    while (ordenMinus.indexOf("\n") != -1) 
    {
        ordenMinus = ordenMinus.replace("\n", " ")
    }

    // Quitamos los espacios dobles
    while (ordenMinus.indexOf("  ") != -1) 
    {
        ordenMinus = ordenMinus.replace("  ", " ")
    }

    // Se quitan los espacios de los extremos
    ordenMinus = ordenMinus.trim(); 
    orden = ordenMinus.split(" ");
    let buenaSintaxis = false;

    // Si la orden que manda el usuario está vacia le indicamos mediante una alerta de BOOTSTRAP que no se puede ejecutar
    if (orden == "") 
    {
      document.getElementsByTagName('body')[0].innerHTML='<div class="alert alert-dark alert-dismissible fade show" role="alert">'+
          "<strong id='mensajito'>¡NO PUEDES EJECUTAR EL JUEGO SIN ÓRDENES!</strong>"+
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
            '<span><i class="fas fa-times"></i></span>'+
          "</button>"+
        "</div>"+document.getElementsByTagName('body')[0].innerHTML;

    // Si la orden contiene información, se analiza
    } else 
    {
        buenaSintaxis = analizarCodigo(codigo);
        x++;
    }

    // Si al analizar tiene buena sintaxis
    if (buenaSintaxis) 
    {
        // Se mete todo en el mismo array
        for (let i = 0; i < orden.length; i++) 
        {
            codigo[0] += "," + orden[i];
        }

        arrayDeCodigo = new Array(codigo.slice());
        guardaBucle = "";

        reloj.intervalo = setInterval(function () 
        {
            let repetir = false;
            do 
            {
                if (arrayDeCodigo.length == 0) 
                {
                    clearInterval(reloj.intervalo);
                    return true;
                }
                while (arrayDeCodigo[codigoFinal()].length == 0) 
                {
                    // Se elimina el último en caso de estuviera vacío
                    arrayDeCodigo.pop(); 
                    if (typeof (arrayDeCodigo[codigoFinal()]) == "undefined") 
                    {
                        return false;
                    }
                }

                revisarIf();

                if (!compruebaSentencias()) 
                {
                    repetir = true;
                } else 
                {
                    repetir = false;
                }

            } while (repetir);

        }, reloj.velocidad);
    }
}

// Instanciamos el objeto robot
var haypintar = false;
var robot = {
    // Establecemos sus posiciones iniciales y direccion, en este caso, hacia arriba en el mapa
    x: 13,
    y: 10,
    posicion: 0,

    // Le indicamos las posicioenes y direccion de inicio, y con esta función siempre se iniciará así
    inicio: function ()
    {
        this.x = 13;
        this.y = 11;
        this.posicion = 0;
        construirmapaTablero();
    },

    // Función para poder avanzar
    avanzar: function () 
    {

        if (this.comprobarCelda() && ((this.y != 0 && this.posicion == 0) || (this.x != 0 && this.posicion == 1) || (this.y != 10 && this.posicion == 2) || (this.x != 14 && this.posicion == 3)))
        {
            // Controlamos que no se salga del mapa, que no hay ninguna mina y si la hay la vuelve a pintar, a no ser que la desactive
            if (this.y + 1 != 12 && this.comprobarMina())
            {
                this.pintar("⚙️");
            }
            else
            {
                // Si hay mina cambia el dibujo y muestra una X
                if (haypintar == true) {
                    this.pintar("X");
                    haypintar = false;
                }
                else
                {
                    this.pintar("");
                }
            }

            let flechita = "";

            // Dependiendo de la posición de nuestro robot, avanzaremos en una dirección
            switch (this.posicion) 
            {
                case 0:
                    this.y--;
                    flechita += "▲";
                    break;
                case 1:
                    this.x--;
                    flechita += "◀";
                    break;
                case 2:
                    this.y++;
                    flechita += "▼";
                    break;
                case 3:
                    this.x++;
                    flechita += "►";
            }

            this.pintar(flechita);

        // En caso de llegar a la celda de salir, se acaba
        } else if (this.x == 1 && this.y == 0 && this.posicion == 0)
        {
            clearInterval(reloj.intervalo);

            // Comprobamos cuantas minas va desactivando el usuario
            let cuantasMinasQuedan = 0;
            for (let i = 0; i < mapaTableroNuevo.length; i++) 
            {
                for (let j = 0; j < mapaTableroNuevo[i].length; j++)
                {
                    if (mapaTableroNuevo[i][j] == "⚙️") 
                    {
                        cuantasMinasQuedan++;
                    }
                }
            }

            // Si quedan minas le indicamos cuantas quedan por desactivar mediante una alerta de BOOTSTRAP
            if (cuantasMinasQuedan > 0) 
            {
                document.getElementsByTagName('body')[0].innerHTML='<div class="alert alert-warning alert-dismissible fade show" role="alert">'+
                    "<strong id='mensajito'>DEBES DE DESACTIVAR LAS " +cuantasMinasQuedan+ " MINAS QUE TE QUEDAN</strong>"+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                      '<span><i class="fas fa-times"></i></span>'+
                    "</button>"+
                  "</div>"+document.getElementsByTagName('body')[0].innerHTML;
            // Si no, pues gana y se lo volvemos a indicar mediante una alerta de BOOTSTRAP
            } else 
            {
                document.getElementsByTagName('body')[0].innerHTML='<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    "<strong id='mensajito'>¡HAS GANADO!</strong>"+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                      '<span><i class="fas fa-times"></i></span>'+
                    "</button>"+
                  "</div>"+document.getElementsByTagName('body')[0].innerHTML;


            }

        } else 
        {
            // Y en caso de que se salga del mapa, se lo volvemos a indicar mediante una alerta de BOOTSTRAP
            document.getElementsByTagName('body')[0].innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                "<strong id='mensajito'>¡TE HAS SALIDO!</strong>"+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                  '<span><i class="fas fa-times"></i></span>'+
                "</button>"+
              "</div>"+document.getElementsByTagName('body')[0].innerHTML;
            clearInterval(reloj.intervalo);
        }
    },

    // Función para girar a la izquierda
    giraIzquierda: function () 
    {
        if (this.y != 11) 
        {
            this.posicion++;
            posicion();
        }
    },

    // Función para girar a la derecha
    giraDerecha: function () 
    {
        if (this.y != 11) 
        {
            this.posicion--;
            posicion();
        }
    },

    // Función para pintar el robot si no se sale
    pintar: function (flechita) 
    {
        if (this.y + 1 != 12) 
        {
            // Guardamos el div que contiene el mapa
            let mapa = document.getElementById("mapa");
            // Guardamos las celdas que hemos creado en la función pintar mapaTablero del objeto mapaTablero
            let filas = mapa.getElementsByClassName('filas');
            // Guardamos las celdas
            let celdas = filas[this.y].getElementsByClassName('celdas');
            celdas[this.x].innerHTML = flechita;
        }
    },

    // Función que comprueba que la celda a la que se avanza está sin mina y el robot no se sale del mapa
    comprobarCelda: function () 
    {
        switch (this.posicion) 
        {
            case 0:
                return this.y != 0 && (mapaTableroNuevo[this.y - 1][this.x] == "" || mapaTableroNuevo[this.y - 1][this.x] == "⚙️");
            case 1:
                return this.x != 0 && (mapaTableroNuevo[this.y][this.x - 1] == "" || mapaTableroNuevo[this.y][this.x - 1] == "⚙️");
            case 2:
                return this.y != 10 && (mapaTableroNuevo[this.y + 1][this.x] == "" || mapaTableroNuevo[this.y + 1][this.x] == "⚙️");
            case 3:
                return this.x != 14 && (mapaTableroNuevo[this.y][this.x + 1] == "" || mapaTableroNuevo[this.y][this.x + 1] == "⚙️");
        }
    },


    // Función que desactivará la mina
    desactivarMina: function () 
    {
        if (this.comprobarMina()) 
        {
            let minas = document.getElementById('minas');
            let contador = minas.getElementsByTagName('span')[0];
            contador.innerHTML++;
            haypintar = true;
            mapaTableroNuevo[this.y][this.x] = "X";
        }
    },

    // Función para averiguar si hay una mina cuando avanzamos
    comprobarMina: function () 
    {
        if (this.y != 11)
        {
            return mapaTableroNuevo[this.y][this.x] == "⚙️";
        }
    },


    //Aquí se comprueba que no se sale del mapa
    saleMapa: function () 
    {
        switch (this.posicion) 
        {
            case 0:
                return this.y == 0;

            case 1:
                return this.x == 0;

            case 2:
                return this.y == 10;

            case 3:
                return this.x == 14;
        }
    }
};
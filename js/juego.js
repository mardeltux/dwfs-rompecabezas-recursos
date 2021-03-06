//
// Declaracion de variables globales
//

/* Arreglo que contiene las intrucciones del juego. */
var instrucciones = ['Mueve las piezas para arriba abajo izquierda derecha hasta que obtengas la imagen deseada.', 'Tomate un mate y divertite!'];

/*Arreglo para ir guardando los movimientos que se vayan realizando. */
var movimientos = [];

/* Representación de la grilla. Cada número representa a una pieza.
El 9 es la posición vacía. */
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía.
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* juegoPausado es una variable global booleana que me permite mientras el juego
esta pausado dejar las fichas estaticas evitando que sigan jugando hasta que quiten la pausa. */
var juegoPausado = false;

//
// Funcion para cronometrar la partida del juego.
//
var tiempoCronometrado = '0:0:0';
var hr = 0;
var min = 0;
var seg = 0;
var segundos = 0;
var control;

function cronometro() {
  var elementoTiempo = document.getElementById('tiempo');
  control = setInterval(function() {
    hr = Math.floor(segundos / 3600);
    min = Math.floor(segundos / 60) % 60;
    seg = segundos % 60;
    tiempoCronometrado = hr + ':' + min + ':' + seg;
    elementoTiempo.innerText = tiempoCronometrado;
  	segundos++;
  }, 1000);
}

function cronometroPausar() {
  clearInterval(control);
}

function cronometroReiniciar() {
  clearInterval(control);
  segundos = 0;
  cronometro();
}

function cronometroResume() {
  cronometro();
}

//
// Varias funciones que desarrollan la logica del juego.
//

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro.
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'.
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista().
Podés ver su implementación en la ultima parte de este codigo. */
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
      mostrarInstruccionEnLista(instrucciones[i], 'lista-instrucciones')
    };
}

/* COMPLETAR: Crear función que agregue la última dirección al arreglo de movimientos
y utilice actualizarUltimoMovimiento para mostrarlo en pantalla */
function agregarUltimaDireccion(direccion) {
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion);
}

/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora.
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
function chequearSiGano() {
    var valorAnterior = 0;
    for (var i = 0; i < grilla.length; i++) {
      for (var j = 0; j < grilla[i].length; j++) {
        console.log(valorAnterior + "<" + grilla[i][j]);
        if ((valorAnterior + 1) !== grilla[i][j]) {
          return false;
        }
        valorAnterior = grilla[i][j];
      }
    }
    return true;
}


function mostrarCincoUltimosMovimientos(arrelgoDeMovimientos) {
  var listaCincoMovimientos = document.getElementById('cinco-mov');
  var comienzo = arrelgoDeMovimientos.length - 5;
for (var i = comienzo; i < arrelgoDeMovimientos.length; i++) {
  var unMovimiento = document.createElement('div');
  switch (arrelgoDeMovimientos[i]) {
    case codigosDireccion.ARRIBA:
      unMovimiento.innerText = '↑';
      listaCincoMovimientos.appendChild(unMovimiento);
      console.log('↑');
      break;
    case codigosDireccion.ABAJO:
      unMovimiento.innerText = '↓';
      listaCincoMovimientos.appendChild(unMovimiento);
      console.log('↓');
      break;
    case codigosDireccion.DERECHA:
      unMovimiento.innerText = '→';
      listaCincoMovimientos.appendChild(unMovimiento);
      console.log('→');
      break;
    case codigosDireccion.IZQUIERDA:
      unMovimiento.innerText = '←';
      listaCincoMovimientos.appendChild(unMovimiento);
      console.log('←');
      break;
  }
}
}

function mostrarTiempoTranscurrido() {
  var elementoTiempo = document.getElementById('tiempo-transcurrido');
  elementoTiempo.innerText = tiempoCronometrado;
}

/* Función que intercambia dos posiciones en la grilla.
Pensar como intercambiar dos posiciones en un arreglo de arreglos.
Para que tengas en cuenta:
Si queremos intercambiar las posiciones [1,2] con la [0, 0], si hacemos:
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con una variable temporal?
*/
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var contenedorAuxiliar = grilla[filaPos1][columnaPos1];
    grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
    grilla[filaPos2][columnaPos2] = contenedorAuxiliar;
}

/* Actualiza la posición de la pieza vacía */
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}


/* Para chequear si la posicón está dentro de la grilla. */
function posicionValida(fila, columna) {
    var width = grilla.length;
    var height = grilla[0].length;
    return 0 <= fila && fila < width && 0 <= columna && columna < height;
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;
  console.log('direccion:'+direccion);

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }

  /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
  Para que esta parte del código funcione correctamente deberás haber implementado
  las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    agregarUltimaDireccion(direccion);
  }
}


//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
//////////////////////////////////////////////////////////

/* Las funciones y variables que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */

/* codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */
function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */
function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora,
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {
        /* Aca tomo la variable global juegoPausado para ver si esta
        pausado o activo y asi permitir o no mover las imagenes.*/
        if (juegoPausado === false) {
          moverEnDireccion(evento.which);
          var gano = chequearSiGano();
          if (gano) {
            setTimeout(function() {
              mostrarCartelGanador();
            }, 500);
          }
          evento.preventDefault();
        }
      }
    })
}

//
// Funciones para los carteles Bienvenida, Nuevo y Pausado
//
/*Muestra cartel de Bienvenida al juego.*/
function mostrarCartelBienvenida() {
  modalBienvenida.style.display = 'block';
}
/*Implementacion Salida de cartel de bienvenida al juego.*/
var modalBienvenida = document.getElementById('modal-bienvenida');
modalBienvenida.addEventListener('click', function(){
  modalBienvenida.style.display = 'none';
  iniciarJuego();
});

/*Muestra cartel de juego Pausado.*/
function mostrarCartelPausado() {
  modalPausado.style.display = 'block';
}
/*Implementacion Salida de cartel de juego pausado.*/
var modalPausado = document.getElementById('modal-pausado');
modalPausado.addEventListener('click', function() {
  modalPausado.style.display = 'none';
  resumirJuego();
});

/*Muestra cartel de juego Nuevo.*/
function mostrarCartelNuevo() {
  modalNuevo.style.display = 'block';
}
/*Implementacion Salida de cartel de juego nuevo.*/
var modalNuevo = document.getElementById('modal-nuevo');
modalNuevo.addEventListener('click', function() {
  modalNuevo.style.display = 'none';
  movimientos = [];
  juegoPausado = false;
  mezclarPiezas(30);
  cronometroReiniciar();
});

/*Muestra cartel de Ganador.*/
function mostrarCartelGanador() {
    modalGanador.style.display = "block";
    cronometroPausar();
    mostrarCincoUltimosMovimientos(movimientos);
    mostrarTiempoTranscurrido();
}
/*Implementacion Salida de cartel ganador.*/
var modalGanador = document.getElementById('modal-ganador');
modalGanador.addEventListener('click', function() {
  modalGanador.style.display = 'none';
  var elemento = document.getElementById('cinco-mov');
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  };
  juegoPausado = false;
  mezclarPiezas(60);
  cronometroReiniciar();
  movimientos = [];
});

//
// Funciones de las 4 funcionalidades que tiene el juego (inicio-nuevo-pausa-resumir)
//

/* Se inicia el rompecabezas mezclando las piezas 60 veces
y ejecutando la función para que se capturen las teclas que
presiona el usuario */

/* Funcion que inicia el juego por primera vez (primer inicio)*/
function iniciarJuego() {
  mostrarInstrucciones(instrucciones);
  cronometro();
  mezclarPiezas(60);
  capturarTeclas();
}

function resumirJuego() {
  cronometroResume();
  juegoPausado = false;
}

function pausarJuego() {
  cronometroPausar();
  juegoPausado = true;
  mostrarCartelPausado();
}

/* Funcion que inicia un juego Nuevo luego de que ya haya cargado el juego por primera vez */
function nuevoJuego() {
  cronometroPausar();
  juegoPausado = true;
  mostrarCartelNuevo();
}

//
// Inicio del juego
//
mostrarCartelBienvenida();

//Variables
let amigos= []; //Array donde se almacenarán los nombres ingresados.
let longitudLista= 0;
let minimoAmigos = 2;
let amigoSecreto = 0;

//Funciones


function designarElementoHtml(elemento,texto) {
  let elementoHtml = document.querySelector(elemento);
  elementoHtml.innerHTML = texto; 
}

//Función para agregar amigos.
function agregarAmigo() {
  let nombreAmigoDelJugador = document.getElementById('amigo').value; //El valor del input almacenado adentro de una variable.
  if (nombreAmigoDelJugador == '') {  //Si el input está vacio nos pedirá insertar un nombre.
    designarElementoHtml('.result-list','Por favor, inserte un nombre.');
  } else if (amigos.includes(nombreAmigoDelJugador)) {//Si el nombre ya se encuentra en la lista, nos pedirá agregar uno nuevo.
      designarElementoHtml('.result-list','El nombre ya se agregó. Por favor ingresa otro nombre');
    } else { //Si el nombre no se encuentra en la lista, entonces lo agrega, limpia el imput y si el apartado resultado tenía uno de los mensajes anteriores, lo elimina y deja en blanco.
      amigos.push(nombreAmigoDelJugador);
      document.getElementById('amigo').value = '';
      designarElementoHtml('.result-list','');
      recorrerLista();
    }
}

//Evento que nos permite agregar nombres sólo presionando la tecla 'ENTER'.
document.getElementById('amigo').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      agregarAmigo();
     }
  }
);

//Función para actualizar lista de amigos.
function recorrerLista() {
  let listaDeAmigos = document.getElementById('listaAmigos'); //Tomamos el valor del elemento 'listaAmigos' y lo almacenamos en una variable.
  listaDeAmigos.innerHTML = ''; // Limpia el contenido del elemento HTML donde se mostrará la lista de amigos.
  for(let i=0; i<amigos.length; i++) { //Loop para recorrer el array y agregar cada nombre como elemento de lista <li>
    let li = document.createElement('li');
    li.textContent = amigos[i];
    listaDeAmigos.appendChild(li);
  }
}

//Función para realizar el sorteo
  function sortearAmigo() {
    if (amigos.length === longitudLista) { //Si la lista está vacía pediimos que se ingresen nombres para realizar el sorteo.
      designarElementoHtml('.result-list','La lista de nombres está vacia. Ingresa nombres para realizar el sorteo.');
    } else if(amigos.length < minimoAmigos) { //Si la lista tiene menos de 2 nombres, no realizará el sorteo hasta que ingrese el 2do nombre.
        designarElementoHtml('.result-list', `Por favor ingresa un nombre más. El mínimo es ${minimoAmigos} nombres para poder realizar el sorteo.`);
    }  else {
          let numeroDeAmigos = amigos.length;//Almacenamos la cantidad de amigos en una variable.
          let indiceAleatorio = Math.floor(Math.random()*numeroDeAmigos); //Generamos número del índice del arreglo.
          amigoSecreto = amigos[indiceAleatorio]; //El resultado del sorteo es almacenado en la variable.
          designarElementoHtml('.result-list', `El amigo secreto es ${amigoSecreto}`); //Mostramos el resultado en el elemento correspondiente.
          amigos.splice(0,amigos.length); //Vaciamos el arreglo para poder volver a sortear nuevamente.
      }
    
  }

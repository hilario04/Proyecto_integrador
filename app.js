const cartasData = [
    { id: "rey", nombre: "Rey", descripcion: "Puede ocupar un espacio vacío." },
    { id: "as", nombre: "As", descripcion: "Inicia cada pila final." },
    { id: "reina", nombre: "Reina", descripcion: "Se coloca debajo del Rey." },
    { id: "jota", nombre: "Jota", descripcion: "Va debajo de la Reina." }
];

let cartasSeleccionadas = [];

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("contact-form");
    const botones = document.querySelectorAll("#botones-cartas button");
    const botonLimpiar = document.getElementById("limpiar-lista");
    const enlaces = document.querySelectorAll("nav a");

    formulario.addEventListener("submit", enviarFormulario);

    botones.forEach(boton => {
        boton.addEventListener("click", seleccionarCarta);
    });

    botonLimpiar.addEventListener("click", limpiarLista);

    enlaces.forEach(link => {
        link.addEventListener("click", cerrarMenu);
    });

});

function cerrarMenu(){

    const menu = document.getElementById("menu");

    if(menu){
        menu.checked = false;
    }

}

function enviarFormulario(e){

    e.preventDefault();

    const form = e.target;

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    const resultado = validarFormulario(nombre,email,mensaje);

    mostrarMensaje(resultado.mensaje,resultado.estado);

    if(resultado.estado=="success"){
        form.reset();
    }

}

function validarFormulario(nombre,email,mensaje){

    if(nombre==""){
        return{
            estado:"error",
            mensaje:"Ingrese su nombre."
        };
    }

    if(email==""){
        return{
            estado:"error",
            mensaje:"Ingrese su email."
        };
    }

    if(mensaje==""){
        return{
            estado:"error",
            mensaje:"Escriba un mensaje."
        };
    }

    return{
        estado:"success",
        mensaje:"Formulario enviado correctamente."
    };

}

function mostrarMensaje(texto,tipo){

    const mensaje = document.getElementById("form-message");

    mensaje.textContent = texto;
    mensaje.className = "form-message " + tipo;

}

function seleccionarCarta(e){

    const carta = e.target.dataset.carta;

    agregarCarta(carta);

}

function agregarCarta(carta){

    const lista = document.getElementById("lista-cartas");

    if(cartasSeleccionadas.includes(carta)){

        mostrarMensaje("La carta ya fue seleccionada.","error");

        return;
    }

    cartasSeleccionadas.push(carta);

    const li = document.createElement("li");

    li.textContent = carta;

    lista.appendChild(li);

    const encontrada = cartasData.find(item => item.nombre === carta || item.id === carta);

    if(encontrada){

        mostrarMensaje(carta + ": " + encontrada.descripcion,"success");

    }

}

function limpiarLista(){

    document.getElementById("lista-cartas").innerHTML="";

    cartasSeleccionadas=[];

    mostrarMensaje("Lista vaciada.","success");

}
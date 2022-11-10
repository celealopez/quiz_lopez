
////////////////////////////////

let pregunta_random = true;
let juego_terminado = true;
let reiniciar_juego = true;
let interp = [];



const obtenerDatos = async ()=>{
  const response = await fetch("base-preguntas.json")
  const arr = await response.json();
  interp = arr
  escogerPreguntaRandom();
  
}



  
window.onload = obtenerDatos();

  let pregunta;
let respuestas_posibles;
btn_corresp = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;


function escogerPreguntaRandom() {
    let n;
    if (pregunta_random) {
      n = Math.floor(Math.random() * interp.length);
    } else {
      n = 0;
    }
  
    while (npreguntas.includes(n)) {
      n++;
      if (n >= interp.length) {
        n = 0;
      }
      if (npreguntas.length == interp.length) {
       
        if (juego_terminado) {
            final.play();
            swal.fire(`juego terminado respondiste bien ${preguntas_correctas} de ${preguntas_hechas} preguntas`)
          
        }
        if (reiniciar_juego) {
          preguntas_correctas = 0
          preguntas_hechas = 0
        }
        npreguntas = [];
      }
    }
    npreguntas.push(n);
    preguntas_hechas++;
  
    elegirPregunta(n);
  }

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
    }
    return texto;
    }





    function elegirPregunta(n) {
        pregunta = interp[n];
        select_id("categoria").innerHTML = pregunta.categoria;
        select_id("pregunta").innerHTML = pregunta.pregunta;
        
        select_id("numero").innerHTML = n;
        let pc = preguntas_correctas;
        if (preguntas_hechas > 1) {
          select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
        } else {
          select_id("puntaje").innerHTML = "";
        }
      
        style("imagen").objectFit = pregunta.objectFit;
        desordenarRespuestas(pregunta);
        if (pregunta.imagen) {
          select_id("imagen").setAttribute("src", pregunta.imagen);
          style("imagen").height = "200px";
          style("imagen").width = "100%";
        } else {
          style("imagen").height = "0px";
          style("imagen").width = "0px";
          setTimeout(() => {
            select_id("imagen").setAttribute("src", "");
          }, 500);
        }
      }

      function desordenarRespuestas(pregunta) {
        respuestas_posibles = [
          pregunta.respuesta,
          pregunta.incorrecta1,
          pregunta.incorrecta2,
          pregunta.incorrecta3,
        ];
        respuestas_posibles.sort(() => Math.random() - 0.5);
      
        select_id("btn1").innerHTML = respuestas_posibles[0];
        select_id("btn2").innerHTML = respuestas_posibles[1];
        select_id("btn3").innerHTML = respuestas_posibles[2];
        select_id("btn4").innerHTML = respuestas_posibles[3];
      }
      
      let suspender_botones = false;
      
      function oprimir_btn(i) {
        
        if (suspender_botones) {
          return;
        }
        suspender_botones = true;
        if (respuestas_posibles[i] == pregunta.respuesta) {
          preguntas_correctas++;
          btn_corresp[i].style.background = "red";
          yes.play();
        } else {
          btn_corresp[i].style.background = "red" ;
          sonido.play()
        }
        for (let j = 0; j < 4; j++) {
          if (respuestas_posibles[j] == pregunta.respuesta) {
            btn_corresp[j].style.background = " rgb(9, 209, 9)";
            break;
          }
        }
        setTimeout(() => {
          reiniciar();
          suspender_botones = false;
        }, 2000);
      }
      

      
      function reiniciar() {
        for (const btn of btn_corresp) {
          btn.style.background = "black";
        }
        escogerPreguntaRandom();
      }
      
      function select_id(id) {
        return document.getElementById(id);
      }
      
      function style(id) {
        return select_id(id).style;
      }
      
      function readText(ruta_local) {
        var texto = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", ruta_local, false);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
          texto = xmlhttp.responseText;
        }
        return texto;
      }
      
let sonido = new Audio();
let yes = new Audio();
let final = new Audio();

let susp = new Audio();
sonido.src = "./SD_NAVIGATE_51.mp3"
yes.src="./yess-effects.mp3"
final.src = "./ganar-tonos.mp3"

susp.src="./musica-suspenso-.mp3"

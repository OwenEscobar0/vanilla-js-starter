import {
  agregarTarea,
  procesarEnter,
  eliminarTarea as eliminar,
  marcarCompletada as completar,
} from "./main.js";

var eliminarTarea = eliminar;
var marcarCompletada = completar;
let btnAdd = document.getElementById("agregarTarea");

btnAdd.onclick = agregarTarea;

let inputTarea = document.getElementById("procesarEnter");
inputTarea.onkeydown = procesarEnter;

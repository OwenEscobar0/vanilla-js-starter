import {
  agregarTarea,
  procesarEnter,
  marcarCompletada as completar,
  cargarTareas,
} from "./main.js";

var marcarCompletada = completar;
let btnAdd = document.getElementById("agregarTarea");

btnAdd.onclick = agregarTarea;

let inputTarea = document.getElementById("procesarEnter");
let dateImput = inputTarea.value;
inputTarea.onkeydown = procesarEnter;
document.addEventListener("DOMContentLoaded", cargarTareas);

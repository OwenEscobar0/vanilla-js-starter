/////////////////////  imports /////////////////////////
import { getTasks, deleteTask, postTask, updateTask } from "../JS/api.js";
/////////////////////  imports /////////////////////////

/////////////////////  variables  /////////////////////////
var ul = document.getElementById("listaDeTareas");
/////////////////////  variables  /////////////////////////

function limpiarInput() {
  document.getElementsByClassName("descripcion_tarea")[0].value = "";
}

let contador = document.getElementsByClassName("tareas_completadas")[0];
function actualizarContador(valor) {
  let tareasCompletadas = parseInt(contador.textContent) + valor;
  contador.textContent = tareasCompletadas;
}

function marcarCompletada(id, checkbox) {
  if (checkbox.checked) {
    actualizarContador(1);
    // updateTask("", { checked: true });
  } else {
    actualizarContador(-1);
    // updateTask("", { checked: false });
  }
  updateTask(id, { checked: checkbox.checked });
}

function procesarEnter(event) {
  if (event.key === "Enter") {
    agregarTarea();
  }
}

async function agregarTarea() {
  if (
    document.getElementsByClassName("descripcion_tarea")[0].value.length > 0
  ) {
    const tareaDescripcion =
      document.getElementsByClassName("descripcion_tarea")[0].value;

    let task = {
      task: tareaDescripcion,
      checked: false,
    };

    let responseTask = await postTask(task);

    newTask(responseTask.id, tareaDescripcion, false);

    let sinTareas = document.getElementsByClassName("sin_tareas")[0];
    if (sinTareas.style.display === "block") {
      sinTareas.style.display = "none";
    }
    // document.getElementsByClassName("lista_tareas")[0].appendChild(div);
    limpiarInput();

    Swal.fire({
      icon: "success",
      title: "¡Tarea agregada!",
      showConfirmButton: false,
      timer: 800,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Agregar tarea!",
    });
  }
}
function newTask(id, tareaDescripcion, checked) {
  let p = document.createElement("p");
  p.textContent = tareaDescripcion;
  let basurero = document.createElement("i");
  basurero.textContent = "✖️";
  basurero.className = "eliminar_tarea btn btn-dr";

  let input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;

  let li = document.createElement("li");
  li.className = "tarea";
  //Le asigno el id al elemento de la lista para luego eliminar por el mismo id
  li.id = id;

  input.onclick = () => marcarCompletada(id, input);
  basurero.addEventListener("click", async function () {
    await deleteTask(li.id);
    ul.removeChild(li);
    if (input.parentElement.getElementsByTagName("input")[0].checked) {
      actualizarContador(-1);
    }
    if (document.getElementsByClassName("tarea").length === 0) {
      document.getElementsByClassName("sin_tareas")[0].style.display = "block";
    }
  });
  li.appendChild(input);
  li.appendChild(p);
  li.appendChild(basurero);
  ul.appendChild(li);
  let sinTareas = document.getElementsByClassName("sin_tareas")[0];
  sinTareas.style.display = "none"
}
async function cargarTareas() {
  let tareas = await getTasks();
  let contador1 = 0;
  tareas.forEach((tarea) => newTask(tarea.id, tarea.task, tarea.checked));
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].checked == true) {
      contador1++;

    }
  }
  contador.textContent = contador1;
}

export { agregarTarea, procesarEnter, marcarCompletada, cargarTareas };

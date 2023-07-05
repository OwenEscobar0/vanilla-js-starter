function limpiarInput() {
  document.getElementsByClassName("descripcion_tarea")[0].value = "";
}
function actualizarContador(valor) {
  let contador = document.getElementsByClassName("tareas_completadas")[0];
  let tareasCompletadas = parseInt(contador.textContent) + valor;
  contador.textContent = tareasCompletadas;
}
function marcarCompletada(checkbox) {
  if (checkbox.checked) {
    actualizarContador(1);
  } else {
    actualizarContador(-1);
  }
}
function eliminarTarea(tarea) {
  tarea.parentElement.remove();
  if (tarea.parentElement.getElementsByTagName("input")[0].checked) {
    actualizarContador(-1);
  }
  if (document.getElementsByClassName("tarea").length === 0) {
    document.getElementsByClassName("sin_tareas")[0].style.display = "block";
  }
}
function procesarEnter(event) {
  if (event.key === "Enter") {
    agregarTarea();
  }
}
function agregarTarea() {
  if (
    document.getElementsByClassName("descripcion_tarea")[0].value.length > 0
  ) {
    const tareaDescripcion =
      document.getElementsByClassName("descripcion_tarea")[0].value;
    let div = document.createElement("div");
    div.className = "tarea";
    let p = document.createElement("p");
    p.textContent = tareaDescripcion;
    let basurero = document.createElement("p");
    basurero.textContent = "🗑️";
    basurero.className = "eliminar_tarea";
    basurero.onclick = () => eliminarTarea(basurero);
    let input = document.createElement("input");
    input.type = "checkbox";
    input.onclick = () => marcarCompletada(input);

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(basurero);
    let sinTareas = document.getElementsByClassName("sin_tareas")[0];
    if (sinTareas.style.display === "block") {
      sinTareas.style.display = "none";
    }
    document.getElementsByClassName("lista_tareas")[0].appendChild(div);
    limpiarInput();
  } else {
    alert("¡AGREGAR UNA TAREA!");
  }
}
export { agregarTarea, procesarEnter, marcarCompletada, eliminarTarea };

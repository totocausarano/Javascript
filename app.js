let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

// Clase Alumno 
class Alumno {
    constructor(nombre, apellido, dni, nota1, nota2) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.nota1 = parseFloat(nota1);
        this.nota2 = parseFloat(nota2);
        this.promedio = this.calcularPromedio();
        this.condicion = this.obtenerCondicion();
    }

    calcularPromedio() {
        return (this.nota1 + this.nota2) / 2;
    }

    obtenerCondicion() {
        if (this.promedio >= 8 && this.nota1 >= 7 && this.nota2 >= 7) {
            return "Promocionado";
        } else if (this.promedio >= 6) {
            return "Regular";
        } else {
            return "Libre";
        }
    }
}
// Función para agregar un nuevo alumno
function agregarAlumno(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreAlumno").value.trim();
    const apellido = document.getElementById("apellidoAlumno").value.trim();
    const dni = document.getElementById("dniAlumno").value.trim();
    const nota1 = document.getElementById("nota1").value;
    const nota2 = document.getElementById("nota2").value;

    // Validación de campos vacíos
    if (!nombre || !apellido || !dni || !nota1 || !nota2) {
        mostrarAlerta("Todos los campos son obligatorios.", "error");
        return;
    }

    // Validar que el DNI no esté repetido
    if (alumnos.some(alumno => alumno.dni === dni)) {
        mostrarAlerta(`El alumno con DNI ${dni} ya está registrado.`, "warning");
        return;
    }

    // Crear y agregar el alumno
    const nuevoAlumno = new Alumno(nombre, apellido, dni, nota1, nota2);
    alumnos.push(nuevoAlumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    mostrarAlumno(nuevoAlumno);
    mostrarAlerta("Alumno agregado exitosamente.", "success");

    // Limpiar el formulario
    document.getElementById("formAgregarAlumno").reset();
}
// Función para mostrar un alumno en la lista
function mostrarAlumno(alumno) {
    const lista = document.getElementById("listaAlumnos");
    const li = document.createElement("li");
    li.textContent = `${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni} - Condición: ${alumno.condicion} - Promedio: ${alumno.promedio.toFixed(2)}`;
    lista.appendChild(li);
}
// Función para buscar un alumno por DNI
function buscarAlumno(event) {
    event.preventDefault();
    const dni = document.getElementById("dniBusqueda").value.trim();
    const resultadoBusqueda = document.getElementById("resultadoBusqueda");
    if (!dni) {
        mostrarAlerta("Ingrese el DNI del alumno a buscar.", "warning");
        return;
    }
    const alumnoEncontrado = alumnos.find(alumno => alumno.dni === dni);

    if (alumnoEncontrado) {
        resultadoBusqueda.textContent = `El alumno ${alumnoEncontrado.nombre} ${alumnoEncontrado.apellido} con DNI ${dni} es ${alumnoEncontrado.condicion} con un promedio de ${alumnoEncontrado.promedio.toFixed(2)}.`;
    } else {
        resultadoBusqueda.textContent = `No se encontró ningún alumno con el DNI ${dni}.`;
    }
}
// Función para limpiar la lista de alumnos
function limpiarListaAlumnos() {
    Swal.fire({
        text: "¿Estás seguro de que quieres borrar la lista de alumnos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
    }).then(result => {
        if (result.isConfirmed) {
            alumnos = [];
            localStorage.removeItem("alumnos");
            document.getElementById("listaAlumnos").innerHTML = "";
            document.getElementById("resultadoBusqueda").textContent = "";
            mostrarAlerta("Lista de alumnos eliminada exitosamente.", "success");
        }
    });
}
// Función para mostrar alertas usando SweetAlert
function mostrarAlerta(mensaje, tipo) {
    Swal.fire({
        text: mensaje,
        icon: tipo,
        confirmButtonText: "Aceptar",
    });
}
// Cargar alumnos guardados al cargar la página
function cargarAlumnosGuardados() {
    alumnos.forEach(alumno => mostrarAlumno(alumno));
}
document.getElementById("formAgregarAlumno").addEventListener("submit", agregarAlumno);
document.getElementById("buscarAlumno").addEventListener("click", buscarAlumno);
document.getElementById("limpiarLista").addEventListener("click", limpiarListaAlumnos);
document.addEventListener("DOMContentLoaded", cargarAlumnosGuardados);
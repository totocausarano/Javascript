
let promocionados = [];
let regulares = [];
let libres = [];
class Alumno {
    constructor(nombre, nota1, nota2) {
        this.nombre = nombre;
        this.nota1 = parseFloat(nota1);
        this.nota2 = parseFloat(nota2);
        this.promedio = (this.nota1 + this.nota2) / 2;
        this.condicion = this.obtenerCondicion(); 
    }
    obtenerCondicion() {
        if (this.promedio >= 8 && this.nota1 >= 7 && this.nota2 >= 7) {
            promocionados.push(this.nombre); 
            return "Promocionado";
        } else if (this.promedio >= 6) {
            regulares.push(this.nombre); 
            return "Regular";
        } else {
            libres.push(this.nombre); 
            return "Libre";
        }
    }
}
function agregarAlumno(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreAlumno').value;
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;
    const nuevoAlumno = new Alumno(nombre, nota1, nota2);
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnos.push(nuevoAlumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    mostrarAlumno(nuevoAlumno);
}

function mostrarAlumno(alumno) {
    const lista = document.getElementById("listaAlumnos");
    const li = document.createElement("li");
    li.textContent = `${alumno.nombre} - ${alumno.condicion} - Promedio: ${alumno.promedio}`;
    lista.appendChild(li);
}

document.getElementById("formAgregarAlumno").addEventListener("submit", agregarAlumno);

function buscarAlumno(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreBusqueda").value;
    const resultadoBusqueda = document.getElementById("resultadoBusqueda");

    if (promocionados.includes(nombre)) {
        resultadoBusqueda.textContent = `El alumno ${nombre} ha promocionado la materia.`;
    } else if (regulares.includes(nombre)) {
        resultadoBusqueda.textContent = `El alumno ${nombre} ha regularizado la materia.`;
    } else if (libres.includes(nombre)) {
        resultadoBusqueda.textContent = `El alumno ${nombre} ha quedado libre en la materia.`;
    } else {
        resultadoBusqueda.textContent = `El alumno ${nombre} no se encuentra en el registro.`;
    }
}

document.getElementById("buscarAlumno").addEventListener("click", buscarAlumno);
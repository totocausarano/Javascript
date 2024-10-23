
let promocionados = []
let regulares = []
let libres = []

function verificacionpromocion(){
    let alumno = prompt ("ingrese el nombre del alumno")
    let nota1 = prompt (`ingrese la nota del primer parcial del alumno ${alumno}`)
    let nota2 = prompt (`ingrese la nota del segundo parcial del alumno ${alumno}`)

    let promedio = (nota1 + nota2)/2;
    if (promedio >=8 && nota1 >= 7 && nota2 >= 7){   
        promocionados.push (alumno)
    } else if (promedio>=6 && nota1 >= 6 && nota2 >=6) {
        regulares.push (alumno)
    } else {
        libres.push (alumno)
    }
}
function buscaralumno(){
    let buscar = prompt ("ingrese el nombre del alumno al que desee buscar ")
    if (promocionados.includes(buscar)){
        alert (`el alumno ${buscar} promociono la materia`)
    }
    else if (regulares.includes(buscar)){
        alert (`el alumno ${buscar} regularizo la materia`)
    }
    else if (libres.includes(buscar)){
        alert (`el alumno ${buscar} no aprobo la materia`)
    }
    else {
        alert (`al alumno ${buscar} no se encuentra en ninguna lista`)
    }
}

let continuar = true

while (continuar) {
    let opcion = parseInt(prompt(`
    Bienvenido a la aplicación. Seleccione una opción:
    1. Ver condiciones de regularidad
    2. Agregar alumno
    3. Buscar alumno para saber su condición
    4. Terminar el programa
    `));

    switch (opcion) {
        case 1:
            alert(`Condiciones de regularidad:
            - Promoción: Promedio >= 8, y ambas notas >= 7
            - Regular: Promedio >= 6
            - Libre: Promedio < 6`);
            break;
        case 2:
            verificacionpromocion();
            break
        case 3:
            buscaralumno();
            break;
        case 4:
            continuar = false; 
            alert("El programa ha finalizado.");
            break;
    }
}
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const carritoContenedor = document.querySelector("#lista-carrito tbody");
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
let cursosAgregados = [];

function eventos() {
    listaCursos.addEventListener("click", agregarCurso);
    carrito.addEventListener("click", quitarCurso);

    //Vaciando el carrito de compras
    botonVaciarCarrito.addEventListener("click", () => {
        cursosAgregados = [];
        imprimirCursos();
    });
}

eventos();

//Agregando los cursos al carrito
function agregarCurso(click) {

    //Previniendo el comportamiento de los enlaces con #
    click.preventDefault();

    if (click.target.classList.contains("agregar-carrito")) { //Para erificar cuál clase tiene
        const cursoSeleccionado = click.target.parentElement.parentElement;
        // console.log(click.target.parentElement.parentElement)
        obtenerDatos(cursoSeleccionado);
    }
}

//Obteniendo los datos del curso
function obtenerDatos(cursoSeleccionado) {
    const infoCurso = {
        img: cursoSeleccionado.querySelector("img").src,
        titulo: cursoSeleccionado.querySelector("h4").textContent,
        precio: cursoSeleccionado.querySelector(".precio span").textContent,
        id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    }

    //Comprobando si ya está agregado el curso
    const agregado =  cursosAgregados.some( curso => curso.id === infoCurso.id );
    if(agregado) {
        const cursos = cursosAgregados.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;        
            } else {
                return curso;
            }
        });
        cursosAgregados = [...cursos];
    } else {
        //Agregando los cursos al carrito
        cursosAgregados.push(infoCurso);
    }
    
    imprimirCursos();
}

//Imprimiendo los cursos agregados
function imprimirCursos() {

    limpiarElementos();

    cursosAgregados.forEach(curso => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td><img src="${curso.img}" width="90px"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id=${curso.id}> X </td>
        `

        carritoContenedor.appendChild(tableRow);
    });
}

//Limpiando los elementos repetidos
function limpiarElementos() {
    carritoContenedor.innerHTML = " ";
}

//Eliminando cursos
function quitarCurso(click) {
    if (click.target.classList.contains("borrar-curso")) {
        const cursoEliminado = click.target.getAttribute("data-id");
        cursosAgregados = cursosAgregados.filter( curso => curso.id !== cursoEliminado);

        imprimirCursos();
        //Esta función se vuelve a llamar para iterar sobre el carrito de compras y devolver un carrito actualizado
    }
}

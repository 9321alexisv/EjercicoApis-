//-------------------------------DECLARACION DE VARIABLES-----------------------------------------------

let pagina = 1;
let idiomaSeleccionado = 'es-MX'; // Idioma predeterminado
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnEspanol = document.getElementById('btnEspanol'); // Botón para español
const btnIngles = document.getElementById('btnIngles'); // Botón para inglés
const txtTitulo = document.getElementById('txtTitulo');

//-------------------------------DECLARACION DE VARIABLES-----------------------------------------------

//-------------------------------BOTONES PAGINACION E IDIOMA--------------------------------------------
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

btnEspanol.addEventListener('click', () => {
    idiomaSeleccionado = 'es-MX';
    cargarPeliculas();
    mostrarGeneros();
    txtTitulo.textContent = "Peliculas Populares"
    btnAnterior.textContent = "Anterior"
    btnSiguiente.textContent = "Siguiente"
});

btnIngles.addEventListener('click', () => {
    idiomaSeleccionado = 'en-US'; // Cambiar a 'en-US' para inglés
    cargarPeliculas();
    mostrarGeneros();
    txtTitulo.textContent = "Most Popular Movies"
    btnAnterior.textContent = "Previous"
    btnSiguiente.textContent = "Next"
});

//-------------------------------BOTONES PAGINACION E IDIOMA--------------------------------------------

//-------------------------------FUNCION OBTENER GENEROS------------------------------------------------

async function obtenerGeneros() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=192e0b9821564f26f52949758ea3c473&language=${idiomaSeleccionado}&page=${pagina}`);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error(error);
        return [];
    }
}

//-------------------------------FUNCION OBTENER GENEROS------------------------------------------------

//-------------------------------FUNCION MOSTRAR GENEROS------------------------------------------------
var contenedorGeneros = document.getElementById("generos");

let idSeleccionado = '';

async function mostrarGeneros() {
    generos = await obtenerGeneros();
    console.log(generos);
    contenedorGeneros.innerHTML = '';
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero.id;
        option.textContent = genero.name || "Error";
        contenedorGeneros.appendChild(option);
    });

    // Agregar un evento de cambio al elemento <select>
    contenedorGeneros.addEventListener('change', function () {
        // Obtener el valor seleccionado y actualizar idSeleccionado
        idSeleccionado = this.value;
        // Cargar las películas con el nuevo filtro
        cargarPeliculas();
    });

    // Cargar las películas inicialmente
    cargarPeliculas();
}

mostrarGeneros();

//-------------------------------FUNCION CARGAR PELICULAS-----------------------------------------------

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=${idiomaSeleccionado}&page=${pagina}&with_genres=${idSeleccionado}`);
        // Obtener URl y enviar idioma y numero de pagina

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                            <div class="pelicula">
                                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                                <div class = "info">
                                    <h3 class="titulo">${pelicula.title}</h3>
                                    <div class = "descripcion">${pelicula.overview}</div>
                                    <h5 class = "fecha">${pelicula.release_date}</h5>
                                </div>  
                            </div>
                        `;
            }); // Pintar imagen, titulo, descripcion

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            console.log('La película que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }

    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();

//-------------------------------FUNCION CARGAR PELICULAS-----------------------------------------------




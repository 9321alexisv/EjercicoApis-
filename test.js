let pagina = 1;
let idiomaSeleccionado = 'es-MX'; // Idioma predeterminado

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnEspanol = document.getElementById('btnEspanol'); // Botón para español
const btnIngles = document.getElementById('btnIngles'); // Botón para inglés
const txtTitulo = document.getElementById('txtTitulo');

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
    txtTitulo.textContent = "Peliculas Populares"
    btnAnterior.textContent = "Anterior"
    btnSiguiente.textContent = "Siguiente"
});

btnIngles.addEventListener('click', () => {
    idiomaSeleccionado = 'en-US'; // Cambiar a 'en-US' para inglés
    cargarPeliculas();
    txtTitulo.textContent = "Most Popular Movies"
    btnAnterior.textContent = "Previous"
    btnSiguiente.textContent = "Next"
});

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=${idiomaSeleccionado}&page=${pagina}`);

        console.log(respuesta);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                            <div class="pelicula">
                                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                                <h3 class="titulo">${pelicula.title}</h3>
                                <div class = "descripcion">${pelicula.overview}</div>
                            </div>
                        `;
            });

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

contenedorGeneros = document.getElementById("generos");

async function mostrarGeneros() {
    generos = await obtenerGeneros();
    console.log(generos);
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero.id;
        option.textContent = genero.name || "Error";
        contenedorGeneros.appendChild(option);
    })
}

mostrarGeneros();



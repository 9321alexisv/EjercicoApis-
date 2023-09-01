function idioma()
{
    alert("Seleccione el idioma");

}

function test()
{
    const language = 'es';
    const options = 
{
    method: 'GET',
    headers: 
    {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjAxMTM4YTdiN2FkNzIxODFjNGUzYmU1ZjBkZTgxMyIsInN1YiI6IjY0ZWE4YThjYzVjMWVmMDEwMjg2NTdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KXmA5AijIGvq3HXllzl-rq94hMfs_m7NHLHwZAiabqc'
    }

};

fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${language}`, options )
.then(response => response.json())
.then(responseJson => console.log(responseJson))
.catch(err => console.error(err));



    
}

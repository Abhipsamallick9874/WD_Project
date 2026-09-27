// ==========================================
// STUDIO GHIBLI MOVIE API
// No API key required
// ==========================================

const API_URL = "https://ghibliapi.vercel.app/films";


export const searchMovie = async (movieName) => {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Movie API Error: ${response.status}`
        );
    }

    const movies = await response.json();

    const search = movieName.toLowerCase().trim();

    return movies.filter(movie =>
        movie.title.toLowerCase().includes(search)
    );
};
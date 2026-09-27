// ==========================================
// IMPORTS
// ==========================================

import {
    getLocation,
    getWeather
} from "./weather.js";


import {
    searchMovie
} from "./movie.js";



// ==========================================
// WEATHER ELEMENTS
// ==========================================

const weatherButton =
    document.getElementById("weatherBtn");


const cityInput =
    document.getElementById("cityInput");


const weatherResult =
    document.getElementById("weatherResult");


const weatherMessage =
    document.getElementById("weatherMessage");



// ==========================================
// WEATHER BUTTON
// ==========================================

weatherButton.addEventListener(
    "click",
    async () => {


        const city =
            cityInput.value.trim();


        if (city === "") {

            weatherMessage.textContent =
                "Please enter a city name.";

            weatherResult.innerHTML = "";

            return;

        }


        weatherMessage.textContent =
            "Loading weather...";


        weatherResult.innerHTML = "";


        try {


            // Get city coordinates

            const location =
                await getLocation(city);


            // Get weather

            const data =
                await getWeather(
                    location.latitude,
                    location.longitude
                );


            // Display weather

            displayWeather(
                location,
                data
            );


            weatherMessage.textContent =
                "";


        }


        catch (error) {


            console.error(error);


            weatherMessage.textContent =
                error.message;


        }

    }
);



// ==========================================
// DISPLAY WEATHER
// ==========================================

function displayWeather(
    location,
    data
) {


    const current =
        data.current;


    const daily =
        data.daily;


    const description =
        getWeatherDescription(
            current.weather_code
        );


    let html = `

        <div class="location-card">

            <h2>
                ${location.name},
                ${location.country}
            </h2>

            <p>
                Timezone:
                ${location.timezone}
            </p>

        </div>


        <div class="current-weather">

            <h2>
                Current Weather
            </h2>


            <div class="weather-grid">


                <div class="weather-item">

                    <span>🌡️</span>

                    <strong>
                        ${current.temperature_2m}°C
                    </strong>

                    <small>
                        Temperature
                    </small>

                </div>



                <div class="weather-item">

                    <span>🌡️</span>

                    <strong>
                        ${current.apparent_temperature}°C
                    </strong>

                    <small>
                        Feels Like
                    </small>

                </div>



                <div class="weather-item">

                    <span>💧</span>

                    <strong>
                        ${current.relative_humidity_2m}%
                    </strong>

                    <small>
                        Humidity
                    </small>

                </div>



                <div class="weather-item">

                    <span>☁️</span>

                    <strong>
                        ${current.cloud_cover}%
                    </strong>

                    <small>
                        Cloud Cover
                    </small>

                </div>



                <div class="weather-item">

                    <span>🌧️</span>

                    <strong>
                        ${current.precipitation} mm
                    </strong>

                    <small>
                        Precipitation
                    </small>

                </div>



                <div class="weather-item">

                    <span>💨</span>

                    <strong>
                        ${current.wind_speed_10m}
                        km/h
                    </strong>

                    <small>
                        Wind Speed
                    </small>

                </div>



                <div class="weather-item">

                    <span>🧭</span>

                    <strong>
                        ${current.wind_direction_10m}°
                    </strong>

                    <small>
                        Wind Direction
                    </small>

                </div>



                <div class="weather-item">

                    <span>🔽</span>

                    <strong>
                        ${current.pressure_msl}
                        hPa
                    </strong>

                    <small>
                        Pressure
                    </small>

                </div>


            </div>



            <div class="weather-condition">

                <h3>
                    ${description}
                </h3>

            </div>


        </div>



        <div class="forecast-section">

            <h2>
                7-Day Forecast
            </h2>


            <div class="forecast-grid">

    `;


    // ==========================================
    // 7 DAY FORECAST
    // ==========================================

    for (
        let i = 0;
        i < daily.time.length;
        i++
    ) {


        const date =
            new Date(
                daily.time[i]
            );


        const day =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const description =
            getWeatherDescription(
                daily.weather_code[i]
            );


        html += `

            <div class="forecast-card">

                <h3>
                    ${day}
                </h3>


                <p>
                    ${daily.time[i]}
                </p>


                <div class="forecast-icon">

                    ${getWeatherIcon(
                        daily.weather_code[i]
                    )}

                </div>


                <p>
                    ${description}
                </p>


                <p>

                    <strong>
                        ${daily.temperature_2m_max[i]}°C
                    </strong>

                    /

                    ${daily.temperature_2m_min[i]}°C

                </p>


                <p>
                    🌧️
                    ${daily.precipitation_probability_max[i] ?? 0}%
                </p>


                <p>
                    💨
                    ${daily.wind_speed_10m_max[i]}
                    km/h
                </p>


                <p>
                    🌅
                    ${formatTime(
                        daily.sunrise[i]
                    )}
                </p>


                <p>
                    🌇
                    ${formatTime(
                        daily.sunset[i]
                    )}
                </p>

            </div>

        `;

    }


    html += `

            </div>

        </div>

    `;


    weatherResult.innerHTML =
        html;

}



// ==========================================
// WEATHER DESCRIPTION
// ==========================================

function getWeatherDescription(
    code
) {


    const weatherCodes = {

        0:
            "Clear Sky",

        1:
            "Mainly Clear",

        2:
            "Partly Cloudy",

        3:
            "Overcast",

        45:
            "Fog",

        48:
            "Rime Fog",

        51:
            "Light Drizzle",

        53:
            "Moderate Drizzle",

        55:
            "Dense Drizzle",

        56:
            "Light Freezing Drizzle",

        57:
            "Dense Freezing Drizzle",

        61:
            "Slight Rain",

        63:
            "Moderate Rain",

        65:
            "Heavy Rain",

        66:
            "Light Freezing Rain",

        67:
            "Heavy Freezing Rain",

        71:
            "Slight Snow",

        73:
            "Moderate Snow",

        75:
            "Heavy Snow",

        77:
            "Snow Grains",

        80:
            "Slight Rain Showers",

        81:
            "Moderate Rain Showers",

        82:
            "Heavy Rain Showers",

        85:
            "Slight Snow Showers",

        86:
            "Heavy Snow Showers",

        95:
            "Thunderstorm",

        96:
            "Thunderstorm With Hail",

        99:
            "Thunderstorm With Heavy Hail"

    };


    return (
        weatherCodes[code] ||
        "Unknown Weather"
    );

}



// ==========================================
// WEATHER ICON
// ==========================================

function getWeatherIcon(
    code
) {


    if (code === 0)
        return "☀️";


    if (
        code === 1 ||
        code === 2
    )
        return "🌤️";


    if (code === 3)
        return "☁️";


    if (
        code === 45 ||
        code === 48
    )
        return "🌫️";


    if (
        code >= 51 &&
        code <= 67
    )
        return "🌧️";


    if (
        code >= 71 &&
        code <= 77
    )
        return "❄️";


    if (
        code >= 80 &&
        code <= 82
    )
        return "🌦️";


    if (
        code >= 85 &&
        code <= 86
    )
        return "🌨️";


    if (code >= 95)
        return "⛈️";


    return "🌤️";

}



// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(
    value
) {


    if (!value)
        return "--";


    return value.split("T")[1];

}



// ==========================================
// MOVIE ELEMENTS
// ==========================================

const movieButton =
    document.getElementById("movieBtn");


const movieInput =
    document.getElementById("movieInput");


const movieResult =
    document.getElementById("movieResult");


const movieMessage =
    document.getElementById("movieMessage");



// ==========================================
// MOVIE BUTTON
// ==========================================

movieButton.addEventListener(
    "click",
    async () => {


        const movieName =
            movieInput.value.trim();


        if (movieName === "") {

            movieMessage.textContent =
                "Please enter a movie name.";

            movieResult.innerHTML = "";

            return;

        }


        movieMessage.textContent =
            "Searching movies...";


        movieResult.innerHTML = "";


        try {


            const data =
                await searchMovie(
                    movieName
                );


            console.log(
                "Movie API Response:",
                data
            );


            const movies =
                extractMovies(data);


            if (
                movies.length === 0
            ) {

                throw new Error(
                    "No movies found."
                );

            }


            displayMovies(
                movies
            );


            movieMessage.textContent =
                "";


        }


        catch (error) {


            console.error(error);


            movieMessage.textContent =
                error.message;


        }

    }
);



// ==========================================
// EXTRACT MOVIES
// ==========================================

function extractMovies(
    data
) {


    // If API directly returns an array

    if (
        Array.isArray(data)
    ) {

        return data;

    }


    // Check common result names

    if (
        Array.isArray(
            data.results
        )
    ) {

        return data.results;

    }


    if (
        Array.isArray(
            data.search
        )
    ) {

        return data.search;

    }


    if (
        Array.isArray(
            data.data
        )
    ) {

        return data.data;

    }


    // Search all object properties

    for (
        const key in data
    ) {


        if (
            Array.isArray(
                data[key]
            )
        ) {

            return data[key];

        }

    }


    return [];

}



// ==========================================
// DISPLAY MOVIES
// ==========================================

function displayMovies(
    movies
) {


    movieResult.innerHTML =
        "";


    movies
        .slice(0, 12)
        .forEach(
            movie => {


        const title =
            movie.title ||
            movie.Title ||
            movie.name ||
            movie.l ||
            "Unknown Movie";


        const year =
            movie.year ||
            movie.Year ||
            movie.releaseYear ||
            movie.y ||
            movie.release_date ||
            "N/A";


        const rating =
            movie.rating ||
            movie.Rating ||
            movie.imdbRating ||
            movie.r ||
            movie.vote_average ||
            "N/A";


        let poster =
            movie.poster ||
            movie.Poster ||
            movie.image ||
            movie.thumbnail ||
            movie.i ||
            "";


        // IMDbOT can provide image data
        // in different structures

        if (
            typeof poster === "object" &&
            poster !== null
        ) {

            poster =
                poster.imageUrl ||
                poster.url ||
                "";

        }


        // Some APIs return a poster
        // path instead of a full URL

        if (
            poster &&
            poster.startsWith("/")
        ) {

            poster =
                `https://image.tmdb.org/t/p/w500${poster}`;

        }


        const description =
            movie.overview ||
            movie.description ||
            movie.plot ||
            movie.Plot ||
            "No description available.";


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "movie-card";


        card.innerHTML = `

            ${
                poster

                ?

                `
                <img
                    src="${poster}"
                    alt="${escapeHTML(title)}"
                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='flex';
                    "
                >

                <div
                    class="no-poster"
                    style="display:none"
                >
                    🎬
                </div>
                `

                :

                `
                <div class="no-poster">
                    🎬
                </div>
                `

            }


            <div class="movie-info">

                <h2>
                    ${escapeHTML(title)}
                </h2>


                <p>
                    📅 Year:
                    ${escapeHTML(
                        String(year)
                    )}
                </p>


                <p>
                    ⭐ Rating:
                    ${escapeHTML(
                        String(rating)
                    )}
                </p>


                <p>
                    ${escapeHTML(
                        String(description)
                    )}
                </p>

            </div>

        `;


        movieResult.appendChild(
            card
        );


    });

}



// ==========================================
// HTML ESCAPE
// ==========================================

function escapeHTML(
    text
) {


    return text
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
// ==========================================
// WEATHER API
// Open-Meteo
// No API Key Required
// ==========================================


// ==========================================
// GET CITY LOCATION
// ==========================================

export const getLocation = async (city) => {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(city)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Unable to find city."
        );

    }


    const data =
        await response.json();


    if (
        !data.results ||
        data.results.length === 0
    ) {

        throw new Error(
            "City not found."
        );

    }


    return data.results[0];

};



// ==========================================
// GET WEATHER
// ==========================================

export const getWeather =
    async (latitude, longitude) => {


    const url =
        `https://api.open-meteo.com/v1/forecast` +

        `?latitude=${latitude}` +

        `&longitude=${longitude}` +

        `&current=` +
        `temperature_2m,` +
        `relative_humidity_2m,` +
        `apparent_temperature,` +
        `precipitation,` +
        `rain,` +
        `weather_code,` +
        `cloud_cover,` +
        `pressure_msl,` +
        `wind_speed_10m,` +
        `wind_direction_10m` +

        `&daily=` +
        `weather_code,` +
        `temperature_2m_max,` +
        `temperature_2m_min,` +
        `precipitation_sum,` +
        `precipitation_probability_max,` +
        `wind_speed_10m_max,` +
        `sunrise,` +
        `sunset` +

        `&forecast_days=7` +

        `&timezone=auto`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Unable to fetch weather."
        );

    }


    return await response.json();

};
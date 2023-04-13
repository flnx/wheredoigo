require('dotenv').config();

async function fetchCity(city) {
    const result = await fetch(process.env.CITY_URL + city, options());
    const data = await result.json();

    return data;
}

async function fetchCountry(country) {
    const result = await fetch(process.env.COUNTRY_URL + country, options());
    const data = await result.json();

    return data;
}

function options() {
    return {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.X_API_KEY,
        },
    };
}

module.exports = {
    fetchCity,
    fetchCountry,
};

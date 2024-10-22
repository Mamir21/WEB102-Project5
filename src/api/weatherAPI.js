const BASE_URL = 'https://api.weatherbit.io/v2.0/current';

export const fetchWeatherData = async (city, country = '') => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `${BASE_URL}?city=${city}${country ? `&country=${country}` : ''}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data[0];
}
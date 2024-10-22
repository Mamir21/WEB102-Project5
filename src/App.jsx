import { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import SearchFilter from './components/SearchFilter';
import List from './components/List';
import { fetchWeatherData } from './api/weatherAPI';

const randomCities = [
    'New York',
    'Tokyo',
    'Paris',
    'Sydney',
    'Cape Town',
    'Buenos Aires'
]

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [tempRange, setTempRange] = useState('all');

    useEffect(() => {
        // Fetch weather data for random cities on initial load
        const fetchRandomData = async () => {
            try {
                const dataPromises = randomCities.map((city) => fetchWeatherData(city));
                const dataResults = await Promise.all(dataPromises);
                setWeatherData(dataResults);
                setFilteredData(dataResults);
            } catch (error) {
                console.error('Error fetching random weather data:', error);
            }
        }

        fetchRandomData();
    }, [])

    const handleSearch = async (term) => {
        if (!term) {
            // If search term is empty, revert to random weather data
            setFilteredData(weatherData);
            return;
        }

        try {
            const data = await fetchWeatherData(term, country);
            setFilteredData([data]);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const handleCountryChange = (countryCode) => {
        setCountry(countryCode);
    }

    const handleTempRangeChange = (range) => {
        setTempRange(range);
        const filtered = weatherData.filter((item) => {
            switch (range) {
                case 'below0':
                    return item.temp < 0;
                case '0to15':
                    return item.temp >= 0 && item.temp <= 15;
                case '16to30':
                    return item.temp > 15 && item.temp <= 30;
                case 'above30':
                    return item.temp > 30;
                default:
                    return true;
            }
        })
        setFilteredData(filtered);
    }

    return (
        <div className="app">
            <Header />
            <SearchFilter 
                onSearch={handleSearch} 
                onCountryChange={handleCountryChange}
                onTempRangeChange={handleTempRangeChange}
            />
            <div className="summary">
                {filteredData.length > 0 && (
                    <>
                        <Card title="Temperature" value={`${filteredData[0].temp}°C`} />
                        <Card title="Humidity" value={`${filteredData[0].rh}%`} />
                        <Card title="Wind Speed" value={`${filteredData[0].wind_spd} m/s`} />
                    </>
                )}
            </div>
            <h3>Already Given Locations / Search</h3>
            <List items={filteredData} />
        </div>
    )
}

export default App;
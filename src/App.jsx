import { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import SearchFilter from './components/SearchFilter';
import List from './components/List';
import { fetchWeatherData } from './api/weatherAPI';

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [city, setCity] = useState('New York');
    const [country, setCountry] = useState('');
    const [tempRange, setTempRange] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(city, country);
                setWeatherData([data]); 
                setFilteredData([data]);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchData();
    }, [city, country]);

    const handleSearch = (term) => {
        setCity(term);
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
            <List items={filteredData} />
        </div>
    )
}

export default App;
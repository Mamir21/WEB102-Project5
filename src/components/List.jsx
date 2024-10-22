const List = ({ items }) => (
    <ul className="list">
        {items.map((item) => (
            <li key={item.city_name} className="list-item">
                <h3>{item.city_name}, {item.country_code}</h3>
                <p>Temperature: {item.temp}°C</p>
                <p>Weather: {item.weather.description}</p>
            </li>
        ))}
    </ul>
)

export default List;
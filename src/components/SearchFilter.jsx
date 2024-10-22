const SearchFilter = ({ onSearch, onCountryChange, onTempRangeChange }) => (
    <div className="search-filter">
        <input 
            type="text" 
            placeholder="Search city..." 
            onChange={(e) => onSearch(e.target.value)} 
            className="search-input"
        />
        <input 
            type="text" 
            placeholder="Country code (e.g., US)" 
            onChange={(e) => onCountryChange(e.target.value)} 
            className="search-input"
        />
        <select onChange={(e) => onTempRangeChange(e.target.value)} className="filter-select">
            <option value="all">All Temperatures</option>
            <option value="below0">Below 0°C</option>
            <option value="0to15">0-15°C</option>
            <option value="16to30">16-30°C</option>
            <option value="above30">Above 30°C</option>
        </select>
    </div>
)

export default SearchFilter;
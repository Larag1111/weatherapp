import './Favorites.css';


const Favorites = ({ favorites, setCity }) => {


    return (
        <div>
            <h2>Dina favoritplatser</h2>
            <ul>
                {favorites.map((fav, index) => (
                    <li key={index}>
                        <button onClick={() => setCity(fav)}>{fav}

                        </button>
                    </li>
                ))}
            </ul>
        {/* Här kommer vi visa sparade städer */}
        </div>
    );



};

export default Favorites;
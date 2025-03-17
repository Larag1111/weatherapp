
import { useState } from 'react';

const Search = () => {

    const [city, setCity] = useState ('');

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div>
            <h2>Sök efter en stad</h2>
 {/* Här kommer vi senare lägga input-fält och knapp */}
 <input
 type="text"
 value={city} //Binder input-fältet till vårt state
 onChange={handleInputChange} // När användaren skriver uppdateras state placeholder
     placeholder="Skriv in stadens namn"
     />
           {/* Här kan vi senare lägga till en knapp för att trigga sökningen */}
  
 </div>
    );



};


export default Search;
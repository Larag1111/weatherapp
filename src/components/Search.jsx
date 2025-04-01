
import { useState } from 'react';
import './Search.css';

const Search = ({setCity}) => {
    const [inputValue, setInputValue] = useState ('');




    const handleInputChange = (event) => {
       setInputValue(event.target.value);
        
    };

    const handleSearch = () => {
        setCity(inputValue);
        alert(`Du sökte efter: ${inputValue}`); 
        //Visar en alert med den stad som användaren skrivit in.
    };



    return (

        <div className="search-wrapper">
            <h2>Sök efter en stad</h2>
 {/* Här kommer vi senare lägga input-fält och knapp */}
 <input
 className='search-input'
 type="text"
 value={inputValue} //Binder input-fältet till vårt state
 onChange={handleInputChange}// onchangeevent är varje gång nån skriver i rutan
 // så gångar event.target.value det användaren skriver tex paris.
 //setCity sparar det om en ny stad i app komponenten
     placeholder="Skriv in stadens namn"
     />
    
  <button className='search bottom' onClick={handleSearch}>
    Sök</button>
 </div>
    );
};


export default Search;
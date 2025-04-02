
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
    };

    return (

        <div className="search-wrapper">
            <h2>Sök efter en stad</h2>

 <input
 className='search-input'
 type="text"
 value={inputValue} 
 onChange={handleInputChange}
     placeholder="Skriv in stadens namn"
     />
    
  <button className='search bottom' onClick={handleSearch}>
    Sök</button>
 </div>
    );
};


export default Search;
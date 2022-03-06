import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function Header({ setSearchWord, mainPage }) {

    const handleChange = (e) => {
        setSearchWord(e.target.value);
    }

  return (
    <div className='cryptoHeader'>
        <h1>CRYPTO TRACKER</h1>
        <h2>Cryptocurrency Prices and Charts!</h2>
        {mainPage ? (<input type="text" placeholder='Search a coin' 
          onChange={handleChange} />) : (
            <Link to={`/`} className='link'>
              <div className='back-to-main'>
                <FontAwesomeIcon icon={faHouse} className="fa-solid fa-house" 
                   />
                <p>Back to main page</p>
              </div>
            </Link>
          )}
      </div>
  )
}

export default Header
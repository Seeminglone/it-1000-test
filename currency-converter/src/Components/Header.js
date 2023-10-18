import '../Styles/Header.css';
import React, { useState, useEffect } from 'react';

function Header() {
const [usdToUah, setUahToUsd] = useState(0);
const [eurToUah, setUahToEur] = useState(0);

useEffect(() => {
    const apiUrl = 'http://data.fixer.io/api/latest?access_key=582e99e46e8fc828313c59c570f5b993';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const uahToUsd = (data.rates.USD/ data.rates.UAH).toFixed(3);
        const uahToEur = (data.rates.EUR/ data.rates.UAH).toFixed(3);
        setUahToUsd(uahToUsd);
        setUahToEur(uahToEur);
      })
  }, []);

  return (
    <div className="currency-header">
        <div className='currency-header-container'>
            <div className='uah-usd'>
                <p className='top-title'>1 Гривня дорівнює</p>
                <p className='bottom-title'>{usdToUah} Долари</p>
            </div>
            <div className='uah-eur'>
                <p className='top-title'>1 Гривня дорівнює</p>
                <p className='bottom-title'>{eurToUah} Євро</p>
            </div>
        </div>
    </div>
  );
}

export default Header;

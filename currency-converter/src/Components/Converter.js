import '../Styles/Converter.css';
import React, { useState, useEffect } from 'react';

function Converter() {
    const [amount1, setAmount1] = useState(1);
    const [currency1, setCurrency1] = useState('UAH');
    const [amount2, setAmount2] = useState(0.03);
    const [currency2, setCurrency2] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState(null);
    const [inputBeingEdited, setInputBeingEdited] = useState(null);

    const handleCurrencyChange1 = (e) => {
        setCurrency1(e.target.value);
        setInputBeingEdited('input1');
    };

    const handleAmountChange1 = (e) => {
        setInputBeingEdited('input1');
        setAmount1(e.target.value);
    };

    const handleCurrencyChange2 = (e) => {
        setCurrency2(e.target.value);
        setInputBeingEdited('input2');
    };

    const handleAmountChange2 = (e) => {
        setInputBeingEdited('input2');
        setAmount2(e.target.value);
    };

    useEffect(() => {
        if (exchangeRates) {
        const rate1 = 1 / exchangeRates[currency1];
        const rate2 = 1 / exchangeRates[currency2];
            if (inputBeingEdited === 'input1') {
                setAmount2((amount1 * rate1 / rate2).toFixed(2));
            } else if (inputBeingEdited === 'input2') {
                setAmount1((amount2 * rate2 / rate1).toFixed(2));
            }
        }
    }, [amount1, amount2, currency1, currency2, exchangeRates, inputBeingEdited]);

    useEffect(() => {
        const apiUrl = 'http://data.fixer.io/api/latest?access_key=582e99e46e8fc828313c59c570f5b993';
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            setExchangeRates(data.rates);
        })
    }, []);

    return (
        <div className="currency-converter">
            <div className='firts-amount-change'>
                <input type="text" value={amount1} onChange={handleAmountChange1} />
                <select value={currency1} onChange={handleCurrencyChange1}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <div className='second-amount-change'>
                <input type="text" value={amount2} onChange={handleAmountChange2} />
                <select value={currency2} onChange={handleCurrencyChange2}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    );
};

export default Converter;

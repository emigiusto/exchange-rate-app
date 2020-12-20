import React from 'react';

function CurrencyRow(
    {currencyOptions,selectedCurrency, onChangeCurrency,
    amount,onChangeAmount}) {

    return (
        <div>
            <input  type="number" 
                    className="input" 
                    value={isNaN(amount) ? 0 : amount}
                    onChange={onChangeAmount}>
            </input>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option 
                        value={option.name} 
                        key={option.name + option.crypto.toString()}>
                    {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default CurrencyRow;
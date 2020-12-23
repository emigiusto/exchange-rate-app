import React from 'react';
import SelectBox from './SelectBox'

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
            <SelectBox currencyOptions={currencyOptions} selectedCurrency={selectedCurrency} onChangeCurrency={onChangeCurrency}/>

            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option 
                        value={option.name} 
                        key={option.name + option.market.toString()}>
                    {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default CurrencyRow;
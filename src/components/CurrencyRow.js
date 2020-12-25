import React from 'react';
//import SelectBox from './SelectBox'
// <SelectBox currencyOptions={currencyOptions} selectedCurrency={selectedCurrency} onChangeCurrency={onChangeCurrency}/>
function CurrencyRow(
    {   currencyOptions,
        selectedCurrency, 
        onChangeCurrency,
        amount,
        onChangeAmount
    }) {
    return (
        <div>
            <input  type="number" 
                    className="input" 
                    value={isNaN(amount) ? 0 : amount}
                    onChange={onChangeAmount}>
            </input>
            <select value={JSON.stringify(selectedCurrency)} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option 
                        value={JSON.stringify(option)}
                        key={option.name + option.market.toString()}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default CurrencyRow;
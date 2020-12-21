import React, {useEffect, useState} from 'react';
import './App.css'
import CurrencyRow from './components/CurrencyRow'
//import {anyCointoCrypto,cryptoToCrypto,getCryptoInfo} from './converters/CurrencyConverter'
//import {getNormalCurrencies,getNormalExchangeRate} from './converters/worldCurrencyConverter'

import CurrencyService from './service/currencyService'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountiInFromCurrency, setAmountiInFromCurrency] = useState(true)
  const [currencyService, setCurrencyService] = useState(new CurrencyService())
  
  let toAmount, fromAmount;
  //Decides which input we should update (the opposite from the user' changes)
  if (amountiInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  //Runs when mounting the App getting loading available currency and first exchange rate
  useEffect(()=>{
    /* Returns an object with the rate from the first coin and the array of all normal Currencies
      { 
        firstRate: 1.45, (Rate from the first coin in the array below)
        currenciesArray: [{name: "CAD", crypto: false}, {name: "GBP", crypto: false}...]
      }
    *//*
    getNormalCurrencies().then((normalCurrenciesArray) => {
      //Gets an array including all crypto currencys with USDT pair in the market
      getCryptoInfo().then(allUSDcryptos => {
        var allCurrencies = [...normalCurrenciesArray.currenciesArray,...allUSDcryptos]

        // Stores all currencies on state to load them on CurrencyRow component
          setCurrencyOptions(allCurrencies)
        // Defines the default currency shown on both ends (From and To)
          setFromCurrency(allCurrencies[0].name)
          setToCurrency(allCurrencies[1].name)
        //Sets the exchange rate to the firstCurrencyReturned Rate
          setExchangeRate(normalCurrenciesArray.firstRate)
      })
    })
  }, [])

  //Runs everytime the user changes the currency selection
  useEffect(()=>{

    currencyService(fromCurrency,toCurrency)
    /*if (fromCurrency!=null && toCurrency!=null && fromCurrency!== toCurrency) {
      //Checks if from and to are CryptoCurrency
      const isFromCrypto = currencyOptions.find(currency => currency.name === fromCurrency).crypto;
      const isToCrypto = currencyOptions.find(currency => currency.name === toCurrency).crypto;

      //Based on the inputs being crypto or normal currency, sets the new ExchangeRate
      if (isFromCrypto && isToCrypto) {
        cryptoToCrypto(fromCurrency,toCurrency)
          .then(res => setExchangeRate(res))
      } else if (isFromCrypto && !isToCrypto) {
        anyCointoCrypto(toCurrency,fromCurrency)
          .then(res => setExchangeRate(1/res))
      } else if (!isFromCrypto && isToCrypto) {
        anyCointoCrypto(fromCurrency,toCurrency)
          .then(res => setExchangeRate(res))
      } else {
        getNormalExchangeRate(fromCurrency,toCurrency).then(exchangeRate => setExchangeRate(exchangeRate)) 
      } 
    } else if (fromCurrency === toCurrency){
      setExchangeRate(1)
    }*/
  }, [fromCurrency,toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountiInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountiInFromCurrency(false)
  }

  return (
    <div>
      <h1 className="convert-title">Convert</h1>
      <CurrencyRow className="currency-row"
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount= {handleFromAmountChange}>
      </CurrencyRow>
      <h2 className="equals">=</h2>
      <CurrencyRow className="currency-row"
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            amount={toAmount}
            onChangeAmount= {handleToAmountChange}>
      </CurrencyRow>
    </div>
    
  );
}

export default App;

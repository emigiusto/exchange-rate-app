import React, {useEffect, useState} from 'react';
import './App.css'
import CurrencyRow from './components/CurrencyRow'

import {getPairExchangeRate, getMarketInfo} from './service/exchangeService'
import {allAvailableCurrencies} from './service/availableSymbolsService'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountiInFromCurrency, setAmountiInFromCurrency] = useState(true)
  const [pairRates, setPairRates] = useState([])

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
    //Loads all available Currencies
    allAvailableCurrencies().then(allCurrencies => {
      setCurrencyOptions(allCurrencies)

      //Sets default FromCurrency, ToCurrency
      setFromCurrency(allCurrencies[0].name)
      setToCurrency(allCurrencies[1].name)

      getMarketInfo(allCurrencies[0],allCurrencies[1]).then(result => {

        setPairRates(result)
      })

      getPairExchangeRate(allCurrencies[0].name,allCurrencies[1].name, pairRates)
          .then((response) => {
            console.log(response)
          })
      //Loads the default market on "pairRates" and sets the exchangeRate between default FromCurrency and ToCurrency
    })
      
  }, [])
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
  */

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

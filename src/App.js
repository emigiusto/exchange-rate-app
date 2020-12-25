import React, {useEffect, useState} from 'react';
import './App.css'
import CurrencyRow from './components/CurrencyRow'

import {updateMarketInfo,exchangeRateFromArray} from './service/exchangeService'
import {allAvailableCurrencies} from './service/availableSymbolsService'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState({name: 'EUR', market: 'world'})
  const [toCurrency, setToCurrency] = useState({name: 'DKK', market: 'world'})
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
      //setFromCurrency(allCurrencies[0])
      //setToCurrency(allCurrencies[1])

      //
        updateMarketInfo(fromCurrency,toCurrency, allCurrencies).then((response) => {
          setExchangeRate(response.exchangeRate)
          setPairRates(response.pairs)
        })

    })
  },[])

  //Runs everytime the user changes the currency selection
  useEffect(()=>{
    var exchangeRateCached = exchangeRateFromArray(fromCurrency,toCurrency, pairRates)
      if (!exchangeRateCached) {
        updateMarketInfo(fromCurrency,toCurrency).then((response) => {
          setExchangeRate(response.exchangeRate)
          setPairRates(response.pairs)
        })
      } else {
        setExchangeRate(exchangeRateCached)
      }
  },[fromCurrency,toCurrency])
      

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
          onChangeCurrency={e => {
              setFromCurrency(JSON.parse(e.target.value))
            }
          }
          amount={fromAmount}
          onChangeAmount= {handleFromAmountChange}>
      </CurrencyRow>
      <h2 className="equals">=</h2>
      <CurrencyRow className="currency-row"
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(JSON.parse(e.target.value))}
            amount={toAmount}
            onChangeAmount= {handleToAmountChange}>
      </CurrencyRow>
    </div>
  );
}

export default App;

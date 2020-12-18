import React, {useEffect, useState} from 'react';
import './App.css'
import CurrencyRow from './components/CurrencyRow'
import {convertToUSD} from './helpers/cryptoCurrency'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'


function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountiInFromCurrency, setAmountiInFromCurrency] = useState(true)
  const [cryptoCurrencyUSDT, setCryptoCurrencyUSDT] = useState([])

  let toAmount, fromAmount;
  //Decides which input we should update (the opposite from the user' changes)
  if (amountiInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  //Runs getting loading available currency and exchange rates
  useEffect(()=>{
    fetch(BASE_URL)
          .then(res => res.json())
          .then(data => {
            const firstCurrencyReturned = Object.keys(data.rates)[0]
            // Stores all currencies on state to load them on select
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            // Defines the default currency shown on both ends
            setFromCurrency(data.base)
            setToCurrency(firstCurrencyReturned)
            //Sets the exchange rate to the firstCurrencyReturned Rate
            setExchangeRate(data.rates[firstCurrencyReturned])
          })
  }, [])

  //Runs getting available CRYPTO currency and exchange rates
  useEffect(()=>{
    var allCryptos = convertToUSD("BTC",2000,1.5)

    //var CryptoInfo = Promise.all(allCryptos)
    //setCryptoCurrencyUSDT(CryptoInfo)
  }, [])

  //Runs everytime the user changes the currency selection
  useEffect(()=>{
    if (fromCurrency!=null && toCurrency!=null) {
      //Fetch new exchangeRate specifying from and to Currency
      fetch(BASE_URL + '?base='+ fromCurrency + '&symbols=' + toCurrency)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
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

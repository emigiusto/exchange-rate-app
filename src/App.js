import React, {useEffect, useState} from 'react';
import './App.css'
import CurrencyRow from './components/CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountiInFromCurrency, setAmountiInFromCurrency] = useState(true)


  let toAmount, fromAmount;
  //Decides which input we should update (the opposite from the user' changes)
  if (amountiInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  //Runs first loading available currency and exchange rates
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

            setExchangeRate(data.rates[firstCurrencyReturned])
          })
  }, [])

  //Runs everytime the user changes the currency selection
  useEffect(()=>{
    if (fromCurrency!=null && toCurrency!=null) {
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

      <h1>Convert</h1>
      <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount= {handleFromAmountChange}>
      </CurrencyRow>
      <h2 className="equals">=</h2>
      <CurrencyRow 
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

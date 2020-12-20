import React, {useEffect, useState} from 'react';
import './App.css'
import CurrencyRow from './components/CurrencyRow'
import {anyCointoCrypto,cryptoToCrypto,getCryptoInfo} from './helpers/cryptoCurrency'

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

  //Runs getting loading available currency and first exchange rate
  useEffect(()=>{
    fetch(BASE_URL)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            var currenciesArray = Object.keys(data.rates)
            var otherCurrencies =  currenciesArray.map(currency => {
                                        return  {name: currency, crypto:false}})
            getCryptoInfo().then(allUSDcryptos => {
              var USDcryptosArray = allUSDcryptos.map(crypto => {
                return {name: crypto.symbol, crypto: true}
              })
            
              var allCurrencies = [{name: data.base, crypto: false}, ...otherCurrencies,...USDcryptosArray]
              
              // Stores all currencies on state to load them on select
              setCurrencyOptions(allCurrencies)
              // Defines the default currency shown on both ends
              setFromCurrency(allCurrencies[0].name)
              setToCurrency(allCurrencies[1].name)
              //Sets the exchange rate to the firstCurrencyReturned Rate
              setExchangeRate(data.rates[allCurrencies[1].name])
            })

            
          })
  }, [])

  //Runs everytime the user changes the currency selection
  useEffect(()=>{
    if (fromCurrency!=null && toCurrency!=null && fromCurrency!== toCurrency) {
      //Checks if from and to are CryptoCurrency
      const isFromCrypto = currencyOptions.find(currency => currency.name === fromCurrency).crypto;
      const isToCrypto = currencyOptions.find(currency => currency.name === toCurrency).crypto;
        console.log(isFromCrypto,isToCrypto)
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
        fetch(BASE_URL + '?base='+ fromCurrency + '&symbols=' + toCurrency)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
      } 
    } else if (fromCurrency === toCurrency){
      setExchangeRate(1)
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
            onChangeCurrency={e => {setToCurrency(e.target.value)}}
            amount={toAmount}
            onChangeAmount= {handleToAmountChange}>
      </CurrencyRow>
    </div>
    
  );
}

export default App;

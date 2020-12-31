import React, {useEffect, useState} from 'react';
//Styles
import './App.css'

//Components
import CurrencyRow from './components/CurrencyRow'
import Footer from "./components/Footer";

import {updateMarketInfo} from './service/exchangeService'
import {allAvailableCurrencies} from './service/availableSymbolsService'
import mergePairArray from './helpers/mergePairArray'
import {exchangeRateFromArray} from "./helpers/exchangeRateFromArray";

import {defaultFromCurrency, defaultToCurrency} from "./config";

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency)
  const [toCurrency, setToCurrency] = useState(defaultToCurrency)
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountiInFromCurrency, setAmountiInFromCurrency] = useState(true)
  const [pairRates, setPairRates] = useState([])

  let toAmount, fromAmount;
  //Decides which input we should update (the opposite from the user's changes)
  if (amountiInFromCurrency) {
    fromAmount = amount
    toAmount = parseFloat((amount * exchangeRate).toFixed(5))
  } else {
    toAmount = amount
    fromAmount = parseFloat((amount / exchangeRate).toFixed(5))
  }

  //Runs when mounting the App getting loading available currency and first exchange rate
  useEffect(()=>{
    //Loads all available Currencies
    allAvailableCurrencies().then(allCurrencies => {
      setCurrencyOptions(allCurrencies)
      //Sets default FromCurrency, ToCurrency and the initial pairsRate
        updateMarketInfo(defaultFromCurrency,defaultToCurrency, allCurrencies).then((response) => {
          setExchangeRate(response.exchangeRate)
          setPairRates(response.pairs)
        })

    })
  },[])

  //Runs everytime the user changes the currency selection
  useEffect(()=>{
    if (fromCurrency.name !== toCurrency.name) {
      //Checks if the pair fromCurrency-toCurrency already exists on State, if not, the exchangeService gets called
      var exchangeRateCached = exchangeRateFromArray(fromCurrency,toCurrency, pairRates)
      if (!exchangeRateCached) {
        updateMarketInfo(fromCurrency,toCurrency).then((response) => {
          setExchangeRate(response.exchangeRate)
          setPairRates(currentPairs => mergePairArray(currentPairs,response.pairs))
        })
      } else {
        setExchangeRate(exchangeRateCached)
      }
    } else { //If the currency selected in both select element is the same, the exchangeRate is 1
      setExchangeRate(1)
    }
    
  },[fromCurrency,toCurrency,pairRates])
      

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
          onChangeCurrency={e => setFromCurrency(JSON.parse(e.target.value))}
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
      <p className="sources">Data provided by Binance Exchange and ExchangeRateAPI.io</p>
      <Footer></Footer>
    </div>
  );
}

export default App;

import {CRYPTO_URL, WORLD_URL} from "../config";

const Axios = require('axios').default;

//Returns an array with all available currencies from World Market in api.exchangeratesapi.io
async function getWorldCurrencies(){
    var currenciesInfo = fetch(WORLD_URL)
        .then(res => res.json())
        .then(data => {
            var currenciesArray = Object.keys(data.rates)
            var normalCurrencies =  currenciesArray.map(currency => {
                                        return  {name: currency, market: 'world'}
                                    })
            return [{name: data.base, market: 'world'}, ...normalCurrencies]
        })
    return currenciesInfo
}

//Returns an array with all available currencies from Crypto Market in Binance Exchange
async function getUSDCryptoCurrencies() {
    const cryptoData = await Axios.get(CRYPTO_URL);
        var onlyUSDT = cryptoData.data.filter(symbolInfo => symbolInfo.symbol.slice(-4) === "USDT" &&  !(symbolInfo.symbol.slice(0,3) === "EUR"))
        var allUSDcryptos = onlyUSDT.map(usdtSymbolInfo => {
          var lenghtSymbol = usdtSymbolInfo.symbol.length
          return {
                  name: usdtSymbolInfo.symbol.slice(0, lenghtSymbol-4),
                  market: 'crypto'
                }
          })
        return allUSDcryptos
  };

//Returns an array with all available currencies from Crypto and World Market
async function allAvailableCurrencies() {
  //Request info from each market
  let worldCurrenciesPromise = getWorldCurrencies().then((worldCurrencies) => worldCurrencies)
  let cryptoCurrenciesPromise = getUSDCryptoCurrencies().then((cryptoCurrencies) => cryptoCurrencies)

  //Awaits to resolve all promises
  let promiseResult = await Promise.all([worldCurrenciesPromise,cryptoCurrenciesPromise]);

  return [...promiseResult[0],...promiseResult[1]]
}
export {allAvailableCurrencies}
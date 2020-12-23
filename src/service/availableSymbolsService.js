const BASE_URL = 'https://api.exchangeratesapi.io/latest'
const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'

const Axios = require('axios').default;

async function getWorldCurrencies(){
    var currenciesInfo = fetch(BASE_URL)
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

async function getUSDCryptoCurrencies() {
    const cryptoData = await Axios.get(CRYPTO_URL);
        var onlyUSDT = cryptoData.data.filter(symbolInfo => symbolInfo.symbol.slice(-4) === "USDT")
        var allUSDcryptos = onlyUSDT.map(usdtSymbolInfo => {
          var lenghtSymbol = usdtSymbolInfo.symbol.length
          return {
                  name: usdtSymbolInfo.symbol.slice(0, lenghtSymbol-4),
                  market: 'crypto'
                }
          })
        return allUSDcryptos
  };


async function allAvailableCurrencies() {
  //Request info from each market
  let worldCurrenciesPromise = getWorldCurrencies().then((worldCurrencies) => worldCurrencies)
  let cryptoCurrenciesPromise = getUSDCryptoCurrencies().then((cryptoCurrencies) => cryptoCurrencies)

  //Awaits to resolve all promises
  let promiseResult = await Promise.all([worldCurrenciesPromise,cryptoCurrenciesPromise]);

  return [...promiseResult[0],...promiseResult[1]]
}
export {allAvailableCurrencies}
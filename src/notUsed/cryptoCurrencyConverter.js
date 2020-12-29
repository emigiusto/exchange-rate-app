const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'
const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest'

import {getPairFromArray} from "../converters/helpers/getPairFromArray";
import {cryptoDataReformat} from "../converters/helpers/cryptoDataReformat";
const Axios = require('axios').default;

//Gets all crypto pairs information with USDT as the basecoin and aditionally the pair between the two currencies selected
async function cryptoCryptoExchangeRates(currency1,currency2) {
  var cryptoData = await Axios.get(CRYPTO_URL);
  var reformatedUSDTpairs = cryptoDataReformat(cryptoData.data)
    //gets the specific pair information of currency1 and currency2
    var curr1Curr2Pair = getPairFromArray(currency1,currency2,allUSDcryptosArray)
  return [...reformatedUSDTpairs,curr1Curr2Pair]
};

//In case the the pair is crypto-world markets, the app performs two API calls and stores aditional results
async function cryptoWorldExchangeRates (normalCoin,cryptoCoin) {
  //Gets crypto data
  var cryptoData = await Axios.get(CRYPTO_URL);
  var onlyUSDT = arrayUsdtFilter(cryptoData.data)
  var allUSDcryptosArray = onlyUSDT.map(usdtSymbolInfo => {
    var lenghtSymbol = usdtSymbolInfo.symbol.length
    return {
            pair: [usdtSymbolInfo.symbol.slice(0, lenghtSymbol-4),'USD'],
            rate: parseFloat(usdtSymbolInfo.price),
            timestamp: new Date()
          }
    }
  )
  var filteredCryptoArray = allUSDcryptosArray.filter((pairInfo => pairInfo.pair[0] === cryptoCoin.name))
  var cryptoExchangeRate = filteredCryptoArray[0].rate
  //Gets world Market data for only 1 coin
  var singleWorldSymbolData = await Axios.get(EXCHANGE_URL + '?base=USD&symbols=' + normalCoin.name)
      var worldSymbolRateUSD = singleWorldSymbolData.data.rates[normalCoin.name]
      var worldPairObject = {
          pair: [normalCoin.name, "USD"],
          rate: parseFloat(worldSymbolRateUSD.toFixed(5)),
          timestamp: new Date()
        }
      var cryptoWorldPairObject = {
        pair: [normalCoin.name, cryptoCoin.name],
        rate: parseFloat((worldSymbolRateUSD/cryptoExchangeRate).toFixed(5)),
        timestamp: new Date()
      }

  return [cryptoWorldPairObject,worldPairObject,...allUSDcryptosArray]
}

module.exports = {cryptoCryptoExchangeRates,cryptoWorldExchangeRates}


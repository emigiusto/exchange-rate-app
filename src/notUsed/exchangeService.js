import {cryptoCryptoExchangeRates,cryptoWorldExchangeRates} from '../converters/cryptoCurrencyConverter';
import {getWorldExchangeRates} from '../converters/worldCurrencyConverter';
import {exchangeRateFromArray} from "../helpers/exchangeRateFromArray";

// Updates the Currency Pairs array by performing the corresponding API calls and returns 
// the updated array and the exchange rate between currencies from parameters.
async function updateMarketInfo(currency1,currency2){
    var pairsArray;
        //Defines which converter is needed depending on currencies markets
        if (currency1.market === "crypto" && currency2.market === "world") {
            pairsArray = cryptoWorldExchangeRates(currency2,currency1).then(response => response)
        } else if (currency1.market === "world" && currency2.market === "crypto") {
            pairsArray = cryptoWorldExchangeRates(currency1,currency2).then(response => response)
        } else if (currency1.market === "crypto" && currency2.market === "crypto"){
            pairsArray = cryptoCryptoExchangeRates(currency1,currency2).then(response => response)
        } else if (currency1.market === "world" && currency2.market === "world"){
            pairsArray = getWorldExchangeRates(currency1).then(response => response)
        } else {
            return null
        }
    var exchangePairsArray = await pairsArray
    //Gets the exchange rate corresponding to the pair selected by user
    var exchangeRate = exchangeRateFromArray(currency1,currency2,exchangePairsArray)
    
    return {
            pairs: exchangePairsArray, 
            exchangeRate: exchangeRate
            }
}

export {updateMarketInfo,exchangeRateFromArray}
//Converters
import cryptoExchangeRates from '../converters/cryptoCurrencyConverter';
import {worldExchangeRates} from '../converters/worldCurrencyConverter';

//Helpers
import {createPairFromMarkets} from "../converters/helpers/createPairFromMarkets";
import {exchangeRateFromArray} from "../helpers/exchangeRateFromArray";

// Updates the Currency Pairs array by performing the corresponding API calls and returns 
// the updated array and the exchange rate between currencies from parameters.
async function updateMarketInfo(currency1,currency2){
    var currencyArray = currency1.market !== currency2.market ? [currency1,currency2] : [currency1];
    var promiseArray = []
    currencyArray.forEach(currency => {
        var currencyMarketInfoPromise;
        switch (currency.market) {
            case "crypto":
                currencyMarketInfoPromise = cryptoExchangeRates()
                
                break;
            case "world":
                currencyMarketInfoPromise = worldExchangeRates(currency1)
                break;
            default:
                break;
        }
        promiseArray.push(currencyMarketInfoPromise)
    });

    var currencyMarketInfoResolved = Promise.all(promiseArray).then(resolvedPromisesArray => {
        var allPairInfo = []
        resolvedPromisesArray.forEach(marketArray => {
            allPairInfo.push(...marketArray)
        });

        var exchangeRate = exchangeRateFromArray(currency1,currency2,allPairInfo)
        if (!exchangeRate) {
            var newPair = createPairFromMarkets(currency1,currency2,allPairInfo)
            allPairInfo = [...allPairInfo, newPair]
            exchangeRate = exchangeRateFromArray(currency1,currency2,allPairInfo)
        }

        return {
            pairs: allPairInfo, 
            exchangeRate: exchangeRate
            }
    })
    return currencyMarketInfoResolved
}

export {updateMarketInfo}
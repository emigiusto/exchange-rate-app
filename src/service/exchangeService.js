//Converters -> In case of including aditional markets/APIs please add more converters and import them below
import cryptoExchangeRates from '../converters/cryptoCurrencyConverter';
import worldExchangeRates from '../converters/worldCurrencyConverter';

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
        //In case of including aditional markets/APIs please add more cases in the switch statement
        switch (currency.market) {
            case "crypto":
                currencyMarketInfoPromise = cryptoExchangeRates()
                break;
            case "world":
                currencyMarketInfoPromise = worldExchangeRates(currency)
                break;
            default:
                break;
        }
        promiseArray.push(currencyMarketInfoPromise)
    });
    //Resolves problem and stores the information on "allPairInfo"
    var currencyMarketInfoResolved = Promise.all(promiseArray).then(resolvedPromisesArray => {
        var allPairInfo = []
        resolvedPromisesArray.forEach(marketArray => {
            allPairInfo.push(...marketArray)
        });

        //Gets the exchange rate from currency1-currency2. In case the pair doesn't exist, it gets created 
        // from the currency1/USD and currency2/USD pair
        var exchangeRate = exchangeRateFromArray(currency1,currency2,allPairInfo)
        if (!exchangeRate) {
            var newPair = createPairFromMarkets(currency1,currency2,allPairInfo)
            allPairInfo = [...allPairInfo, newPair]
            exchangeRate = exchangeRateFromArray(currency1,currency2,allPairInfo)
        }
        //Returns an object with all pairs and the exchange rate only from currency1-currency2 parameters
        return {
            pairs: allPairInfo, 
            exchangeRate: exchangeRate
            }
    })
    return currencyMarketInfoResolved
}

export {updateMarketInfo}
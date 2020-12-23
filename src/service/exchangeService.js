import {anyCointoCrypto,cryptoToCrypto} from '../converters/helpers/cryptoCurrencyConverter';
import {getWorldExchangeRate} from '../converters/helpers/worldCurrencyConverter';


async function getPairExchangeRate(currency1,currency2,pairsRates){
    console.log(currency1,currency2,pairsRates)
    if (exchangeRateFromArray(currency1,currency2,pairsRates)){
        return exchangeRateFromArray(currency1,currency2,pairsRates)
    } else {
        var pairsArray = getMarketInfo(currency1,currency2).then(response => response)
        return pairsArray
    }
}

async function getMarketInfo(currency1,currency2){
    var pairsArray;
    console.log(currency1,currency2)
    if ((currency1.market === "crypto" && currency2.market === "world")  || (currency1.market === "world" && currency2.market === "crypto")) {
        pairsArray = anyCointoCrypto(currency1)
    } else if (currency1.market === "crypto" && currency2.market === "crypto"){
        pairsArray = cryptoToCrypto(currency1)
    } else if (currency1.market === "world" && currency2.market === "world"){
        pairsArray = getWorldExchangeRate(currency1)
    } else {
        return null
    }
    return pairsArray
}

function exchangeRateFromArray(currency1,currency2,pairsRates){
    if (pairsRates.lenght === 0) {
        return false
    } else {
        var found = pairsRates.find(pairSymbol => ((pairSymbol.pair[0] === currency1 && pairSymbol.pair[1] === currency2) || (pairSymbol.pair[0] === currency2 && pairSymbol.pair[1] === currency1)))
        if (found) {
            return (found.pair[0] === currency1) ? found.rate : 1/found.rate
        } else {
            return false
        }
    }
}

export {getMarketInfo,getPairExchangeRate}
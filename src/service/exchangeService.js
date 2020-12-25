import {getCryptoInfo,anyCointoCrypto} from '../converters/helpers/cryptoCurrencyConverter';
import {getWorldExchangeRate} from '../converters/helpers/worldCurrencyConverter';

async function getPairExchangeRate(currency1,currency2,pairsRates){
    if (exchangeRateFromArray(currency1,currency2,pairsRates)){
        return exchangeRateFromArray(currency1,currency2,pairsRates)
    } else {
        var pairsArray = updateMarketInfo(currency1,currency2).then(response => response)
        return pairsArray
    }
}

async function updateMarketInfo(currency1,currency2){
    var pairsArray;
    if ((currency1.market === "crypto" && currency2.market === "world")  || (currency1.market === "world" && currency2.market === "crypto")) {
        pairsArray = anyCointoCrypto(currency1).then(response => response)
    } else if (currency1.market === "crypto" && currency2.market === "crypto"){
        pairsArray = getCryptoInfo(currency1,currency2).then(response => response)
    } else if (currency1.market === "world" && currency2.market === "world"){
        pairsArray = getWorldExchangeRate(currency1).then(response => response)
    } else {
        return null
    }
    var exchangePairsArray = await Promise.all([pairsArray])
    var exchangeRate = exchangeRateFromArray(currency1,currency2,exchangePairsArray[0])
    return {pairs: exchangePairsArray[0], exchangeRate: exchangeRate}
}


function exchangeRateFromArray(currency1,currency2,pairsRates){
    if (pairsRates.length === 0) {
        return false
    } else {
        var found = pairsRates.find(pairSymbol => ((pairSymbol.pair[0] === currency1.name && pairSymbol.pair[1] === currency2.name) || (pairSymbol.pair[0] === currency2.name && pairSymbol.pair[1] === currency1.name)))
        if (found) {
            return (found.pair[0] === currency1) ? 1/found.rate : found.rate
        } else {
            return false
        }
    }
}

function getCoinMarket(currency,currencyOptions) {
    var coin = currencyOptions.find(option => option.name === currency.name)

    if (coin) {
        return coin.market
    }
        return false
}

export {updateMarketInfo,getPairExchangeRate,exchangeRateFromArray,getCoinMarket}
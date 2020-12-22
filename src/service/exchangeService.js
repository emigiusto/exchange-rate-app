import {anyCointoCrypto,cryptoToCrypto} from '../converters/helpers/cryptoCurrencyConverter';
import {getWorldExchangeRate} from '../converters/helpers/worldCurrencyConverter';

const getPairsRates = async (currency1,currency2) => {
    var pairsArray;
    if ((currency1.market === "crypto" && currency2.market === "world")  || (currency1.market === "world" && currency2.market === "crypto")) {
        pairsArray = anyCointoCrypto(currency1)
    } else if (currency1.market === "crypto" && currency2.market === "crypto"){
        pairsArray = cryptoToCrypto(currency1)
    } else if (currency1.market === "world" && currency2.market === "world"){
        pairsArray = getWorldExchangeRate(currency1)
    } else {
        return null
    }
    console.log(pairsArray)
    return pairsArray
}

const getPairExchangeRate = async (currency1,currency2) => {
    if (isPairAvailable(currency1,currency2)){
        return 1.5
    } else {
        var rates = this.getExchangeRates(currency1,currency2)
        return rates
    }
}

const isPairAvailable = async (currency1,currency2) => {

    return true
}

module.exports = {getPairsRates, getPairExchangeRate}
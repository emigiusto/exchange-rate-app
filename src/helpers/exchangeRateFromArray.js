function exchangeRateFromArray(currency1,currency2,pairsRates){
    if (pairsRates.length === 0) {
        return false
    } else {
        var found = pairsRates.find(pairSymbol => ((pairSymbol.pair[0] === currency1.name && pairSymbol.pair[1] === currency2.name) || (pairSymbol.pair[0] === currency2.name && pairSymbol.pair[1] === currency1.name)))
        if (found) {
            return (found.pair[0] === currency1.name) ? found.rate : 1/found.rate
        } else {
            return false
        }
    }
}

module.exports = {exchangeRateFromArray}
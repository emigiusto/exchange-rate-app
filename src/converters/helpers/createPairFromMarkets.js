function createPairFromMarkets(currency1,currency2,marketsInfo) {
    //Given two currencies and the full array of markets info, creates the pair currency-currency2 calculating their Exchange Rate

    var currency1USD = marketsInfo.filter(pairInfo => (pairInfo.pair[0] === currency1.name && pairInfo.pair[1] === "USD") || (pairInfo.pair[1] === currency1.name && pairInfo.pair[0] === "USD"))
    var currency2USD = marketsInfo.filter(pairInfo => (pairInfo.pair[0] === currency2.name && pairInfo.pair[1] === "USD") || (pairInfo.pair[1] === currency2.name && pairInfo.pair[0] === "USD"))
    //Calculates each exchange Rates against USD
    var currency1usdRate = currency1USD[0].pair[0]===currency1.name ? currency1USD[0].rate : 1/currency1USD[0].rate
    var currency2usdRate = currency2USD[0].pair[0]===currency2.name ? currency2USD[0].rate : 1/currency2USD[0].rate
    
    //Returns the currency1-currency2 pair
    return {
        pair: [currency1.name,currency2.name],
        rate: parseFloat((currency1usdRate/currency2usdRate).toFixed(5)),
        timestamp: new Date()
    }
}
module.exports = {createPairFromMarkets}
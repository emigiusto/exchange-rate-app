const getPairsFromArray = (currency1,currency2,allCurrencies) => {
    //Receives the array with all currencies and exchangeRate info and returns the pair currency1-currency2
    var filteredArray = allCurrencies.filter(pairInfo => pairInfo.pair[0] === currency1.name || pairInfo.pair[0] === currency2.name)
    var exchangeRate = filteredArray[0].pair[0]===currency1.name ? filteredArray[0].rate/filteredArray[1].rate : exchangeRate = filteredArray[1].rate/filteredArray[0].rate;
    return {
      pair: [currency1.name, currency2.name],
      rate: parseFloat((exchangeRate).toFixed(5)),
      timestamp: filteredArray[0].timestamp
    }
  }

  module.exports = {getPairsFromArray}
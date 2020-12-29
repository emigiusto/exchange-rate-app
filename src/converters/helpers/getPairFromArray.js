const getPairsFromArray = (coin1,coin2,allCurrencies) => {
    var filteredArray = allCurrencies.filter(pairInfo => pairInfo.pair[0] === coin1.name || pairInfo.pair[0] === coin2.name)
    var exchangeRate = filteredArray[0].pair[0]===coin1.name ? filteredArray[0].rate/filteredArray[1].rate : exchangeRate = filteredArray[1].rate/filteredArray[0].rate;
    return {
      pair: [coin1.name, coin2.name],
      rate: parseFloat((exchangeRate).toFixed(5)),
      timestamp: filteredArray[0].timestamp
    }
  }

  module.exports = {getPairsFromArray}
const Axios = require('axios').default;

const BASE_URL = 'https://api.exchangeratesapi.io/latest'
//Returns an array with all pairs from world market with the specified base currency, corresponding rates and timestamp.
const worldExchangeRates = async (currency1) => {
    var worldData = await Axios.get(BASE_URL + '?base='+ currency1.name);
    var ratePairs = [];
        for (const symbol in worldData.data.rates) {
            ratePairs.push({
                pair: [currency1.name,symbol],
                rate: worldData.data.rates[symbol],
                timestamp: new Date()
            })
        }
    return ratePairs
}

module.exports = {worldExchangeRates}




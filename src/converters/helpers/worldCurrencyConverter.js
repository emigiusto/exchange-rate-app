const BASE_URL = 'https://api.exchangeratesapi.io/latest'

const getWorldExchangeRate = async (currency1) => {
    var exchangeRate = fetch(BASE_URL + '?base='+ currency1.name)
        .then(res => res.json())
        .then(data => {
            var ratePairs = [];
                for (const symbol in data.rates) {
                    ratePairs.push({
                        pair: [currency1.name,symbol],
                        rate: data.rates[symbol],
                        timestamp: new Date()
                    })
                }
                    
            return ratePairs
            
        })
    return exchangeRate
}


module.exports = {getWorldExchangeRate}




const BASE_URL = 'https://api.exchangeratesapi.io/latest'

const getWorldExchangeRate = async (currency1) => {
    var exchangeRate = fetch(BASE_URL + '?base='+ currency1)
        .then(res => res.json())
        .then(data => {
            var ratePairs = [];
                for (const symbol in data.rates) {
                    ratePairs.push({
                        pair: [currency1,symbol],
                        rate: data.rates[symbol]
                    })
                }
                    
            return {
                pairs: ratePairs,
                timestamp: new Date()
            }
            
        })
    return exchangeRate
}

//Ir guardando en cache todas las ya usadas con un timestamp de 5 min?
const getNormalCurrencies = async () => {
    var currenciesInfo = fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            var currenciesArray = Object.keys(data.rates)
            var normalCurrencies =  currenciesArray.map(currency => {
                                        return  {name: currency, crypto:false}
                                    })
            return {
                    firstRate: data.rates[currenciesArray[0]],
                    currenciesArray: [{name: data.base, crypto: false}, ...normalCurrencies]
                    }
        })
    return currenciesInfo
}

module.exports = {getNormalCurrencies, getWorldExchangeRate}




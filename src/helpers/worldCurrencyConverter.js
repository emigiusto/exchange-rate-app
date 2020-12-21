const BASE_URL = 'https://api.exchangeratesapi.io/latest'

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

const getNormalExchangeRate = async (currency1, currency2) => {
    var exchangeRate = fetch(BASE_URL + '?base='+ currency1 + '&symbols=' + currency2)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return data.rates[currency2]
            
        })
    return exchangeRate
}

module.exports = {getNormalCurrencies, getNormalExchangeRate}


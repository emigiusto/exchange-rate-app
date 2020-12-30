var defaultFromCurrency = {name: 'EUR', market: 'world'};
var defaultToCurrency = {name: 'DKK', market: 'world'};

//External APIs
const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'
const WORLD_URL = 'https://api.exchangeratesapi.io/latest'

module.exports = {defaultFromCurrency,defaultToCurrency, CRYPTO_URL,WORLD_URL}
const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'
const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest'

const Axios = require('axios').default;

const getCryptoInfo = async () => {
  const cryptoData = await Axios.get(CRYPTO_URL);
      var onlyUSDT = cryptoData.data.filter(symbolInfo => symbolInfo.symbol.slice(-4) === "USDT")
      var cryptoUSDT = onlyUSDT.map(usdtSymbolInfo => {
        var lenghtSymbol = usdtSymbolInfo.symbol.length
        return {
                symbol: usdtSymbolInfo.symbol.slice(0, lenghtSymbol-4), 
                price: parseFloat(usdtSymbolInfo.price)}
        })
      return cryptoUSDT
};

const anyCointoCrypto = async (normalCoin,cryptoCoin) => {
    //Assuming USDT = USD
    var currencyToCrypto = getCryptoInfo().then(allUSDCryptos => {
      var cryptoSymbol = allUSDCryptos.filter(crypto => crypto.symbol === cryptoCoin)
      // Rate between CryptoCoin selected and USDT
      var cryptoExchangeRate = cryptoSymbol[0].price

      //Gets exchange rate between USD and the coin
      var cryptoChange = Axios.get(EXCHANGE_URL + '?base=USD&symbols=' + normalCoin)
        .then(response => {
            // Rate between normal Currency selected and USDT
            var exchangeRatetoUSD = 1/(response.data.rates[normalCoin])
            //Exchange rate cryptocurrency/USD vs other currency/USD
            return (exchangeRatetoUSD/cryptoExchangeRate)
        })
      return cryptoChange
    });
  return currencyToCrypto
}

const cryptoToCrypto = async (cryptoCoin1,cryptoCoin2) => {
  var finalExchangeRate = getCryptoInfo().then(allUSDCryptos => {
    var cryptoSymbol = allUSDCryptos.filter(crypto => crypto.symbol === cryptoCoin1 || crypto.symbol === cryptoCoin2)
    var cryptoExchangeRate = cryptoSymbol[0].price / cryptoSymbol[1].price 
    return cryptoExchangeRate
  });
  return finalExchangeRate
}

module.exports = {getCryptoInfo,anyCointoCrypto,cryptoToCrypto}

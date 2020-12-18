const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'

async function getCryptoInfo() {
    fetch(CRYPTO_URL)
      .then(res => res.json())
      .then(data => {
        // Stores all currencies on state to load them on select
        var onlyUSDT = data.filter(symbolInfo => symbolInfo.symbol.slice(-4) === "USDT")
        var cryptoUSDT = onlyUSDT.map(usdtSymbolInfo => {
          var lenghtSymbol = usdtSymbolInfo.symbol.length
          return {
                  symbol: usdtSymbolInfo.symbol.slice(0,lenghtSymbol-4), 
                  price: parseFloat(usdtSymbolInfo.price)}
          })
          console.log(cryptoUSDT)
        return cryptoUSDT
    })
}

function convertToUSD(symbol,amount,exchangeRateUSD) {
    //I'm assuming USDT = USD
    var allCryptoInfo = getCryptoInfo()
    console.log(allCryptoInfo)
}


module.exports = {getCryptoInfo,convertToUSD}

function cryptoDataReformat(pairArray) {
    //Filter the array including only cryptocurrency with USDT market (and removes also the USDT/EUR pair)
    var onlyUSDT = pairArray.filter(symbolInfo => symbolInfo.symbol.slice(-4) === "USDT" && !(symbolInfo.symbol.slice(0,2) === "EUR"))
    var allUSDcryptosArray = onlyUSDT.map(usdtSymbolInfo => {
        var lenghtSymbol = usdtSymbolInfo.symbol.length
        return {
                pair: [usdtSymbolInfo.symbol.slice(0, lenghtSymbol-4),'USD'],
                rate: parseFloat(usdtSymbolInfo.price),
                timestamp: new Date()
            }
    })
    return allUSDcryptosArray
}

module.exports = {cryptoDataReformat}
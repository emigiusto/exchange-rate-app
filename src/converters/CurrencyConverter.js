class CurrencyConverter {
    constructor(converterCallback, baseCurrency) {
        this.converterCallback = converterCallback;
        this.currency = baseCurrency;
    }

    async getRates() {
        var exchangeRate = this.converterCallback(this.baseCurrency.name);

        return ({
                    pairs: exchangeRate.pairs, 
                    time: exchangeRate.timestamp
                })
    }
}
module.exports = CurrencyConverter
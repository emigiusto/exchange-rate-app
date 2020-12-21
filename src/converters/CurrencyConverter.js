class CurrencyConverter {
    constructor(type,converterCallback, currency1, currency2) {
        this.type = type;
        this.converterCallback = converterCallback
        this.currency1 = currency1
        this.currency2 = currency2
    }

    get exchangeRates() {
        var ExchangeRate = this.converterCallback(this.currency1,this.currency2)
        return {
                    base: this.currency1, 
                    rates: ExchangeRate.rates, 
                    time: ExchangeRate.timestamp
                };
    }

    
}

module.exports = CurrencyConverter
//  Devolver siempre un mismo tipo de objeto
//  Importa los helpers
//  Es una clase que crea objetos que resuelven exchange rates
import {getNormalExchangeRate} from '../helpers/worldCurrencyConverter';
import {anyCointoCrypto} from '../helpers/cryptoCurrencyConverter';
import {cryptoToCrypto} from '../helpers/cryptoCurrencyConverter';

import CurrencyConverter from '../converters/CurrencyConverter'

class CurrencyConverterFactory {
    constructor(currency1,currency2) {
        this.currency1 = currency1
        this.currency2 = currency2
    }

    get exchangeRates() {
        
        if (this.currency1.type === "crypto" && this.currency2.type === "world"  || this.currency1.type === "world" && this.currency2.type === "crypto") {
            var converter = new CurrencyConverter("cryptoWorld",anyCointoCrypto)
        } else if (this.currency1.type === "crypto" && this.currency2.type === "crypto"){
            var converter = new CurrencyConverter("cryptoCrypto",cryptoToCrypto)
        } else if (this.currency1.type === "world" && this.currency2.type === "world"){
            var converter = new CurrencyConverter("worldToWorld",getNormalExchangeRate)
        }
        return converter.exchangeRates(this.currency1,this.currency2)
    }

    
}

export default CurrencyConverterFactory
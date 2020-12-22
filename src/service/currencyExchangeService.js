import {anyCointoCrypto,cryptoToCrypto} from '../converters/helpers/cryptoCurrencyConverter';
import {getWorldExchangeRate} from "../converters/helpers/worldCurrencyConverter";

import {CurrencyConverter} from "../converters/CurrencyConverter";

//import {} from './helpers'

class CurrencyService {
    constructor() {
        this.exchangeInfo = {}
    }

    getExchangeRates(currency1,currency2) {
        var converter;
        if ((currency1.market === "crypto" && currency2.market === "world")  || (currency1.market === "world" && currency2.market === "crypto")) {
            converter = new CurrencyConverter(anyCointoCrypto,currency1)
        } else if (currency1.market === "crypto" && currency2.market === "crypto"){
            converter = new CurrencyConverter(cryptoToCrypto,currency1)
        } else if (currency1.market === "world" && currency2.market === "world"){
            converter = new CurrencyConverter(getWorldExchangeRate,currency1)
        } else {
            return null
        }
        this.exchangeInfo = converter.getRates(currency1,currency2)
        console.log(this.exchangeInfo)

        return this.exchangeInfo
    }

    getPairExchangeRate(currency1,currency2){
        if (this.isPairAvailable(currency1,currency2)){
            return 1.5
        } else {
            var rates = this.getExchangeRates(currency1,currency2)
            return rates
        }
    }

    isPairAvailable(currency1,currency2){

        return false
    }

}

export default CurrencyService

//Recibe 2 monedas, 
//Devuelve el objeto que currencyRow necesita

//Import factory y creo instancia
//Le pide a factory el converter correcto

//Unico metodo recibe 2 monedas, devuelve objeto para renderice el componente Currency Row


//
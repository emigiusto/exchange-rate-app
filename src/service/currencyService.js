import CurrencyConverterFactory from '../factory/CurrencyConverterFactory'

class CurrencyService {
    constructor(currency1,currency2) {
        this.currency1 = currency1
        this.currency2 = currency2
    }

    get exchangeRate(){
        var converterFactory = new CurrencyConverterFactory()
        console.log(converterFactory)
        return true
    }
}

export default CurrencyService

//Recibe 2 monedas, 
//Devuelve el objeto que currencyRow necesita

//Import factory y creo instancia
//Le pide a factory el converter correcto

//Unico metodo recibe 2 monedas, devuelve objeto para renderice el componente Currency Row


//
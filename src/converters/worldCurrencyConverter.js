import Axios from 'axios';

import {WORLD_URL} from "../config";

//Returns an array with all pairs from world market with the specified base currency, corresponding rates and timestamp.
const worldExchangeRates = async (currency) => {
    var worldData = await Axios.get(WORLD_URL + '?base='+ currency.name);
    var ratePairs = [];
        for (const symbol in worldData.data.rates) {
            ratePairs.push({
                pair: [currency.name,symbol],
                rate: worldData.data.rates[symbol],
                timestamp: new Date()
            })
        }
    return ratePairs
}

export default worldExchangeRates




import Axios from 'axios';

import {WORLD_URL} from "../config";

//Returns an array with all pairs from world market with the specified base currency, corresponding rates and timestamp.
const worldExchangeRates = async (currency1) => {
    var worldData = await Axios.get(WORLD_URL + '?base='+ currency1.name);
    var ratePairs = [];
        for (const symbol in worldData.data.rates) {
            ratePairs.push({
                pair: [currency1.name,symbol],
                rate: worldData.data.rates[symbol],
                timestamp: new Date()
            })
        }
    return ratePairs
}

export default worldExchangeRates




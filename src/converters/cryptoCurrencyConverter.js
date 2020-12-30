import Axios from 'axios';
//Helpers
import {cryptoDataReformat} from "./helpers/cryptoDataReformat";

const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'

//Gets all crypto pairs information with USDT as the basecoin
const cryptoExchangeRates = async () => {
  var cryptoData = await Axios.get(CRYPTO_URL);
  //Filters only USD markets and returns the array with the filtered pairs
  return cryptoDataReformat(cryptoData.data)
};

export default cryptoExchangeRates
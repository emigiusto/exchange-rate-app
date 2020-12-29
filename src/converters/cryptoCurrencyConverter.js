import Axios from 'axios';
//Helpers
import {cryptoDataReformat} from "./helpers/cryptoDataReformat";

const CRYPTO_URL = 'https://api.binance.com/api/v3/ticker/price'

//Gets all crypto pairs information with USDT as the basecoin
const cryptoExchangeRates = async () => {
  
  var cryptoData = await Axios.get(CRYPTO_URL);
  var reformatedUSDTpairs = cryptoDataReformat(cryptoData.data)
  return reformatedUSDTpairs
};

export default cryptoExchangeRates
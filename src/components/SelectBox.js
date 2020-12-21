import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectBox({currencyOptions,selectedCurrency,onChangeCurrency}) {
  return (
    <Autocomplete
      options={currencyOptions}
      getOptionLabel={(option) => option.name}
      style={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Select Coin" variant="outlined" />}
      //value={selectedCurrency}
    onChange={onChangeCurrency}
    />
  );
}
const select = {
  "Hshrcountry": {keys: {"name": 'label',"iso3": 'value'}, query: {fields: {"name": true,"iso3": true}, "where": {"numcode": {"neq": null}}}},
  "Hshrcurrencytype": {keys: {"currencyname": 'label',"currencyid": 'value'}, query: {fields: {"currencyname": true,"currencyid": true}}},
  "Hshrpayperiodcode": {keys: {"payperiodname": 'label',"payperiodcode": 'value'}, query: {fields: {"payperiodname": true,"payperiodcode": true}}},
  "Ohrmnationality": {keys: {"name": 'label',"id": 'value'}, query: {fields: {"name": true,"id": true}}},
  "Hshrprovince":  {keys: {"provincename": 'label',"id": 'value'}, query: {fields: {"provincename": true,"id": true}}}
}

module.exports = select;

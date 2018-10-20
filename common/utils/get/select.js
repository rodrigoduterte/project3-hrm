///////// get the values of static select boxes
var select = {};
var loopback = require('loopback');
var app = loopback();

console.log(app.models());

// var Hshrcountry = loopback.getModel('Hshrcountries');
// var Hshrcurrencytype = loopback.getModel('Hshrcurrencytypes');
// var Hshrpayperiodcode = loopback.getModel('Hshrpayperiodcodes');
// var Ohrmnationality = loopback.getModel('Ohrmnationalities');


// Hshrcountry.find({"where": {"numcode": {"neq": null}}, "fields": {"iso3": true, "name": true}}, (err,data) => {
//   if(err) select['Hshrcountry'] = [];
//   select['Hshrcountry'] = data;
// });

// Hshrcurrencytype.find({"fields": {"currencyid": true, "currencyname": true}}, (err,data) => {
//   if(err) select['Hshrcurrencytype'] = [];
//   select['Hshrcurrencytype'] = data;
// });

// Hshrpayperiodcode.find({"fields": {"payperiodcode": true, "payperiodname": true}}, (err,data) => {
//   if(err) select['Hshrpayperiodcode'] = [];
//   select['Hshrpayperiodcode'] = data;
// });

// Ohrmnationality.find({"fields": {"id": true, "name": true}}, (err,data) => {
//   if(err) select['Ohrmnationality'] = [];
//   select['Ohrmnationality'] = data;
// });

module.exports = select;

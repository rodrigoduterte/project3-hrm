"use strict";

module.exports = function(Hshrcurrencytype) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = {fields: {"currencyname": true,"currencyid": true}};
  let keys = {"currencyname": 'label',"currencyid": 'id'};

  Hshrcurrencytype.select = function(cb) {
    let membersCopy;
    Hshrcurrencytype.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Hshrcurrencytype.remoteMethod("select", {
    http: {
      path: "/select",
      verb: "get"
    },
    returns: {
      arg: "options",
      type: "object"
    }
  });
}

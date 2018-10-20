"use strict";

module.exports = function(Hshrpayperiodcode) {

  let renamekeys = require('../utils/ops/object/renamekeys');

  let query = {fields: {"payperiodname": true,"payperiodcode": true}};
  let keys = {"payperiodname": 'label',"payperiodcode": 'id'};

  Hshrpayperiodcode.select = function(cb) {
    let membersCopy;
    Hshrpayperiodcode.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      cb(null, membersCopy);
    })
  }

  Hshrpayperiodcode.remoteMethod("select", {
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

"use strict";

module.exports = function(Hshrcountry) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = { fields: {name: true, coucode: true}, where: {numcode: {neq: null}} };
  let keys = {'name': 'label', 'coucode': 'id'};

  Hshrcountry.select = function(cb) {
    let membersCopy;
    Hshrcountry.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(country =>
        {return renamekeys(keys,country)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Hshrcountry.remoteMethod("select", {
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

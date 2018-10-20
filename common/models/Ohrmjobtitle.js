"use strict";

module.exports = function(Ohrmjobtitle) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = { fields: {jobtitle: true, id: true}};
  let keys = {'jobtitle': 'label', 'id': 'id'};

  Ohrmjobtitle.select = function(cb) {
    let membersCopy;
    Ohrmjobtitle.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(country =>
        {return renamekeys(keys,country)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Ohrmjobtitle.remoteMethod("select", {
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

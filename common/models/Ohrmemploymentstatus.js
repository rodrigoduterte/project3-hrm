"use strict";

module.exports = function(Ohrmemploymentstatus) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = {fields: {"name": true,"id": true}};
  let keys = {"name": 'label',"id": 'id'};

  Ohrmemploymentstatus.select = function(cb) {
    let membersCopy;
    Ohrmemploymentstatus.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Ohrmemploymentstatus.remoteMethod("select", {
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

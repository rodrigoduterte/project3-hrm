"use strict";

module.exports = function(Ohrmempterminationreason) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = {fields: {"name": true,"id": true}};
  let keys = {"name": 'label',"id": 'id'};

  Ohrmempterminationreason.select = function(cb) {
    let membersCopy;
    Ohrmempterminationreason.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Ohrmempterminationreason.remoteMethod("select", {
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

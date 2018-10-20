"use strict";

module.exports = function(Ohrmsubunit) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = {fields: {"name": true, "id": true}, where: {"id": {neq: 1}} };
  let keys = {"name": 'label',"id": 'id'};

  Ohrmsubunit.select = function(cb) {
    let membersCopy;
    Ohrmsubunit.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Ohrmsubunit.remoteMethod("select", {
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

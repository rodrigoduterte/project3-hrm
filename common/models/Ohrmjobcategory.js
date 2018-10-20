"use strict";

module.exports = function(Ohrmjobcategory) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = {fields: {"name": true, "id": true}};
  let keys = {"name": 'label',"id": 'id'};

  Ohrmjobcategory.select = function(cb) {
    let membersCopy;
    Ohrmjobcategory.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Ohrmjobcategory.remoteMethod("select", {
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

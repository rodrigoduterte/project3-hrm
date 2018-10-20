"use strict";

module.exports = function(Hshrprovince) {

  let renamekeys = require('../utils/ops/object/renamekeys');
  let split = require('../utils/array/splitArray');
  let query = {fields: {"provincename": true, "provincecode": true}};
  let keys = {"provincename": 'label',"provincecode": 'id'};

  Hshrprovince.select = function(cb) {
    let membersCopy;
    Hshrprovince.find(query, (err,members)=> {
      membersCopy = JSON.parse(JSON.stringify(members));
      membersCopy = membersCopy.map(member =>
        {return renamekeys(keys,member)}
      )
      let [ids, labels] = split(membersCopy);
      cb(null, ids, labels);
    })
  }

  Hshrprovince.remoteMethod("select", {
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

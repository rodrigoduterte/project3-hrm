"use strict";

module.exports = function(Modelinfo) {
  let loopback = require("loopback");
  let eachof = require("async/eachOf");
  let _ = require("lodash");

  Modelinfo.disableRemoteMethodByName("create"); // Removes (POST) /modelinfo
  Modelinfo.disableRemoteMethodByName("upsert"); // Removes (PUT) /modelinfo
  Modelinfo.disableRemoteMethodByName("deleteById"); // Removes (DELETE) /modelinfo/:id
  Modelinfo.disableRemoteMethodByName("updateAll"); // Removes (POST) /modelinfo/update

  const jsonschema = (definition, cb) => {
    let fields = Object.keys(definition.properties);
    let properties = definition.properties;
    let json = {
      title: "",
      description: "",
      type: "object",
      required: [],
      properties: {}
    };

    eachof(fields, (fld, idx) => {
      // if field is not an id field include in the json schema
      let model;
      if (!properties[fld]["hide"]) {
        if (properties[fld]["select"]) {
          model = loopback.getModel(properties[fld]["select"]);
          model.select((n, num, data) => {
            json.properties[fld] = {
              type: properties[fld].type.name.toLowerCase(),
              title: properties[fld]["title"],
              enum: num,
              enumNames: data
            };
          });
        }
        if (properties[fld]["hasEnum"]) {
          json.properties[fld] = {
            type: properties[fld].type.name.toLowerCase(),
            title: properties[fld]["title"],
            enum: properties[fld]["enum"],
            enumNames: properties[fld]["enumNames"]
          };
        }
        if (!properties[fld]["id"]) {
          if (properties[fld].type.name === "Date") {
            json.properties[fld] = {
              type: "string",
              format: "date",
              title: properties[fld]["title"]
            };
          } else if (properties[fld].type.name === "String") {
            json.properties[fld] = {
              type: "string",
              title: properties[fld]["title"]
            };
          }

          if (properties[fld].required) {
            json.required.push(fld);
          }
        }
      }
    });

    setTimeout(function() {
      cb(json);
    }, 2000);
    // return json;
  };

  const tableschema = definition => {
    let fields = Object.keys(definition.properties);
    let columns = [];
    let properties = definition.properties;

    columns = fields.map(fld => {
      return { Header: properties[fld].title, accessor: fld };
    });

    return columns;
  };

  function uischema(model, cb) {
    let ui = {};
    let fields = Object.keys(model.definition.properties);

    let properties = model.definition.properties;
    ui["ui:order"] = model.definition.settings.uiorder;

    let modelsSelected = Object.keys(properties)
      .map(property => {
        return { [property]: properties[property]["select"] };
      })
      .filter(model => Object.values(model)[0] !== undefined);

    eachof(fields, (fld, idx) => {
      if (!properties[fld]["hide"]) {
        if (properties[fld].type.name === "String" && !fld.match(/email/g)) {
          if (properties[fld]["select"] || properties[fld]["options"]) {
            if (!properties[fld].required) {
              ui[fld] = { "ui:widget": "text" }; //"ui:emptyValue": "" };
            } else if (properties[fld].type.name === "Date") {
              ui[fld] = {
                "ui:field": "rdp",
                rdp: {
                  dayPickerProps: {
                    todayButton: "Today"
                  },
                  "ui:emptyValue": null
                }
              };
            } else if (fld.match(/email/g)) {
              ui[fld] = {
                "ui:options": {
                  inputType: "email"
                },
                "ui:emptyValue": null
              };
            }
          }
        }
      }
    });

    //in the future change to a conditional callback
    setTimeout(function() {
      cb(ui);
    }, 2000);
  }

  Modelinfo.form = function(model, cb) {
    let Model = loopback.getModel(model);
    let definition = Model.definition;
    jsonschema(definition, json => {
      cb(null, json);
    });
  };

  Modelinfo.table = function(model, cb) {
    let Model = loopback.getModel(model);
    let definition = Model.definition;
    cb(null, tableschema(definition));
  };

  Modelinfo.formui = function(model, cb) {
    let Model = loopback.getModel(model);
    // let definition = Model.definition;
    uischema(Model, schema => {
      cb(null, schema);
    });
  };

  Modelinfo.remoteMethod("form", {
    accepts: { arg: "model", type: "string", required: true },
    http: {
      path: "/form/:model",
      verb: "get"
    },
    returns: {
      arg: "schema",
      type: "object"
    }
  });

  Modelinfo.remoteMethod("table", {
    accepts: { arg: "model", type: "string", required: true },
    http: {
      path: "/table/:model",
      verb: "get"
    },
    returns: {
      arg: "schema",
      type: "object"
    }
  });

  Modelinfo.remoteMethod("formui", {
    accepts: { arg: "model", type: "string", required: true },
    http: {
      path: "/formui/:model",
      verb: "get"
    },
    returns: [
      {
        arg: "schema",
        type: "object"
      }
    ]
  });
};

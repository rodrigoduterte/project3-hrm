import axios from 'axios';

export default {
  // model must be in plural form
  // Gets all members of a model
  getp: function(model) {
    return axios.get("http://localhost:3000/api/"+model);
  },
  // Gets a model with the given id
  gets: function(model, id) {
    return axios.get("http://localhost:3000/api/" + model + "/" + id);
  },
  getpFilter: function(model, filter) {
    //{"where": {"numcode": {"neq": null}}}
    return axios.get("http://localhost:3000/api/" + model + filter)
  },
  // Deletes a model with the given id
  deletes: function(model,id) {
    return axios.delete("http://localhost:3000/api/" + model + "/" + id);
  },
  // Creates an article to the database
  creates: function(model, data) {
    return axios.post("http://localhost:3000/api/" + model, data);
  },
  updates: function(model, id, data) {
    return axios.put("http://localhost:3000/api/" + model + "/" + id, data);
  }
};

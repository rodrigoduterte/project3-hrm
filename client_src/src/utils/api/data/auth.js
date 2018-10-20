import axios from "axios";
import {appstore} from "../../../stores/store";

export default {
  // model must be in plural form
  // Gets all members of a model
  login: function(email,pass) {
    axios.post("http://localhost:3000/api/Users/login",{email:email, password:pass})
    .then(res=>{
      if(res.data.id && res.data.userId) {
        appstore.common.do.setCurrentToken(res.data.id);
        appstore.common.do.setCurrentUserId(res.data.userId);
      }
    }).catch(err => {
      console.log('failed to log in ' + err);
    });
  },
  // Gets a model with the given id
  logout: function() {
    const token = appstore.common.do.getCurrentToken();
    axios.post("http://localhost:3000/api/Users/logout?access_token="+token).then(res=>{
      appstore.common.do.setCurrentToken("");
      appstore.common.do.setCurrentUserId("");
  })},
  signup: function(email,pass) {
    axios.post("http://localhost:3000/api/Users",{email:email,password:pass})
    .then(res => {
      appstore.common.do.setCurrentToken("");
      appstore.common.do.setCurrentUserId("");
      console.log("Successfully added a user");
    })
    .catch(res=>{
      console.log("Failed to create a new user");
    });
  }
};

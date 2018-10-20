//clean
import axios from "axios";

export default {
  getform: (model) => {
    return axios.get("http://localhost:3000/api/modelinfos/form/" + model)
  },
  gettable: (model) => {
    return axios.get("http://localhost:3000/api/modelinfos/table/" + model)
  },
  getformui: (model) => {
    return axios.get("http://localhost:3000/api/modelinfos/formui/" + model)
  }
}


import data from "../data/data";
import { loadData } from "../../../stores/store";
import str from "../../ops/str/str";
// import EditProperty from "../../ops/obj/toSingleValue";


const formevents = {
  onSubmit : (formData, model, id, cb) => {
    const plural = str.plurality(model);
    if (id) {
      data.updates(plural, id ,formData).then((response) => {
        console.log("Successfully updated a member");
        console.log("In the process of making a blank form data");
        loadData();
        cb();
      }).catch(error => console.log(`Something went wrong ${error}`));
    } else {
      data.creates(plural, formData).then((response) => {
        console.log("Successfully created a member");
        console.log("In the process of making a blank form data");
        loadData();
        cb();
      }).catch(error => console.log(`Something went wrong ${error}`));
    }
  },
  transformErrors : (errors) => {}
}

export default formevents;

//for future use
export default {
  transform: (errors) => {
    return errors.map(error => {
      console.log(error);
      // if (error.name === "pattern") {
      //   error.message = "Only digits are allowed";
      // }
      return error;
    });
  }
}

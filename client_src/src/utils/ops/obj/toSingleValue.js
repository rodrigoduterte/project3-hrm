import _ from "lodash";

class EditProperty {
  constructor(toEdit) {
    this.toEdit = toEdit;
    this.changes = 0;
  }

  toSingleValue() {
    _.forEach(this.toEdit, (val,k) => {
      if (typeof val === 'object' && val !== null) {
        this.toEdit[k] = val['id'];
        this.changes++;
      }
    });

    return [this.changes > 0, this.toEdit];
  }

  toObject(optionList) {
    return optionList.find(opt => parseInt(opt['id']) === parseInt(this.toEdit));
  }
}

export default EditProperty;

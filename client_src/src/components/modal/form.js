import Form from "react-jsonschema-form";
import React, { Component } from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";

import formevents from "../../utils/api/wids/form";
import {view} from "react-easy-state";
import {appstore, loadData} from "../../stores/store";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import ReactDatePicker from "react-jsonschema-form-extras/lib/ReactDatePicker";
import "react-day-picker/lib/style.css";

class modal extends Component {
  constructor(props) {
    super(props);
  }

  closeForm() {
    appstore.common.do.setCurrentMemberID(null);
    appstore.common.do.enableRun(false,'New');
    appstore.common.do.enableRun(false,'Edit');
  };



  render() {
    const log = (type) => console.log.bind(console, type);

    const appdo = appstore.common.do;
    const fields = { typeahead: TypeaheadField, rdp: ReactDatePicker };
    const onemember = appdo.getOneMemberOfCurrentModel();

    const currentModel = appdo.getCurrentModel();
    const currentMemberID = appdo.getCurrentMemberID();

    const closeForm = this.closeForm;
    const schema = {
      form: appdo.schema.getSchemaOfChosenModel('form'),
      formui: appdo.schema.getSchemaOfChosenModel('formui')
    }


    return (
      <Modal open={this.props.open}>
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content scrolling>
          <Form
            autocomplete="off"
            formData={onemember}
            schema={schema.form}
            uiSchema={schema.formui}
            fields={fields}
            formContext={{allowMutation: true}}
            noValidate={true}
            transformErrors={()=>{}}
            onChange={log("changed")}
            onError={()=>console.log('On error called')}
            onSubmit={({formData}) => {
              formevents.onSubmit(formData, currentModel, currentMemberID, () => {
                closeForm();
              });
            }}>

            <Modal.Actions>
              <Button primary type="submit">
                Submit
              </Button>
              <Button primary onClick={this.closeForm} type="button">
                Cancel
              </Button>
            </Modal.Actions>
          </Form>
          <Modal.Description>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default view(modal);

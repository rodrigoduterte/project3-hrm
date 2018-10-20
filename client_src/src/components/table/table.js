import React, { Component } from "react";
import ReactTable from "react-table";
import tblschema from "../../utils/api/wids/schema";
import conf from "../../config";

export default class table extends Component {
  constructor(props){
    super(props);
    this.state = {
      schema : {},
      columns : {},
      data : {}
    }
  }

  componentDidMount() {
    let models = conf.tables;
    let model = this.props.model
    this.setState({data: this.props.data[model]});

    models.forEach(model => {
      tblschema.gettable(model, (data)=> {
        this.setState({ schema: {...this.state.schema, [model] : data} }, ()=>{
          this.setState({ columns: this.state.schema[model] }, ()=>{

          });
        });
      })
    })

  }

  loadModels() {

  }

  render() {
    let model = this.props.model;
    let cols = this.state.columns[model] ? this.state.columns[model] : {};
    let data = this.state.data;
    return (
      <>
      <div>i miss you</div>
      <ReactTable columns={ cols } data={ this.state.data } pageSizeOptions={[5, 10]} defaultPageSize={10}/>
      </>
    )
  }
}

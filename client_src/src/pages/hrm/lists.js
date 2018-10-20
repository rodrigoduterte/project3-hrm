import React, { Component } from "react";
import ReactTable from "react-table";
import Tables from "../../components/table/table";
import Select from "react-select";
import 'react-table/react-table.css';

export default class page extends Component {
  state = {
    options: [{value: 'users', label: 'User'},{value: 'jobtitles', label: 'Job Titles'},
    {value: 'jobvacancies', label: 'Job Vacancies'},{value: 'jobcandidates', label: 'Job Candidates'}],
    selectedOption: {value: 'jobvacancies', label: 'Job Vacancies'},
    data: [],
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  componentDidMount() {

  }

  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
        />
        <Tables data={this.props.data} model={this.state.selectedOption.value} />
      </>
    );
  }
}

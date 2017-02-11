import React, { PropTypes } from 'react';
import {debounce} from 'throttle-debounce';

import Search from './Search';
import TableHeader from './TableHeader';

// Mock Data
let MockData = require('./generated.json');

export default class Employees extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      sortValue: ''
    };
    this.searchInputChangeFunction = this.searchInputChangeFunction.bind(this);
    this.searchFunction = debounce(1000, this.searchFunction);
    this.sortFunction = this.sortFunction.bind(this);
  }

  // Sort function
  sortFunction(sortValue, event) {
    this.setState({sortValue: sortValue});
  }

  // Search value change function
  searchInputChangeFunction(event) {
     this.searchFunction(event.target.value);
   }

  // Search function
  searchFunction(value, event) {
    this.setState({searchValue: value});
  }

  render() {

    let sortedEmployeesBySearch = MockData.filter(
      (employee) => {
        // If state searchValue is not null
        if (this.state.searchValue) {
          return employee.name.indexOf(this.state.searchValue) !== -1 || employee.gender.indexOf(this.state.searchValue) !== -1 || employee.company.indexOf(this.state.searchValue) !== -1 || employee.email.indexOf(this.state.searchValue) !== -1;
        }
        else {
          return employee;
        }
      }
    ).sort((a, b) => {
      // If state sortValue is not null
      if (this.state.sortValue) {
        let aVal = a[this.state.sortValue];
        let bVal = b[this.state.sortValue];
        switch(typeof aVal) {
          case 'string':
            return aVal.localeCompare(bVal);
          case 'number':
            return aVal - bVal;
          default:
            throw new Error("Unsupported value to sort by");
        }
      }
    });

    return (
      <div className="container">
        <Search searchInputChangeFunction={this.searchInputChangeFunction} searchOnKeyUp={this.searchOnKeyUp}/>
        <table className="employeesList">
          <thead>
            <TableHeader sortValue={this.state.sortValue} sortFunction={this.sortFunction}/>
          </thead>
          <tbody>
            { sortedEmployeesBySearch.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.gender}</td>
              <td>{employee.company}</td>
              <td><a href="mailto:{employee.email}">{employee.email}</a></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  }

}

import React, { PropTypes } from 'react';

export default class TableHeader extends React.PureComponent {

  render() {

    const headers = [
      { "value": "name", "text": "Name" },
      { "value": "gender", "text": "Gender"},
      { "value": "company", "text": "Company"},
      { "value": "email", "text": "E-mail"}
    ];

    return (
      <tr>
        { headers.map((header) => (
        <th key={header.value} onClick={this.props.sortFunction.bind(this, header.value)} className={this.props.sortValue === header.value ? "active" : "inactive"}>{header.text}<div/></th>
        ))}
      </tr>
    );

  }

}

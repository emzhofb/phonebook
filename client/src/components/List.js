import React from 'react';
import axios from 'axios';
import ListData from './ListData';
import Add from './Add';
import Title from './Title';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: '',
      name: '',
      phone: ''
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    axios
      .get('http://localhost:4000/api/phonebooks')
      .then(result => {
        this.setState({
          data: [...result.data]
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <Title />
        <br />
        <Add loadData={this.loadData} />
        <br />
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((phonebooks, index) => {
              return (
                <ListData
                  phonebooks={phonebooks}
                  index={index}
                  loadData={this.loadData}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;

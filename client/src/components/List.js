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
      phone: '',
      nameFilter: '',
      phoneFilter: ''
    };
  }

  componentDidMount() {
    this.loadData();
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

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

  filter = () => {
    const { nameFilter, phoneFilter } = this.state;

    return (
      <div>
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: 'rgb(51, 202, 111)', color: 'white' }}
          >
            Search Form
          </div>
          <div className="card-body">
            <form>
              <div className="form-inline">
                <label className="my-1 mr-2 mx-sm-1">name</label>
                <input
                  className="form-control mx-sm-1"
                  type="text"
                  name="nameFilter"
                  placeholder="Ikhda Muhammad Wildani"
                  value={nameFilter}
                  onChange={this.handleChange}
                />
                <label className="my-1 mr-2 mx-sm-1">phone</label>
                <input
                  className="form-control mx-sm-1"
                  type="text"
                  name="phoneFilter"
                  value={phoneFilter}
                  placeholder="081111111111"
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { data, nameFilter, phoneFilter } = this.state;

    if (nameFilter && phoneFilter) {
      const filterItems = (name, phone) => {
        return data.filter(el => {
          return (
            el.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
            el.phone.indexOf(phone) > -1
          );
        });
      };
      data = filterItems(nameFilter, phoneFilter);
    }
    if (nameFilter) {
      const filterItems = name => {
        return data.filter(el => {
          return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
      };
      data = filterItems(nameFilter);
    }
    if (phoneFilter) {
      const filterItems = phone => {
        return data.filter(el => {
          return el.phone.indexOf(phone) > -1;
        });
      };
      data = filterItems(phoneFilter);
    }

    return (
      <div>
        <Title />
        <br />
        <Add loadData={this.loadData} />
        <br />
        {this.filter()}
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
            {data.map((phonebooks, index) => {
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

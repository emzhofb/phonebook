import React from 'react';
// import axios from 'axios';
import ListData from './ListData';
import Add from './Add';
import Title from './Title';
import { connect } from 'react-redux';
import { loadPhonebooks } from '../actions';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      phone: '',
      nameFilter: '',
      phoneFilter: ''
    };
  }

  componentDidMount() {
    this.props.loadPhonebooks();
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
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
    let { phonebooks } = this.props;
    let { nameFilter, phoneFilter } = this.state;

    if (nameFilter && phoneFilter) {
      const filterItems = (name, phone) => {
        return phonebooks.filter(el => {
          return (
            el.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
            el.phone.indexOf(phone) > -1
          );
        });
      };
      phonebooks = filterItems(nameFilter, phoneFilter);
    }
    if (nameFilter) {
      const filterItems = name => {
        return phonebooks.filter(el => {
          return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
      };
      phonebooks = filterItems(nameFilter);
    }
    if (phoneFilter) {
      const filterItems = phone => {
        return phonebooks.filter(el => {
          return el.phone.indexOf(phone) > -1;
        });
      };
      phonebooks = filterItems(phoneFilter);
    }

    return (
      <div>
        <Title />
        <br />
        <Add />
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
            {phonebooks.map((phonebooks, index) => {
              return <ListData phonebooks={phonebooks} index={index} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  phonebooks: state.phonebooks
});

const mapDispatchToProps = dispatch => ({
  loadPhonebooks: () => dispatch(loadPhonebooks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

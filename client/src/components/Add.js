import React from 'react';
import axios from 'axios';

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      addButton: true,
      id: '',
      name: '',
      phone: ''
    };
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleAddButton = e => {
    e.preventDefault();
    this.setState({ addButton: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, name, phone } = this.state;
    const data = {
      id,
      name,
      phone
    };
    axios
      .post('http://localhost:4000/api/phonebooks', data)
      .then(() => {
        this.props.loadData();
        this.setState({
          addButton: true,
          id: '',
          name: '',
          phone: ''
        });
      })
      .catch(err => console.error(err));
  };

  handleCancel = e => {
    e.preventDefault();
    this.setState({ addButton: true });
  };

  form = () => {
    return (
      <div>
        <div className="card">
          <div className="card-header">Add Form</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-inline">
                <label className="my-1 mr-2 mx-sm-1">id</label>
                <input
                  className="form-control"
                  type="text"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleChange}
                  placeholder="0123456789"
                />
                <label className="my-1 mr-2 mx-sm-1">name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Ikhda Muhammad Wildani"
                />
                <label className="my-1 mr-2 mx-sm-1">phone</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  placeholder="081111111111"
                />
                <button type="submit" className="btn btn-success mx-sm-2">
                  <i className="far fa-check-circle mr-2" />
                  save
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ color: 'white' }}
                  onClick={this.handleCancel}
                >
                  <i className="fas fa-ban mr-2" />
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  add = () => {
    return (
      <div>
        <button
          href="/"
          onClick={this.handleAddButton}
          type="button"
          className="btn btn-info"
        >
          <i className="fas fa-plus" /> Add
        </button>
      </div>
    );
  };

  render() {
    if (this.state.addButton) {
      return this.add();
    } else {
      return this.form();
    }
  }
}

export default Add;

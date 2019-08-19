import React from 'react';
import { connect } from 'react-redux';
import { postPhonebook } from '../actions';

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      addButton: true,
      id: '',
      name: '',
      phone: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (id && name && phone) {
      this.props.postPhonebook(id, name, phone);
      this.setState({
        addButton: true,
        id: '',
        name: '',
        phone: ''
      });
    }
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

const mapDispatchToProps = dispatch => ({
  postPhonebook: (id, name, phone) => {
    dispatch(postPhonebook(id, name, phone));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Add);

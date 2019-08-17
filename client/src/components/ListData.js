import React from 'react';
import axios from 'axios';

class ListData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editButton: false,
      id: props.phonebooks.id,
      name: props.phonebooks.name,
      phone: props.phonebooks.phone
    };
  }

  handleSave = e => {
    e.preventDefault();
    const { name, phone } = this.state;
    const data = {
      name,
      phone
    };
    axios
      .put(`http://localhost:4000/api/phonebooks/${this.state.id}`, data)
      .then(() => {
        this.setState({ editButton: false });
      })
      .catch(err => console.error(err));
  };

  handleCancel = e => {
    e.preventDefault();
    this.setState({ editButton: false });
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleEdit = e => {
    e.preventDefault();
    this.setState({ editButton: true });
  };

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/api/phonebooks/${this.state.id}`)
      .then(() => console.log('deleted'))
      .catch(err => console.error(err));
  };

  render() {
    const { index, phonebooks } = this.props;
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        {!this.state.editButton && (
          <>
            <td>{phonebooks.name}</td>
            <td>{phonebooks.phone}</td>
            <td>
              <button
                type="button"
                className="btn btn-success mx-sm-2"
                onClick={this.handleEdit}
              >
                <i className="fas fa-pencil-alt mr-1" />
                edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleDelete}
              >
                <i className="far fa-trash-alt mr-1" />
                delete
              </button>
            </td>
          </>
        )}
        {this.state.editButton && (
          <>
            <td>
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-info mx-sm-2"
                onClick={this.handleSave}
              >
                <i className="far fa-sticky-note mr-2" />
                Save
              </button>
              <button
                type="button"
                className="btn btn-warning mx-sm-2"
                onClick={this.handleCancel}
                style={{ color: 'white' }}
              >
                <i className="fas fa-window-close mr-2" />
                Cancel
              </button>
            </td>
          </>
        )}
      </tr>
    );
  }
}

export default ListData;

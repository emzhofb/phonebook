import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { putPhonebook, deletePhonebook } from '../actions';

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
    const { id, name, phone } = this.state;
    if (name && phone) {
      this.props.putPhonebook(id, name, phone);
      this.setState({ editButton: false });
    }
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

  handleDelete = () => {
    const { id } = this.state;
    this.props.deletePhonebook(id);
  };

  showAlert = e => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success'
        });
        this.handleDelete();
      } else {
        swal('Your imaginary file is safe!');
      }
    });
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
                className="btn btn-success"
                onClick={this.handleEdit}
              >
                <i className="fas fa-pencil-alt mr-1" />
                edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-sm-2"
                onClick={this.showAlert}
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
                className="btn btn-info"
                onClick={this.handleSave}
              >
                <i className="far fa-sticky-note mr-2" />
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-sm-2"
                onClick={this.handleCancel}
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

const mapDispatchToProps = dispatch => ({
  putPhonebook: (id, name, phone) => {
    dispatch(putPhonebook(id, name, phone));
  },
  deletePhonebook: id => {
    dispatch(deletePhonebook(id));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(ListData);

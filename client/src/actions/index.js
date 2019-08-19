import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

const request = axios.create({
  baseURL: API_URL,
  timeout: 1000
});

export const loadPhonebooksSuccess = phonebooks => ({
  type: 'LOAD_PHONEBOOKS_SUCCESS',
  phonebooks
});

export const loadPhonebooksFailure = () => ({
  type: 'LOAD_PHONEBOOKS_FAILURE'
});

export const loadPhonebooks = () => {
  return dispatch => {
    return request
      .get('phonebooks')
      .then(response => {
        dispatch(loadPhonebooksSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(loadPhonebooksSuccess());
      });
  };
};

export const postPhonebookSuccess = phonebooks => ({
  type: 'POST_PHONEBOOK_SUCCESS',
  phonebooks
});

export const postPhonebookFailure = id => ({
  type: 'POST_PHONEBOOK_FAILURE',
  id
});

const postPhonebookRedux = (id, name, phone) => ({
  type: 'POST_PHONEBOOK',
  id,
  name,
  phone
});

export const postPhonebook = (id, name, phone) => {
  return dispatch => {
    dispatch(postPhonebookRedux(id, name, phone));
    return request
      .post('phonebooks', { id, name, phone })
      .then(response => {
        dispatch(postPhonebookSuccess(response.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(postPhonebookFailure());
      });
  };
};

export const putPhonebookSuccess = phonebooks => ({
  type: 'PUT_PHONEBOOK_SUCCESS',
  phonebooks
});

export const putPhonebookFailure = id => ({
  type: 'PUT_PHONEBOOK_FAILURE',
  id
});

const putPhonebookRedux = (id, name, phone) => ({
  type: 'PUT_PHONEBOOK',
  id,
  name,
  phone
});

export const putPhonebook = (id, name, phone) => {
  return dispatch => {
    dispatch(putPhonebookRedux(id, name, phone));
    return request
      .put(`phonebooks/${id}`, { name, phone })
      .then(response => {
        dispatch(putPhonebookSuccess(response.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(putPhonebookFailure());
      });
  };
};

const deletePhonebookRedux = id => ({
  type: 'DELETE_PHONEBOOK',
  id
});

export const deletePhonebookSuccess = phonebooks => ({
  type: 'DELETE_PHONEBOOK_SUCCESS',
  phonebooks
});

export const deletePhonebookFailure = () => ({
  type: 'DELETE_PHONEBOOK_FAILURE'
});

export const deletePhonebook = id => {
  return dispatch => {
    dispatch(deletePhonebookRedux(id));
    return request
      .delete(`phonebooks/${id}`)
      .then(response => {
        dispatch(deletePhonebookSuccess(response.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(deletePhonebookFailure());
      });
  };
};

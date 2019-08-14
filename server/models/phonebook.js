const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phonebookSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = mongoose.model('Phonebook', phonebookSchema);

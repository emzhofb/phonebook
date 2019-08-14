const Phonebook = require('../models/phonebook');

exports.getPhonebook = (req, res, next) => {
  const error = e => {
    throw e;
  };

  Phonebook.find()
    .then(phonebooks => {
      if (phonebooks) {
        const newPhonebooks = [];
        phonebooks.forEach(phonebook => {
          newPhonebooks.push({
            id: phonebook.id,
            name: phonebook.name,
            phone: phonebook.phone
          });
        });

        return res.status(200).json(newPhonebooks);
      }

      error("phonebooks can't be found!");
    })
    .catch(err => {
      return res.status(406).json({ message: err });
    });
};

exports.postPhonebook = (req, res, next) => {
  const { id, name, phone } = req.body;
  const phonebook = new Phonebook({
    id: id,
    name: name,
    phone: phone
  });

  phonebook
    .save()
    .then(() => {
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          id: id,
          name: name,
          phone: phone
        }
      });
    })
    .catch(err => {
      return res.status(406).json({ message: "Can't add phonebook" });
    });
};

exports.putPhonebook = (req, res, next) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  Phonebook.findOneAndUpdate(
    {
      id: id
    },
    {
      name: name,
      phone: phone
    }
  )
    .then(() => {
      return res.status(200).json({
        status: 'SUCCESS',
        data: {
          id: id,
          name: name,
          phone: phone
        }
      });
    })
    .catch(err => {
      return res.status(406).json({ message: "Can't edit phonebook" });
    });
};

exports.deletePhonebook = (req, res, next) => {
  const { id } = req.params;
  const error = e => {
    throw e;
  };

  Phonebook.findOneAndRemove({ id: id })
    .then(found => {
      if (found) {
        const newPhonebook = {};
        newPhonebook.id = found.id;
        newPhonebook.name = found.name;
        newPhonebook.phone = found.phone;

        return res.status(200).json({
          status: 'SUCCESS',
          data: newPhonebook
        });
      }

      error("phonebooks can't be deleted!");
    })
    .catch(err => {
      return res.status(406).json({ message: err });
    });
};

const Patient = require('../models/patient');

exports.creatPatient = (req, res, next) => {
    delete req.body._id;
    const patient = new Patient({
        ...req.body
    })
    patient.save()
      .then(() => res.status(201).json({ message: 'Patient enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyPatient = (req, res, next) => {
    Patient.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Patient modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deletePatient = (req, res, next) => {
    Patient.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Patient supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePatient = (req, res, next) => {
    Patient.findOne({ _id: req.params.id })
      .then(patient => res.status(200).json(patient))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllPatients = (req, res, next) => {
    Patient.find()
    .then(patients => res.status(200).json(patients))
    .catch(error => res.status(400).json({ error }));
  };
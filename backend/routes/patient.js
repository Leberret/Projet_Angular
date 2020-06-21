const express = require('express');

const router = express.Router();


const patientCtrl = require('../controllers/patient');

router.post('/', patientCtrl.creatPatient);
router.put('/:id', patientCtrl.modifyPatient);
router.delete('/:id', patientCtrl.deletePatient);
router.get('/:id', patientCtrl.getOnePatient);
router.get('/', patientCtrl.getAllPatients);

module.exports = router;
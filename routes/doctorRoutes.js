const express = require('express');
const router = express.Router();
const { saveDoctor, getAllDoctors} = require('../controllers/doctorController');

router.post('/doctor', saveDoctor);

router.get('/doctors', getAllDoctors);


module.exports = router;

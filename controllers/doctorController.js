const Doctor = require("../models/doctorDb");

const saveDoctor = async (req, res) => {
    try {
        const { name, specialty } = req.body;

        const doctor = new Doctor({
            name,
            specialty
        });
        await doctor.save();

        res.json({ doctor });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json({ doctors });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { saveDoctor, getAllDoctors };

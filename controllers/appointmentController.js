
const Appointment = require('../models/appointmentDb');
const User = require('../models/userDb');
const Doctor = require('../models/doctorDb');

const saveAppointment = async (req, res) => {
    const { patientId, doctorId, appointmentChannel, appointmentTitle, appointmentDate, appointmentTime, appointmentType, vitalInfo, reason, noteForDoctor } = req.body;

    try {
        // check patient and doctor exist
        const patient = await User.findById(patientId);
        const doctor = await Doctor.findById(doctorId);

        if (!patient || !doctor) {
            console.error(`Patient ID: ${patientId}, Doctor ID: ${doctorId}`);
            return res.status(400).json({ msg: 'Patient or Doctor not found' });
        }

        // Create a new appointment
        const appointment = new Appointment({
            patient: patient._id,
            doctor: doctor._id,
            appointmentChannel,
            appointmentTitle,
            appointmentDate,
            appointmentTime,
            appointmentType,
            vitalInfo,
            reason,
            noteForDoctor
        });

        // Save the appointment to the database
        const newAppointment = await appointment.save();
        res.json(newAppointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


const getAppointment=async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name') // Populate patient's name
            .populate('doctor', 'name')  // Populate doctor's name
            .select('appointmentType appointmentTime'); // Select specific fields from Appointment

        const result = appointments.map(appointment => ({
            patientName: appointment.patient.name,
            doctorName: appointment.doctor.name,
            appointmentType: appointment.appointmentType,
            appointmentTime: appointment.appointmentTime
        }));

        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const type=async(req,res)=>{
    try {
        
        const appointmentTypes = [
            { id: '1', name: 'General Consultation' },
            { id: '2', name: 'Specialist Consultation' },
            { id: '3', name: 'Follow-Up' },
            { id: '4', name: 'Routine Check-Up' },
            { id: '5', name: 'Emergency' }
        ];

        res.json(appointmentTypes)
    } catch (error) {
        
    }
}




module.exports={
    saveAppointment,
    getAppointment,type
}
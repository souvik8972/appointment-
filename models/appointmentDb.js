const mongoose=require("mongoose");


const appointmentSchema=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    appointmentChannel: { type: String, required: true },
    appointmentTitle: { type: String },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    appointmentType: { type: String, required: true },
    vitalInfo: {
        BP: String,
        Temp: String,
        Height: String,
        Weight: String,
        SPO2: String,
        PulseRate: String,
    },
    reason:String,
    noteForDoctor: String,

})
const Appointment=mongoose.model("Appointment",appointmentSchema);
module.exports=Appointment;
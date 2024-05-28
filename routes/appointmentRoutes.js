const express = require('express');
const router = express.Router();
const controller=require("../controllers/appointmentController")



router.post('/appointment',controller.saveAppointment)
router.get("/appointment",controller.getAppointment)
router.get("/appointment-types/",controller.type)
router.get("/dashboard",(req,res)=>{
    res.sendFile("dashboard.html", { root: "views" })
})

 router.get("/booked",(req,res)=>{
     res.sendFile("booked.html", { root: "views" })
 })


module.exports = router;

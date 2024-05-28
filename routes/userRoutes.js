const express = require('express');
const router = express.Router();
const { saveUser, getUser, getAllUsers, searchUsers } = require('../controllers/userController');
const res = require('express/lib/response');

router.get("/",(req,res)=>{
    res.sendFile("login.html", { root: "views" })
})

router.post('/user', saveUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);
router.get('/users/search', searchUsers);  

module.exports = router;

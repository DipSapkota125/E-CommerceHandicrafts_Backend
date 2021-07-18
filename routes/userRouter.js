const router = require('express').Router();
const userController = require('../controllers/userController');
const upload = require('../Middleware/upload');
const fs = require('fs');


router.post('/user/register', upload.single('image'),userController.userRegister);
router.post('/user/login',userController.userlogin );


module.exports = router;
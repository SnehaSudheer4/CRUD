const express =require('express')
const router=express.Router();
const userController=require('../Controllers/UserController')
const userAuthMiddleware=require('../Middlewares/userAuth')

router.post('/register',userController.registerUser)
router.post('/userlogin',userController.loginUser)
router.post('/taskUpdation',userAuthMiddleware,userController.taskUpdation)
router.get('/userheader',userAuthMiddleware,userController.userHeader)
router.get('/getdata/:email',userController.getUserData)
router.get('/getupdates',userController.Updates)
router.put('/edit/:detailsId', userController.editUpdates)

// router.get('/getdata/:id', userController.getUserData);
module.exports = router;
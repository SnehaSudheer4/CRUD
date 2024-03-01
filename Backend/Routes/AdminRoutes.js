const express =require('express')
const router=express.Router();
const adminAuthMiddleware = require('../Middlewares/adminAuth');
const adminController=require('../Controllers/AdminController')

router.get('/updation',adminAuthMiddleware, adminController.getUpdates);
router.post('/adminlogin',adminController.loginAdmin);
router.get('/adminheader',adminAuthMiddleware,adminController.adminHeader)
router.post('/search',adminController.handleSearch)
router.get('/userlist',adminController.getUserlist)
router.put('/block/:userId', adminController.blockUser);


router.put('/unblock/:userId', adminController.unblockUser);
module.exports=router;
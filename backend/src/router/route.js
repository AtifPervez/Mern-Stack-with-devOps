const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')

const empDetails=require('../controllers/employeeDetails')
router.get('/getEmpDetails',empDetails.getEmpDetails)

const monthlyAttendance=require('../controllers/monthlyAttendance')
router.post('/getMonthlyAttendance',monthlyAttendance.getMonthlyAttendance)

const register=require('../controllers/user')
router.post('/register',register.postRegister)
const login=require('../controllers/user')
router.post('/login',login.login)
router.post('/getUser/:id',auth,register.getUser)



module.exports=router
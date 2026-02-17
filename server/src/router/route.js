const express=require('express')
const router=express.Router()

const empDetails=require('../controllers/employeeDetails')
router.get('/getEmpDetails',empDetails.getEmpDetails)

const monthlyAttendance=require('../controllers/monthlyAttendance')
router.post('/getMonthlyAttendance',monthlyAttendance.getMonthlyAttendance)



module.exports=router
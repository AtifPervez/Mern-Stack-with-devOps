const mongoose = require('mongoose');

const Employee = mongoose.model(
    'Employee',
    new mongoose.Schema({}, { strict: false, collection: 'eve_acc_employee' })
);

const getEmpDetails = async (req, res) => {
    try {
        const employees = await Employee.find();


        res.status(200).json({totalData:employees.length,data:employees});


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.msg })
    }
}
module.exports = { getEmpDetails }
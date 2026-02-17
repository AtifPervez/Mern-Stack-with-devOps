const mongoose = require('mongoose');
const moment = require('moment')

const Employee = mongoose.model(
    'eve_acc_employee',
    new mongoose.Schema({}, { strict: false, collection: 'eve_acc_employee' })
);

const eve_acc_employee_attendence = mongoose.model(
    'eve_acc_employee_attendence',
    new mongoose.Schema({}, { strict: false, collection: 'eve_acc_employee_attendence' })
);



const getMonthlyAttendance = async (req, res) => {
    try {
        const data = req.body
        const { year, month } = data
        const page = Number(req.body.page) || 1;
        const limit = Number(req.body.limit) || 10;
        const skip = (page - 1) * limit;


        const employees = await Employee.aggregate([
            {
                $match: {
                    employeeCurrentStatus: {
                        $in: [
                            'offerletter',
                            'Active',
                            'resignation',
                            'joining',
                            'termination',
                            'release'
                        ]
                    }, status: 'A'
                }
            },
            {
                $lookup: {
                    from: "eve_acc_locationmaster",
                    localField: "locationID",
                    foreignField: "id",
                    as: "locationInfo"
                }
            },
            {
                $lookup: {
                    from: "eve_acc_company_branch",
                    localField: "employeeBranchId",
                    foreignField: "branchId",
                    as: "branchInfo"
                }
            },
            {
                $unwind: {
                    path: "$locationInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$branchInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    id: 1,
                    employeeName: 1,
                    employeeSubCompanyId: 1,
                    employeeCode: 1,
                    employeeDoj: 1,
                    locationID: 1,
                    employeeBranchId: 1,
                    isOvertimeApplicable: 1,
                    salaryTemplateId: 1,
                    employeeCurrentStatus: 1,
                    status: 1,
                    location: { $ifNull: ["$locationInfo.location", null] },
                    branch: { $ifNull: ["$branchInfo.branchName", null] }
                }
            },
            { $sort: { employeeName: 1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

        let noOfDaysMonth = new Date(year, month, 0).getDate()
        const startDate = new Date(`${year}-${month}-01`)
        const endDate = new Date(`${year}-${month}-${noOfDaysMonth}`)


        await Promise.all(employees.map(async (e, i) => {
            let arr = []
            for (let i = 1; i <= noOfDaysMonth; i++) {
                let day = i.toString().padStart(2, '0')
                let obj = {
                    crtDate: `${year}-${month}-${day}`,
                    intime: '',
                    outTime: ''
                }
                arr.push(obj)
            }
            e.app = arr

            const attendance = await eve_acc_employee_attendence.find({
                empId: e.id,
                date: { $gte: startDate, $lte: endDate }
            },
                {
                    intime: 1, outTime: 1, _id: 0, date: 1
                }

            )
            const attendanceMap = new Map()
            attendance.forEach((a) => {
                let dateStr = moment(a.date).format('YYYY-MM-DD')
                attendanceMap.set(dateStr, a)
            })
            e.app.forEach(async x => {
                const record = attendanceMap.get(x.crtDate);
                if (record) {
                    x.intime = record.intime
                    x.outTime = record.outTime
                }

            })

        }))












        res.status(200).json({
            totalData: employees.length,
            currentPageNo: page,
            recordedPerPage: limit,
            data: employees
        });

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message, err: error.stack });
    }
};

module.exports = { getMonthlyAttendance };

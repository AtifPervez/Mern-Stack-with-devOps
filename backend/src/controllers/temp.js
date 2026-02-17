employees = await Promise.all(
  employees.map(async (e) => {
    // Create daily template
    let arr = [];
    for (let i = 1; i <= noOfDaysMonth; i++) {
      let day = i.toString().padStart(2, '0');
      arr.push({
        crtDate: `${day}-${month}-${year}`,
        inTime: '',
        outTime: ''
      });
    }

    // Fetch attendance for this employee
    const attendance = await eve_acc_employee_attendence.find({
      empId: e.id,
      date: { $gte: startDate, $lte: endDate }
    });

    // Map attendance by date for quick lookup
    const attendanceMap = new Map();
    attendance.forEach((a) => {
      const dateKey = new Date(a.date).getDate().toString().padStart(2, '0') + `-${month}-${year}`;
      attendanceMap.set(dateKey, a);
    });

    // Fill template with attendance data
    arr = arr.map((dayObj) => {
      const record = attendanceMap.get(dayObj.crtDate);
      if (record) {
        dayObj.inTime = record.inTime || '';
        dayObj.outTime = record.outTime || '';
      }
      return dayObj;
    });

    e.app = arr;
    return e;
  })
);
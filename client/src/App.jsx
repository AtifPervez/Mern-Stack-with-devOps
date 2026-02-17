import { useEffect, useState } from "react";

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [employee, setEmployee] = useState(null);

  const dynamicYear = new Date().getFullYear();
  const dynamicMonth = new Date().getMonth() + 1
  const [year, setYear] = useState(dynamicYear);
  const [month, setMonth] = useState(dynamicMonth);

  useEffect(() => {
    // Call your backend API (GET method since your route.js uses router.get)
    fetch("http://localhost:3000/getMonthlyAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: year, month: month, page: 1, limit: 1 })

    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.totalData > 0) {
        const emp=data.data[0]
         setEmployee(emp);

          
          setCalendarData(data.data[0].app);
        }
      })
      .catch((err) => console.error("Error fetching attendance:", err));
  }, [year, month]);

  return (
    <div className="p-6">



      <div className="flex justify-center">

        <select value={year} onChange={(e) => setYear(e.target.value)} className="border rounded px-3 py-2" >
          <option value="" disabled>Select Year</option>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded px-3 py-2" >
          <option value="" disabled>Select Month</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>

        </select>

      </div>




          
      <h1 className="text-2xl font-bold mb-4">Monthly Attendance</h1>
     
     {employee && (
        <div className="mb-6 border rounded-lg shadow-sm p-4 bg-gray-50">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <p><span className="font-semibold">Name:</span> {employee.employeeName}</p>
            <p><span className="font-semibold">Code:</span> {employee.employeeCode}</p>
            <p><span className="font-semibold">Branch:</span> {employee.branch}</p>
            <p><span className="font-semibold">Status:</span> {employee.employeeCurrentStatus}</p>
          </div>
        </div>
      )}
      {/* Attendance grid */}
      <div className="grid grid-cols-7 gap-4">
        {calendarData.map((day, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-3 shadow-sm hover:shadow-md transition ${
              !day.inTime && !day.outTime ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <p className="font-semibold">{day.crtDate}</p>
            <p className="text-sm text-gray-600">In: {day.inTime || "—"}</p>
            <p className="text-sm text-gray-600">Out: {day.outTime || "—"}</p>
          </div>
        ))}
         </div>
    </div>
  );
}

export default App;
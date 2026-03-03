import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState([])
  const dynamicYear = new Date().getFullYear()
  
  const dynamicMonth = (new Date().getMonth() + 1)
  
  const [year, setYear] = useState(dynamicYear)
  const [month, setMonth] = useState(dynamicMonth)

  const getPost = async () => {
  const response = await fetch('http://localhost:3000/getMonthlyAttendance', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year: String(year), month: String(month).padStart(2,'0'), pageNo: '1', limit: '10' })

  })
  return await response.json()
}
  useEffect(() => {
    getPost(year,month).then((e) => {
      setData(e.data || [])   // safely handle response
    })
  }, [year,month])

  let noOfDaysMonth = new Date(year, month, 0).getDate()
  
  return (
    <div>
      {/* Dropdowns */}
      <div className="flex justify-center gap-4 mb-4">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border px-2 py-1"
        >
          {/* Example: last 5 years */}
          {Array.from({ length: 5 }, (_, i) => dynamicYear - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth((e.target.value))}
          className="border px-2 py-1"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m, i) => (
            <option key={i + 1} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>
     
      <h1 className="text-2xl text-center mb-4">Attendance Report</h1>
      {data.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-400 mx-auto">
          <thead className="bg-blue-900 text-white text-xs">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Sl. No</th>
              <th className="border border-gray-400 px-4 py-2">Employee Name</th>
              <th className="border border-gray-400 px-4 py-2">Employee Code</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Location</th>
              <th className="border border-gray-400 px-4 py-2">Branch</th>

              {Array.from({ length: noOfDaysMonth }, (_, i) => 
                (<th className="border border-gray-400 px-4 py-2"  key={i}>{i + 1}</th>)
                )}

            </tr>
          </thead>
          <tbody className="text-xs">
            {data.map((e, i) => (
              <tr key={i}>
                <td className="border border-gray-400 px-4 py-2">{e.slno}</td>
                <td className="border border-gray-400 px-4 py-2">{e.employeeName}</td>
                <td className="border border-gray-400 px-4 py-2">{e.employeeCode}</td>
                <td className="border border-gray-400 px-4 py-2">{e.employeeCurrentStatus}</td>
                <td className="border border-gray-400 px-4 py-2">{e.location}</td>
                <td className="border border-gray-400 px-4 py-2">{e.branch}</td>

                {/* Example: render attendance per day */}
                {e.app?.map((day, idx) => (
                  <td key={idx} className="border border-gray-400 px-2 py-1">
                    {day.intime ? `${day.intime} - ${day.outTime}` : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No data found</p>
      )}
    </div>
  )
}
export default App
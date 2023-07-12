import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ExamAttendanceTable from '../components/exam_attendance_table';
import AttendanceSummary from '../components/attendance_summary';

function createData(name, index, attendance, paperCollected) {
  return { name, index, attendance, paperCollected };
}

const data = [
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Dhammika Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Dhammika Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Dhammika Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Dhammika Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
];

function getTotalCount() {
    return data.length;
}

function getPresentCount() {
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.attendance !== "" && row.attendance !== null) {
            result = result + 1;
        }
    }
    return result;
}

const Report = () => {
    // not working now without backend
    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('attendance/exams/report')
    //         const json = await response.json;
    //         setData(json);
    //     }
    //     fetchData()
    // }, [])

  return (
    <Box>
        <h1>Attendance Monitoring</h1>
        
        <Link to="/">Back</Link> {/* need to change link to correct page */}
        <AttendanceSummary totalCount={getTotalCount()} presentCount={getPresentCount()}/>
        <ExamAttendanceTable data={data}/>
        <Link to="/start-attend">Start Attending</Link> {/* add link to attendance marking page */}
    </Box>
  );
}

export default Report;

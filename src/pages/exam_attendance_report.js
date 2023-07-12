import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import ExamAttendanceTable from '../components/exam_attendance_table';
import AttendanceSummary from '../components/attendance_summary';

function createData(name, index, attendance, paperCollected) {
  return { name, index, attendance, paperCollected };
}

const data = [
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Pramila Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Pramila Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Pramila Perera', "CS1456", "", "23.07.2023"),
  createData('Kamal Induwara', "CS1456", "", "23.07.2023"),
  createData('Kasun Kasun', "CS1456", "23.07.2023", ""),
  createData('Nimal Sirisena', "CS1456", "23.07.2023", ""),
  createData('Pramila Perera', "CS1456", "", "23.07.2023"),
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
  //const theme = useTheme();
  return (
    <Box sx={{ margin: '2rem', padding: '1rem' }}>
        <Typography variant="h1" component="h1" align="center" gutterBottom color="#0170D6">
                Attendance Monitoring
            </Typography>
            <IconButton aria-label="delete">
              <ArrowBackIosIcon />
            </IconButton>
        <AttendanceSummary totalCount={getTotalCount()} presentCount={getPresentCount()}/>
        <ExamAttendanceTable data={data}/>
        <Button
          variant="contained"
          sx={{
            margin: "80px  0 20px 0",
            width: "344px",
            height: "41px",
          }}
        >
          Start Attending
        </Button>
    </Box>
  );
}

export default Report;

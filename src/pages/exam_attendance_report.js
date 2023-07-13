import { Box, Typography, Button, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
  return (
    <Box sx={{ margin: '2rem', padding: '1rem' }}>
      
      <IconButton aria-label="delete">
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h1" component="h1" align="center" gutterBottom color="#0170D6">
        Attendance Monitoring
      </Typography>  
      <Box
        display="flex"
        justifyContent="right"
        alignItems="right"
      >
        <AttendanceSummary totalCount={getTotalCount()} presentCount={getPresentCount()}/>
      </Box>
      <ExamAttendanceTable data={data}/>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          sx={{
            margin: "40px  0 20px 0",
            width: "300px",
            height: "40px",
          }}
        >
          Start Attending
        </Button>
      </Box>
    </Box>
  );
}

export default Report;

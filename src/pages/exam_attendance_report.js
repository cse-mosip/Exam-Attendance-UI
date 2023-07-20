import { Box, Typography, Button, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExamAttendanceTable from '../components/exam_attendance_table';
import AttendanceSummary from '../components/attendance_summary';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from 'react';

function getTotalCount(data) {
    return data.length;
}

function getPresentCount(data) { 
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.present) {
            result = result + 1;
        }
    }
    return result;
}

const Report = () => {
  const navigate = useNavigate();
  const { authFetch } = useAppContext();
  const [fetchAttendanceError, setFetchAttendanceError] = useState({
    isError: false,
    message: "",
  });
  const [attendance, setAttendance] = useState([]);

  const fetchExamsSchedule = async () => {

    try {
      const response = await authFetch.get("/admin/exam-attendance/23", {});
      setAttendance(response.data.data);
    } catch (error) {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      setFetchAttendanceError({ isError: true, message: errorMessage });
      //should call error toast after implementing
    }
  };

  useEffect(() => {
    fetchExamsSchedule();
  }, []);
  return (
    <Box>
      <Box sx={{ margin: '1rem', padding: '1rem' }}>
        <Box display="flex" alignItems="center">
          <Box>
            <IconButton aria-label="delete" onClick={() => { navigate("/schedule") }}>
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h1" component="h1" gutterBottom color="#0170D6">
              Attendance Monitoring
            </Typography>
            <Typography variant="h4" component="h1" align="center" gutterBottom color="#0170D6">
              Professional Practice - CS1456 : 12/07/2023
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="right"
          alignItems="right"
        >
          <AttendanceSummary totalCount={getTotalCount(attendance)} presentCount={getPresentCount(attendance)}/>
        </Box>
        <ExamAttendanceTable data={attendance}/>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{
              margin: "20px  0 10px 0",
              width: "300px",
              height: "40px",
            }}
            onClick = {()=>{navigate("/attendance-marking")}}
          >
            Start Attending
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Report;

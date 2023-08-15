import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ExamAttendanceTable from "../components/exam_attendance_table";
import AttendanceSummary from "../components/attendance_summary";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const { examid } = useParams();
  const { authFetch } = useAppContext();
  const [attendance, setAttendance] = useState([]);
  const [exam, setExam] = useState({});
  const [schedule, setSchedule] = useState();
  const [isLoadingExam, setIsLoadingExam] = useState(false);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [fetchAttendanceError, setFetchAttendanceError] = useState({
    isError: false,
    message: "",
  });
  const [fetchExamError, setFetchExamError] = useState({
    isError: false,
    message: "",
  });

  const fetchExamData = async () => {
    setIsLoadingAttendance(true);
    setIsLoadingExam(true);
    try {
      const response = await authFetch.get(
        `/admin/exam/get-exam/${examid}`,
        {}
      );
      setExam(response.data.data.course);
      const startTime = response.data.data.startTime;
      setSchedule(startTime.split("T")[0]);
      setIsLoadingExam(false);

      try {
        const response = await authFetch.get(
          `/admin/exam-attendance/${examid}`,
          {}
        );
        setAttendance(response.data.data);
        setIsLoadingAttendance(false);
      } catch (error) {
        let errorMessage = error.message;
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        setFetchAttendanceError({ isError: true, message: errorMessage });
        //should call error toast after implementing
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      setFetchExamError({ isError: true, message: errorMessage });
      //should call error toast after implementing
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);
  return (
    <Box>
      <Box sx={{ margin: "1rem", padding: "1rem" }}>
        <Box display="flex" alignItems="center">
          <Box>
            <IconButton
              aria-label="delete"
              onClick={() => {
                navigate("/");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              color="#0170D6"
            >
              Attendance Monitoring
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              color="#0170D6"
            >
              {isLoadingExam ? (
                <CircularProgress />
              ) : (
                `${exam.moduleName} - ${exam.moduleCode} : ${schedule}`
              )}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="right" alignItems="right">
          <AttendanceSummary
            totalCount={getTotalCount(attendance)}
            presentCount={getPresentCount(attendance)}
            isLoading={isLoadingAttendance}
          />
        </Box>
        <ExamAttendanceTable
          data={attendance}
          isLoading={isLoadingAttendance}
          isFetchError={fetchAttendanceError}
        />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            sx={{
              margin: "20px  0 10px 0",
              width: "300px",
              height: "40px",
            }}
            onClick={() => {
              navigate("/attendance-marking", {
                state:{
                  examId:examid
                }
              });
            }}
          >
            Start Attending
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Report;

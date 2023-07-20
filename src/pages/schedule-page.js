import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { CircularProgress, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/appContext";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </Box>
    );
}

const columns = [
  { id: "module", label: "Module" },
  { id: "moduleCode", label: "Module Code" },
  { id: "hall", label: "Hall" },
  { id: "studentCount", label: "Student Count" },
  { id: "time", label: "Time" },
];

export default function SchedulePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const { authFetch } = useAppContext();
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [fetchExamsError, setFetchExamsError] = useState({
    isError: false,
    message: "",
  });
  const [exams, setExams] = useState([]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - exams.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTableRowClick = () => {
        navigate("/exam-attendance-report")
    };

  const fetchExamsSchedule = async () => {
    setIsLoadingExams(true);

    try {
      const response = await authFetch.post("/admin/exam/all-exams", {});
      setExams(response.data.data);
      setIsLoadingExams(false);
    } catch (error) {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      setFetchExamsError({ isError: true, message: errorMessage });
      setIsLoadingExams(false);
      //should call error toast after implementing
    }
  };

  useEffect(() => {
    fetchExamsSchedule();
  }, []);

  return (
    <Box sx={{ margin: "2rem", padding: "1rem" }}>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        gutterBottom
        color="#0170D6"
      >
        Exam Schedule Page
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: "4rem" }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Typography variant="h5" component="p">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoadingExams ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "1rem",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : fetchExamsError.isError ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    variant="h5"
                    component="p"
                    align="center"
                    sx={{ padding: "1rem" }}
                  >
                    {fetchExamsError.message}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : exams.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    variant="h5"
                    component="p"
                    align="center"
                    sx={{ padding: "1rem" }}
                  >
                    No exams scheduled
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {(rowsPerPage > 0
                ? exams.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : exams
              ).map((row) => (
                <TableRow
                    hover
                    key={row.id}
                    onClick={handleTableRowClick}
                >
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.course.moduleName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.course.moduleCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.hallName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.expectedAttendance}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {
                        //get time in 12 hour format and start time - end time
                        new Date(row.startTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }) +
                          " - " +
                          new Date(row.endTime).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 47 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
                <TablePagination
                    colSpan={3}
                    count={exams.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    labelRowsPerPage={<Typography>Rows per Page: </Typography>}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

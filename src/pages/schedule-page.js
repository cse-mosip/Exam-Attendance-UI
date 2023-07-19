import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import { CircularProgress, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <Typography>{page <= 0 ? "" : page}</Typography>
      </IconButton>
      <IconButton disabled={true} aria-label="current page">
        <Typography>{page + 1}</Typography>
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <Typography>
          {page >= Math.ceil(count / rowsPerPage) - 1 ? "" : page + 2}
        </Typography>
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

const rowsPerPage = 7;

export default function SchedulePage() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { fetchExamsSchedule, exams, isLoading } = useAppContext();
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - exams.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleTableRowClick = () => {
    navigate("/exam-attendance-report");
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
          {isLoading ? (
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
                <TableRow key={row.id} onClick={handleTableRowClick}>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.module}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.moduleCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.hall}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.studentCount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {row.time}
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
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

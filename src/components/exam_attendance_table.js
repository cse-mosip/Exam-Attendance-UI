import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';
import { CircularProgress, IconButton, TableFooter, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


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
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
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
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

const ExamAttendanceTable = (props) => {
  const rows = props.data;
  const isFetchError = props.isFetchError;
  const isLoading = props.isLoading;
  const [page, setpage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setpage(0);
    }
  
    function handleChangePage(event, newpage) {
        setpage(newpage);
    }

    return (
        <Paper>
            <TableContainer component={Paper} sx={{ marginTop: '2rem', padding: 0}}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><Typography variant="h5" component="p">Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h5" component="p">Index Number</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h5" component="p">Attendance</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h5" component="p">Paper Collected</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading ? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4}>
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
                    ) : isFetchError.isError? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Typography
                              variant="h5"
                              component="p"
                              align="center"
                              sx={{ padding: "1rem" }}
                            >
                            {isFetchError.message}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ): rows.length === 0 ? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Typography
                              variant="h5"
                              component="p"
                              align="center"
                              sx={{ padding: "1rem" }}
                            >
                              No students were registered for this exam.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )
                    :(
                      <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.id} >
                                <TableCell component="th" scope="row"><Typography variant="body1" component="p">{row.student_name}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="body1" component="p">{row.index_no}</Typography></TableCell>
                                <TableCell align="center">
                                  <Typography variant="body1" component="p">
                                    {row.present ? row.marked_time : "-"}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body1" component="p">
                                    {row.validated ? row.validated_time : "-"}
                                  </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 47 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                    )}
                    <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ExamAttendanceTable;

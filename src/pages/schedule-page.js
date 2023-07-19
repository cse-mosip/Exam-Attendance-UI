import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { Typography } from '@mui/material';
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
    { id: 'module', label: 'Module' },
    { id: 'moduleCode', label: 'Module Code' },
    { id: 'hall', label: 'Hall' },
    { id: 'studentCount', label: 'Student Count' },
    { id: 'time', label: 'Time' },
];

const data = [
    { id: 1, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'A101', studentCount: '50 users', time: '9:00 AM - 10:00 AM' },
    { id: 2, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 3, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 4, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 5, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 6, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 7, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 8, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 9, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 10, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 11, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 12, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 13, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 14, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 15, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
    { id: 16, module: 'Professional Practice', moduleCode: 'CS1456', hall: 'B202', studentCount: '40 users', time: '10:30 AM - 11:30 AM' },
];

export default function SchedulePage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate()
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTableRowClick = () => {
      navigate("/exam-attendance-report")
    }

    return (
        <Box sx={{ margin: '2rem', padding: '1rem' }}>
            <Typography variant="h1" component="h1" align="center" gutterBottom color="#0170D6">
                Exam Schedule
            </Typography>

            <TableContainer component={Paper} sx={{ marginTop: '4rem' }}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}><Typography variant="h5" component="p">{column.label}</Typography></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row) => (
                            <TableRow key={row.id} onClick={handleTableRowClick}>
                                <TableCell><Typography variant="body1" component="p">{row.module}</Typography></TableCell>
                                <TableCell><Typography variant="body1" component="p">{row.moduleCode}</Typography></TableCell>
                                <TableCell><Typography variant="body1" component="p">{row.hall}</Typography></TableCell>
                                <TableCell><Typography variant="body1" component="p">{row.studentCount}</Typography></TableCell>
                                <TableCell><Typography variant="body1" component="p">{row.time}</Typography></TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 47 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={5}
                                count={data.length}
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
};

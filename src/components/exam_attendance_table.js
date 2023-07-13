import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';
import { IconButton, TableFooter, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const rowperpage = 5;

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'index', label: 'Index No' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'collected', label: 'Paper Collected' },
];

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event,
    ) => {
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

const ExamAttendanceTable = (props) => {
    const rows = props.data;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowperpage - rows.length) : 0;
    const [page, setpage] = useState(0);
  
    function handleChangePage(event, newpage) {
        setpage(newpage);
    }

    return (
        <Paper>
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
                        {(rowperpage > 0
                            ? rows.slice(page * rowperpage, page * rowperpage + rowperpage)
                            : rows
                        ).map((row, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell><Typography variant="body1" component="p">{row.name}</Typography></TableCell>
                                    <TableCell><Typography variant="body1" component="p">{row.index}</Typography></TableCell>
                                    <TableCell><Typography variant="body1" component="p">{row.attendance}</Typography></TableCell>
                                    <TableCell><Typography variant="body1" component="p">{row.paperCollected}</Typography></TableCell>
                                </TableRow>
                            )
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 47 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={4}
                                count={rows.length}
                                rowsPerPage={rowperpage}
                                page={page}
                                onPageChange={handleChangePage}
                                ActionsComponent={TablePaginationActions}
                                labelRowsPerPage=''
                                rowsPerPageOptions={[]}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ExamAttendanceTable;

import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';

const rowperpage = 10;

const ExamAttendanceTable = (props) => {
    const rows = props.data;
    const [page, setpage] = useState(0);
  
    function handleChangePage(event, newpage) {
        setpage(newpage);
    }

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Index No</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Paper Collected</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows
                        .slice(page * rowperpage, page * rowperpage + rowperpage)
                        .map((row, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.index}</TableCell>
                                    <TableCell>{row.attendance}</TableCell>
                                    <TableCell>{row.paperCollected}</TableCell>
                                </TableRow>
                            )
                        })}
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                rowsPerPage={rowperpage}
                page={page}
                count={rows.length}
                onPageChange={handleChangePage}
            />
        </Paper>
    )
}

export default ExamAttendanceTable;

import { Typography, Box } from '@mui/material';

const AttendanceSummary = (props) => {
    const totalCount = props.totalCount;
    const presentCount = props.presentCount;
    const percentage = totalCount > 0 ? presentCount / totalCount : "-";
    return (
        <Box>
            <Typography>Total: {presentCount} / {totalCount}</Typography>
            <Typography>Percentage: {percentage}</Typography>
        </Box>
    )
}

export default AttendanceSummary;

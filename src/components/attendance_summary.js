import { Box, Chip } from '@mui/material';
import { Stack } from '@mui/system';

const AttendanceSummary = (props) => {
    const isLoading = props.isLoading;
    const totalCount = props.totalCount;
    const presentCount = props.presentCount;
    const percentage = totalCount > 0 ? (presentCount / totalCount * 100).toFixed(2) : "-";

    return (
        <Box>
            <Stack direction="row" spacing={1}>
                <Chip label={isLoading? "Total: -" : `Total: ${presentCount} / ${totalCount}`} />
                <Chip label={isLoading? "Percentage: -" : `Percentage: ${percentage}%`} />
            </Stack>
        </Box>
    )
}

export default AttendanceSummary;

import { Box, Chip } from '@mui/material';
import { Stack } from '@mui/system';

const AttendanceSummary = (props) => {
    const totalCount = props.totalCount;
    const presentCount = props.presentCount;
    const percentage = totalCount > 0 ? presentCount / totalCount : "-";

    return (
        <Box>
            <Stack direction="row" spacing={1}>
                <Chip label={`Total: ${presentCount} / ${totalCount}`} />
                <Chip label={`Percentage: ${percentage}`} />
            </Stack>
        </Box>
    )
}

export default AttendanceSummary;

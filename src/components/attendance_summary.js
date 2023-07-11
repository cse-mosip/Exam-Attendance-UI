const AttendanceSummary = (props) => {
    const totalCount = props.totalCount;
    const presentCount = props.presentCount;
    const percentage = totalCount > 0 ? presentCount / totalCount : "-";
    return (
        <div>
            <p>Total: {presentCount} / {totalCount}</p>
            <p>Percentage: {percentage}</p>
        </div>
    )
}

export default AttendanceSummary;
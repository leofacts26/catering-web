import moment from 'moment';

const formatTime = (time) => {
    return moment(time, 'HH:mm:ss').format('hA').toLowerCase();
};

const TimeRange = ({ startTime, endTime }) => {
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    return <span>{formattedStartTime} - {formattedEndTime}</span>
}

export default TimeRange;

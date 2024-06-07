import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // MUI calendar icon
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '@/app/features/user/cateringFilterSlice';
import moment from 'moment';

const DatePickerSearchTiffin = () => {
    const dispatch = useDispatch();

    const { startDate, endDate } = useSelector((state) => state.cateringFilter);

    const [showPicker, setShowPicker] = useState(false);
    const selectedRange = {
        startDate,
        endDate,
        key: 'selection',
    };

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };


    const pickerRef = useRef();
    const formatDate = (date) => {
        if (!isValidDate(date)) return 'Invalid Date';
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatSelectedRange = (range) => {
        const { startDate, endDate } = range;
        const formattedStart = formatDate(moment(startDate).toDate()).toLowerCase(); // Capitalize start date
        const formattedEnd = formatDate(moment(endDate).toDate()).toLowerCase(); // Capitalize end date
        return `${formattedStart} - ${formattedEnd}`;
    };

    const handleSelect = (ranges) => {
        dispatch(setDateRange(ranges.selection));
    };

    useEffect(() => {
        if (startDate !== endDate) {
            setShowPicker(false);
        }
    }, [startDate, endDate]);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const rangeColors = ['#d9822b', '#d9822b', '#d9822b'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ maxWidth: '100%', position: 'relative' }} ref={pickerRef}>
            <Button
                variant="outlined"
                className='search-btn-tiffin'
                style={{
                    borderRadius: '0px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#d9822b',
                    width: '100%',
                    padding: '11px 10px',
                    border: '2px solid #d9822b',
                    textTransform: 'capitalize',
                }}
                startIcon={<CalendarTodayIcon />}
                onClick={togglePicker}
            >
                {formatSelectedRange(selectedRange)}
            </Button>
            {showPicker && (
                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', zIndex: 9999 }}>
                    <DateRangePicker
                        ranges={[selectedRange]}
                        onChange={handleSelect}
                        onClose={togglePicker}
                        rangeColors={rangeColors}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePickerSearchTiffin;

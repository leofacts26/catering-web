import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DatePickerSearchOrange = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const pickerRef = useRef();

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatSelectedRange = (range) => {
        const { startDate, endDate } = range;
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    const handleSelect = (ranges) => {
        setSelectedRange(ranges.selection);
    };

    useEffect(() => {
        if (selectedRange.startDate !== selectedRange.endDate) {
            setShowPicker(false);
        }
      }, [selectedRange]);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const rangeColors = ['#D9822B', '#D9822B', '#D9822B'];

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
            <Button variant="outlined" className='search-btn-orange' style={{
                borderRadius: '10px', fontSize:'14px', fontWeight: 'bold', color: '#D9822B', width: '100%', padding: '13px 5px', border: '2px solid #D9822B',
            }} onClick={togglePicker}>
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

export default DatePickerSearchOrange;

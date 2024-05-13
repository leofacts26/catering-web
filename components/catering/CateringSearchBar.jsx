"use client"
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import DatePickerSearch from '../search/DatePickerSearch';
import Link from 'next/link'
import Stack from '@mui/material/Stack';
// import DatePickerSearchOrange from '../search/DatePickerSearchOrange';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #C33332',
        },
        '&:hover fieldset': {
            border: '2px solid #C33332',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
        '& input::placeholder': {
            fontWeight: '600',
            fontSize: '12px',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '15px',
        padding: '12.9px 0px',
    },
}));

const CssTextFieldRadius = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #C33332',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
        },
        '&:hover fieldset': {
            border: '2px solid #C33332',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
        '& input::placeholder': {
            fontWeight: '600',
            fontSize: '12px',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '15px',
        padding: '12.9px 0px'
    },
}));

const CateringSearchBar = () => {
    const [isAdornmentClicked, setIsAdornmentClicked] = useState(false);

    return (
        <>
            <form>
                <Stack className='search-bg' direction={{ xs: 'column', sm: 'column', md: 'column', lg: "row" }} justifyContent="space-between" spacing={0.2}>
                    <div className='w-100'>
                        <CssTextFieldRadius
                            id="outlined-number"
                            placeholder="Enter your location..."
                            variant="outlined"
                            className='mt-0'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '14px' },
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '0px',
                                    backgroundColor: '#f4f4fc6b'
                                },
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        onClick={() => setIsAdornmentClicked(true)}
                                    >
                                        <MyLocationIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="w-100">
                        <DatePickerSearch />
                    </div>
                    <div className="three w-100">
                        <CssTextField
                            id="outlined-number"
                            placeholder="How many people attending?"
                            variant="outlined"
                            // label="How many people attending?"
                            className='mt-0'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '14px' },
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '0px',
                                    backgroundColor: '#f4f4fc6b',
                                },
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                    >
                                        <GroupAddIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        <Link href="/catering-search">
                            <Button className='red-btn' variant="contained" sx={{
                                boxShadow: 'none',
                                width: '100%', fontWeight: '600', padding: '11px 20px', fontSize: '14px', backgroundColor: '#C33332', textTransform: 'capitalize', '&:hover': {
                                    backgroundColor: '#C33332',
                                },
                            }}>
                                <SearchIcon style={{ marginRight: '5px', fontSize: '18px' }} /> Search
                            </Button>
                        </Link>
                    </div>
                </Stack>
            </form >
        </>
    )
}

export default CateringSearchBar;

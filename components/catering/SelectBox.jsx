"use client"
import { useState } from "react";
import { Select, MenuItem, FormControl, Stack, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactSelectRed from "./ReactSelectRed";


const CssSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #C33332',
        },
        '&:hover fieldset': {
            border: '2px solid #C33332',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
            outline: 'none',
        },
    },
    '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
    },
    '& input': {
        border: '2px solid #C33332',
        fontSize: '16px',
        padding: '0px 20px',
    },

}));




const SelectBox = ({ catering }) => {

    const [sortBy, setSortBy] = useState('');

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };


    return (
        <>
            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ margin: '10px 0px 15px 0px' }}>
              <ReactSelectRed text1="Sort by" /> 
                <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2}>
                    <Button size="small" className={'btn-pill btn-pill-active'}>All Caterers</Button>
                    <Button size="small" className="btn-pill" style={{ color: '#726e6e', fontSize: '12px' }}>Branded Caterers</Button>
                    <Button size="small" className="btn-pill" style={{ color: '#726e6e', fontSize: '12px' }}>Popular Caterers</Button>
                </Stack>
            </Stack>

        </>
    )
}

export default SelectBox;

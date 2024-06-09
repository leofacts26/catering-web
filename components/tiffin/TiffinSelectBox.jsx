"use client"
import { useState } from "react";
import { Select, MenuItem, FormControl, Stack, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactSelectTiffin from "./ReactSelectTiffin";


const TiffinSelectBox = ({ catering }) => {

    const [sortBy, setSortBy] = useState('');

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };


    return (
        <>
            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ margin: '10px 0px 15px 0px' }}>
              <ReactSelectTiffin text1="Sort by" /> 
              <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ marginTop: '15px' }}>
                    <Button size="small" className={'btn-pill btn-pill-active-catering'}>All Caterers</Button>
                    <Button size="small" className="btn-pill" style={{ color: '#d9822b', fontSize: '12px' }}>Branded Caterers</Button>
                    <Button size="small" className="btn-pill" style={{ color: '#d9822b', fontSize: '12px' }}>Popular Caterers</Button>
                </Stack>
            </Stack>

        </>
    )
}

export default TiffinSelectBox;

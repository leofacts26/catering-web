"use client"
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import FilterSkeleton from '../FilterSkeleton';
import TiffinPriceRanges from './TiffinPriceRanges';
import TiffinFoodTypes from './TiffinFoodTypes';
import TiffinMealtypes from './TiffinMealtypes';
import TiffinServiceTypes from './TiffinServiceTypes';
import TiffinkitchenTypes from './TiffinkitchenTypes';
import TiffinRatingCount from './TiffinRatingCount';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #e0e3e7',
        },
        '&:hover fieldset': {
            border: '2px solid #e0e3e7',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '16px',
        padding: '10px 20px',
    },
}));

const TiffinFilters = () => {

    return (
        <>
            <Box sx={{ marginBottom: '10px' }} className="filter-shadow tiffin-filter">
                <Card>
                    <CardContent>
                        <h3 className='filter-text'>Tiffin Filter:</h3>
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Your Budget (Per Plate Cost):</h3>
                        <p style={{ margin: '10px 0px', fontSize: '16px' }} className='select-price-range'>Select Price Range</p>
                        <TiffinPriceRanges />
                    </CardContent>
                    <Divider />


                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Food Type:</h3>
                        <TiffinFoodTypes />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Tiffin Rating:</h3>
                        <TiffinRatingCount />
                    </CardContent>
                    <Divider />


                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Meal Time:</h3>
                        <TiffinMealtypes />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Service Type:</h3>
                        <TiffinServiceTypes />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Kitchen Type:</h3>
                        <TiffinkitchenTypes />
                    </CardContent>
                    <Divider />



                </Card>
            </Box>
        </>
    )
}

export default TiffinFilters
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

const Filters = ({
    getTiffinPriceRanges,
    getTiffinFoodTypes,
    getTiffinMealTypes,
    getTiffinServiceTypes,
    getTiffinKitchenTypes
}) => {
    return (
        <>
            <Box sx={{ marginBottom: '10px' }} className="filter-shadow">
                <Card>
                    <CardContent>
                        <h3 className='filter-text'>Filter by:</h3>
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Your Budget (Per Plate Cost):</h3>
                        <p style={{ margin: '10px 0px', fontSize: '16px' }} className='select-price-range'>Select Price Range</p>

                        {getTiffinPriceRanges?.length > 0 ? (
                            getTiffinPriceRanges?.map((price) => (
                                <Stack className='text-muted' key={price?.id} direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                                    <Checkbox {...label} size="small" className='checkbox-color'
                                        checked={price.selectedweb === 1}
                                    // onChange={() => onHandlePriceRanges(price)}
                                    />
                                    <span className='checkbox-text'>{`Rs. ${price?.start_price} - Rs. ${price?.end_price}`}</span>
                                </Stack>
                            ))
                        ) : (
                            <FilterSkeleton />
                        )}
                    </CardContent>
                    <Divider />


                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Food Type:</h3>
                        {getTiffinFoodTypes?.length > 0 ? (
                            getTiffinFoodTypes?.map((foodType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={foodType?.id}>
                                        <Checkbox {...label}
                                            size="small" className='checkbox-color'
                                            checked={foodType?.selectedweb === 1} onChange={() => onHandleFoodFilter(foodType)} />
                                        <span className='checkbox-text'>{foodType?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Meal Time:</h3>
                        {getTiffinMealTypes?.length > 0 ? (
                            getTiffinMealTypes?.map((mealtype) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={mealtype?.id}>
                                        <Checkbox {...label}
                                            size="small" className='checkbox-color'
                                            checked={mealtype?.selectedweb === 1} onChange={() => onHandleFoodFilter(mealtype)} />
                                        <span className='checkbox-text'>{mealtype?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Service Type:</h3>
                        {getTiffinServiceTypes?.length > 0 ? (
                            getTiffinServiceTypes?.map((getServiceType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getServiceType?.id}>
                                        <Checkbox {...label}
                                            size="small"
                                            className='checkbox-color'
                                            checked={getServiceType?.selected === 1}
                                            onChange={() => onHandleServiceFilter(getServiceType)}
                                        />
                                        <span className='checkbox-text'>{getServiceType?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Kitchen Type:</h3>
                        {getTiffinKitchenTypes?.length > 0 ? (
                            getTiffinKitchenTypes?.map((getKitchenType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getKitchenType?.id}>
                                        <Checkbox {...label}
                                            size="small"
                                            className='checkbox-color'
                                            checked={getKitchenType?.selected === 1}
                                            onChange={() => onHandleServiceFilter(getKitchenType)}
                                        />
                                        <span className='checkbox-text'>{getKitchenType?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>
                    <Divider />



                </Card>
            </Box>
        </>
    )
}

export default Filters
"use client"
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CaterPriceRanges from './CaterPriceRanges';
import CaterFoodTypes from './CaterFoodTypes';
import CaterCuisineFilter from './CaterCuisineFilter';
import CaterOccaionTypes from './CaterOccaionTypes';
import CaterServiceTypes from './CaterServiceTypes';
import CaterServingTypes from './CaterServingTypes';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/app/features/user/cateringFilterSlice';
import toast from 'react-hot-toast';
import CaterHeadCount from './CaterHeadCount';
import CaterRatingCount from './CaterRatingCount';


const Filters = () => {



    return (
        <>
            <Box sx={{ marginBottom: '10px' }} className="filter-shadow catering-filter">
                <Card>
                    <CardContent>
                        <h3 onClick={() => clearLocalFilter()} className='filter-text'>Filter by:</h3>
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Your Budget (Per Plate Cost):</h3>
                        <p style={{ margin: '10px 0px', fontSize: '16px' }} className='select-price-range'>Select Price Range</p>
                        <CaterPriceRanges />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Food Type:</h3>
                        <CaterFoodTypes />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Head Count:</h3>
                        <CaterHeadCount />
                    </CardContent>
                    <Divider />


                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Catering Rating:</h3>
                        <CaterRatingCount />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text mb-2'>Choose Cuisine</h3>
                        <CaterCuisineFilter />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Occasions:</h3>
                        <CaterOccaionTypes />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Service Type:</h3>
                        <CaterServiceTypes />
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Cater Service:</h3>
                        <CaterServingTypes />
                    </CardContent>

                </Card>
            </Box>
        </>
    )
}

export default Filters
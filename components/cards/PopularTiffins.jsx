"use client"
import React, { useEffect } from 'react'
import popularcaters from '../../data/popularcaters.json'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularCaterers, fetchPopularTiffins } from '@/app/features/user/homeSlice';
import PopularCaterersShimmer from '../shimmer/PopularCaterersShimmer';

const PopularTiffins = () => {

    const { popularTiffins, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPopularTiffins())
    }, [])

    // console.log(popularTiffins, "popularTiffins"); 
    // popularTiffinssShimmer 
    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>

                        {isLoading ? (
                            <popularTiffinssShimmer count={popularTiffins?.length} />
                        ) : (
                            <>
                                {popularTiffins?.length > 0 && popularTiffins?.map((cater, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} key={cater?.vendor_id}>
                                        <Box>
                                            <img src={cater.gallery_images["vendor-brand-logo"][0].image_name[0]?.original} alt={cater?.catering_service_name} className="img-fluid popular-caterers-img image-shadow" />
                                            <h4 className='popular-caterers-heading'>{cater?.catering_service_name}</h4>
                                            <p className='popular-caterers-des'> {cater?.street_name} {cater?.area} </p>
                                        </Box>
                                    </Grid>
                                ))}
                            </>
                        )
                        }
                    </Grid>
                </Box>
            </Container >
        </>
    )
}

export default PopularTiffins
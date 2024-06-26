"use client"
import React, { useEffect } from 'react'
import popularcaters from '../../data/popularcaters.json'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularCaterers } from '@/app/features/user/homeSlice';
import PopularCaterersShimmer from '../shimmer/PopularCaterersShimmer';
import Heading from '../Heading';
import {  setSubscriptionFilter } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';

const PopularCaters = ({ title }) => {
    const router = useRouter()

    const { popularCaterer, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()
    const { userDetails } = useSelector((state) => state.user)

    // console.log(popularCaterer, "popularCaterer"); 
    const data = {
        latitude: userDetails?.latitude,
        longitude: userDetails?.longitude
      }

    useEffect(() => {
        dispatch(fetchPopularCaterers(data))
    }, [])

    // console.log(popularCaterer, "popularCaterer"); 
    // PopularCaterersShimmer 


    const handleImageClick = () => {
        const id = "2";
        dispatch(setSubscriptionFilter(id))
        const url = `/catering-search`;
        router.push(url);
    }; 



    return (
        <>
            {popularCaterer?.length > 0 && <Heading title={title} center subHeading />}
            <Container maxWidth="lg">
                {/* {popularCaterer?.length > 0 && <Heading title={title} center subHeading />} */}
                <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>

                        {isLoading ? (
                            <PopularCaterersShimmer count={popularCaterer?.length} />
                        ) : (
                            <>
                                {popularCaterer?.length > 0 && popularCaterer?.map((cater, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} key={cater?.vendor_id}>
                                        <Box onClick={() => handleImageClick()}>
                                            <img src={cater.gallery_images["vendor-brand-logo"][0].image_name[0]?.original} alt={cater?.catering_service_name} className="img-fluid popular-caterers-img image-shadow cursor-pointer" />
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

export default PopularCaters
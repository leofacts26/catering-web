"use client"
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import explorecaters from '../../data/explorecaterers.json'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCities, fetchHomepageOccasions } from '@/app/features/user/homeSlice';
import ExploreCaterersShimmer from '../shimmer/ExploreCaterersShimmer';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';
import { setlLocationValuesGlobal } from '@/app/features/user/globalNavSlice';
import { fetchtiffinSearchCards } from '@/app/features/tiffin/tiffinFilterSlice';
import { useRouter } from 'next/navigation';
import { fetchCateringSearchCards } from '@/app/features/user/cateringFilterSlice';


const ExploreCaters = () => {
    // const { isPlacePredictionsLoading, placePredictions, getPlacePredictions, selectLocation } = useGetLocationResults()
    const router = useRouter()

    const { getAllCities, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCities())
    }, [])

    const onHandleCityFilter = (explorecater) => {
        const { latitude, longitude, name: city } = explorecater;
        dispatch(setlLocationValuesGlobal({ is_city_search: 1, latitude, longitude, city: { long_name: city } }));
        dispatch(fetchCateringSearchCards());
        const url = `/catering-search`;
        router.push(url);
    }

    // console.log(getAllCities, "getAllCities");
    // console.log(getAllCities, "getAllCities"); 

    return (
        <>

            <Container maxWidth="lg" id="location">
                <Box sx={{ flexGrow: 1 }} className="mb-4" style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>
                        {isLoading ? (
                            <ExploreCaterersShimmer count={6} />
                        ) : (
                            getAllCities?.map((explorecater) => (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={explorecater?.city_id} >
                                    <Box sx={{ position: 'relative' }} className="image-shadow explore-caters-box cursor-pointer" onClick={() => onHandleCityFilter(explorecater)} >
                                        <div className="explore-shadow"></div>
                                        <img src={explorecater?.file_name?.large ? explorecater?.file_name?.large : '/img/no-image.jpg'} alt={explorecater?.city_name} className="img-fluid w-100 explore-caters-img cursor-pointer" />
                                        <Box sx={{ position: 'absolute', top: '4%', right: '4%' }}>
                                            <h4 className='explore-caters-heading'>{explorecater?.name}</h4>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default ExploreCaters
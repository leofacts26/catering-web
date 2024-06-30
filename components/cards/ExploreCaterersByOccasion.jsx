"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import caterersbyoccasions from '../../data/caterersbyoccasion.json'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllCities, fetchHomepageOccasions } from '@/app/features/user/homeSlice';
import ExploreCaterersShimmer from '../shimmer/ExploreCaterersShimmer';
import ExploreoccasionsShimmer from '../shimmer/ExploreOccasionsShimmer';
import { useRouter } from 'next/navigation';
import { setOccasionTypes } from '@/app/features/user/cateringFilterSlice';

const ExploreCaterersByOccasion = () => {
    const { homeOccasions, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchHomepageOccasions())
    }, [])

    // console.log(homeOccasions, "homeOccasions");

    const handleImageClick = (occasionId) => {
        dispatch(setOccasionTypes(occasionId));
        const url = `/catering-search`;
        router.push(url);
    }; 


    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>

                        {isLoading ? (
                            <ExploreoccasionsShimmer count={12} />
                        ) : (
                            homeOccasions?.map((caterersbyoccasion) => (
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                    <div className="explore-cator-box" key={caterersbyoccasion?.occasion_id}>
                                        <img onClick={() => handleImageClick(caterersbyoccasion?.occasion_id)} src={caterersbyoccasion.file_name.original} alt={caterersbyoccasion?.occasion_name} className="img-fluid caterers-occasion-img image-shadow" />
                                        <h4 className='text-center caterers-occasion-title'>{caterersbyoccasion?.occasion_name}</h4>
                                    </div>
                                </Grid>
                            ))
                        )
                        }
                    </Grid>
                </Box>
            </Container >
        </>
    )
}

export default ExploreCaterersByOccasion
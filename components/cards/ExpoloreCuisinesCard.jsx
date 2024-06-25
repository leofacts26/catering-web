"use client"
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import explorecuisines from '../../data/explorecuisines.json'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCuisines } from '@/app/features/user/homeSlice';
import { useEffect } from 'react';
import Heading from '../Heading';

const ExpoloreCuisinesCard = () => {


    const { getAllcuisines, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCuisines())
    }, [])

    console.log(getAllcuisines, "getAllcuisines");


    return (
        <>
            {getAllcuisines?.length > 0 && <Heading title="Explore Cuisines" />}
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    {
                        getAllcuisines?.length > 0 && getAllcuisines?.map((explorecuisine, index) => (
                            <Grid item xs={6} sm={3} md={3} lg={2} xl={2} className={`p-0 w-100 first-card`} key={index}>
                                <CardContent key={explorecuisine.id} className='w-100' style={{ padding: '5px 10px' }}>
                                    <Stack direction="row" justifyContent="center" className='explore-cuisine-card border-radius-two w-100'>
                                        <img src={explorecuisine?.file_name?.original ? explorecuisine?.file_name?.original : '/img/no-image.jpg'} alt="" className="img-fluid explore-cuisine-img image-shadow" />
                                    </Stack>
                                </CardContent>
                            </Grid>
                        ))
                    }
                </Grid>
                <Stack direction="row" justifyContent="center">
                    <ExpandMoreIcon style={{ fontSize: '55px', color: 'rgb(90 88 88)' }} />
                </Stack>
            </Container >
        </>

    )
}

export default ExpoloreCuisinesCard
"use client"

import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import Subscribe from '@/components/Subscribe';
import CateringSearchBar from '@/components/catering/CateringSearchBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Filters from '@/components/catering/Filters';
import Stack from '@mui/material/Stack';
import SwitchSearchResult from '@/components/catering/SwitchSearchResult';
import { useEffect, useState } from 'react';
import SelectBox from '@/components/catering/SelectBox';
import ListView from '@/components/catering/ListView';
import GridViewList from '@/components/catering/GridView';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCateringCuisines, fetchCateringFoodTypes, fetchCateringSearchCards, fetchCateringServingTypes, fetchOccasionCateringTypes, fetchPriceRanges, fetchServiceTypes } from '@/app/features/user/cateringFilterSlice';

const page = () => {
  const [checked, setChecked] = useState(true);
  const router = useRouter()
  const dispatch = useDispatch()
  const { getCateringSearchCards, getCateringPriceRanges, getCateringFoodTypes, getCateringCuisines, getCateringServiceTypes, getCateringServingTypes, total_count } = useSelector((state) => state.cateringFilter)
  console.log(getCateringSearchCards, "getCateringSearchCards");

  useEffect(() => {
    // Fetch all necessary data
    if (getCateringPriceRanges.length === 0) {
      dispatch(fetchPriceRanges());
    }
    if (getCateringFoodTypes.length === 0) {
      dispatch(fetchCateringFoodTypes());
    }
    if (getCateringCuisines.length === 0) {
      dispatch(fetchCateringCuisines());
    }
    if (getCateringServiceTypes.length === 0) {
      dispatch(fetchServiceTypes());
    }
    if (getCateringServingTypes.length === 0) {
      dispatch(fetchCateringServingTypes());
    }

  }, [dispatch, getCateringPriceRanges.length, getCateringFoodTypes.length, getCateringCuisines.length, getCateringServiceTypes.length, getCateringServingTypes.length]);

  useEffect(() => {
    // Dispatch search cards only if all necessary data is available
    if (getCateringPriceRanges.length > 0 && getCateringFoodTypes.length && getCateringCuisines.length && getCateringServiceTypes.length && getCateringServingTypes.length) {
      dispatch(fetchCateringSearchCards());
    }
  }, [dispatch, getCateringPriceRanges.length, getCateringFoodTypes.length, getCateringCuisines.length, getCateringServiceTypes.length, getCateringServingTypes.length]);



  return (
    <>
      <section className='nav-bg'>
        <Navbar cateringHome />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="md">
            <CateringSearchBar />
          </Container>
        </div>
      </div>
      <Breadcrumb service="Catering Service" title="Search Results" />

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={3} xl={2.8}>
              <div className="position-relative">
                <img src="/img/Search-Result-View-Page-Images/01-map.png" alt="" className="img-fluid" style={{ borderRadius: '5px', marginBottom: '4px' }} />
                <div className="position-absolute map-box">
                  <Button onClick={() => router.push('/catering-search/catering-map')} variant="contained" className='show-on-map' sx={{ backgroundColor: '#C33332', fontSize: '10px', '&:hover': { backgroundColor: '#C33332' } }}>Show on map</Button>
                </div>
              </div>

              <Filters />

            </Grid>
            <Grid item xs={12} md={12} lg={9} xl={9.2}>
              {getCateringSearchCards.length > 0 && <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} justifyContent="space-between" style={{ margin: '0px 0px 0px 0px' }}>
                <h2 className='catering-found'>Chennai: {total_count} Catering service providers found</h2>
                <SwitchSearchResult checked={checked} setChecked={setChecked} />
              </Stack>
              }

              <SelectBox />

              {checked ? <ListView /> : <GridViewList xs={12} sm={6} md={4} lg={4} />}
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Subscribe />
      <Footer />
    </>
  )
}

export default page
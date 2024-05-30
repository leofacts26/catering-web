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
// import useGetPriceRanges from '@/hooks/catering/useGetPriceRanges';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringCuisines, fetchCateringFoodTypes, fetchCateringSearchCards, fetchCateringServingTypes, fetchOccasionCateringTypes, fetchPriceRanges, fetchServiceTypes } from '@/app/features/user/cateringFilterSlice';


const page = () => {
  const router = useRouter(); // Access the router object
  const [checked, setChecked] = useState(true);
  // const { loading, getSearchCards, getPriceRanges, getFoodTypes, getOccasionTypes, getCuisines, getServiceTypes, getServingTypes, occationsCount, isChecked, updatePriceRangesFilter, updateFoodTypeFilter, onShowAllOccasions, fetchSearchCards  } = useGetPriceRanges();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Perform any async tasks here, if needed
        // await fetchSearchCards();
        // router.push('/catering-search'); // Redirect to the specified page
    } catch (error) {
        console.error('Error occurred while processing form submission:', error);
    }
}


const dispatch = useDispatch()
const { getCateringPriceRanges, getCateringFoodTypes, getOccasionCateringTypes, getCateringCuisines, getCateringServiceTypes, getCateringServingTypes, getCateringSearchCards, occasionCount, isLoading } = useSelector((state) => state.cateringFilter)

useEffect(() => {
    dispatch(fetchPriceRanges());
    dispatch(fetchCateringFoodTypes());
    dispatch(fetchOccasionCateringTypes(occasionCount));
    dispatch(fetchCateringCuisines());
    dispatch(fetchServiceTypes());
    dispatch(fetchCateringServingTypes());
    dispatch(fetchCateringSearchCards());
}, []);

// useEffect(() =>{
//   dispatch(fetchOccasionCateringTypes());
//   fetchOccasionCateringTypes()
// }, [occasionCount])

console.log(getCateringPriceRanges, "getCateringPriceRanges");

  return (
    <>
      <section className='nav-bg'>
        <Navbar cateringHome />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="md">
            <CateringSearchBar onHandleSubmit={onHandleSubmit} />
          </Container>
        </div>
      </div>
      <Breadcrumb title="Search Results" />

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={3} xl={2.8}>
              <div className="position-relative">
                <img src="/img/Search-Result-View-Page-Images/01-map.png" alt="" className="img-fluid" style={{ borderRadius: '5px', marginBottom: '4px' }} />
                <div className="position-absolute map-box">
                  <Button variant="contained" className='show-on-map' sx={{ backgroundColor: '#C33332', fontSize: '10px', '&:hover': { backgroundColor: '#C33332' } }}>Show on map</Button>
                </div>
              </div>



              <Filters 
              getPriceRanges={getCateringPriceRanges} 
              getFoodTypes={getCateringFoodTypes} 
              getOccasionTypes={getOccasionCateringTypes} 
              getCuisines={getCateringCuisines} 
              getServiceTypes={getCateringServiceTypes} 
              getServingTypes={getCateringServingTypes} 
              occationsCount={occasionCount} 
              loading={isLoading} 
              fetchOccasionCateringTypes={fetchOccasionCateringTypes}
              // onShowAllOccasions={onShowAllOccasions} 
              // updateFoodTypeFilter={updateFoodTypeFilter} 
              // updatePriceRangesFilter={updatePriceRangesFilter} 
              // isChecked={isChecked} 
              />


            </Grid>
            <Grid item xs={12} md={12} lg={9} xl={9.2}>
              <Stack direction='row' justifyContent="space-between" style={{ margin: '0px 0px 0px 0px' }}>
                <h2 className='catering-found'>Chennai: 78 Catering service providers found</h2>
                <SwitchSearchResult checked={checked} setChecked={setChecked} />
              </Stack>

              <SelectBox />

              {checked ? <ListView loading={isLoading} getSearchCards={getCateringSearchCards} /> : <GridViewList loading={isLoading} getSearchCards={getCateringSearchCards} />}
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
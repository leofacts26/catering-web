"use client"

import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import Subscribe from '@/components/Subscribe';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Filters from '@/components/catering/Filters';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import TiffinSearchBar from '@/components/tiffin/TiffinSearchBar';
import TiffinSwitchSearchResult from '@/components/tiffin/TiffinSwitchSearchResult';
import TiffinSelectBox from '@/components/tiffin/TiffinSelectBox';
import ListViewTiffin from '@/components/tiffin/ListViewTiffin';
import GridViewTiffin from '@/components/tiffin/GridViewTiffin';
import { fetchTiffinFoodTypes, fetchTiffinKitchenTypes, fetchTiffinMealTypes, fetchTiffinPriceRanges, fetchTiffinServiceTypes } from '@/app/features/tiffin/tiffinFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import TiffinFilters from '@/components/tiffin/TiffinFilters';

const page = () => {
  // const { getTiffinPriceRanges, getTiffinFoodTypes, getTiffinMealTypes, getTiffinServiceTypes, getTiffinKitchenTypes, isLoading } = useSelector((state) => state.tiffinFilter)

  const [checked, setChecked] = useState(true);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchTiffinFoodTypes());
  //   dispatch(fetchTiffinMealTypes());
  //   dispatch(fetchTiffinServiceTypes());
  //   dispatch(fetchTiffinKitchenTypes());
  // }, []);


  return (
    <>
      <section className='nav-bg-tiffin'>
        <Navbar cateringHome />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="md">
            <TiffinSearchBar searchLink="/tiffin-search" />
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
                  <Button variant="contained" className='show-on-map' sx={{ backgroundColor: '#d9822b', fontSize: '10px', '&:hover': { backgroundColor: '#d9822b' } }}>Show on map</Button>
                </div>
              </div>
              <TiffinFilters
              // getTiffinPriceRanges={getTiffinPriceRanges}
              // getTiffinFoodTypes={getTiffinFoodTypes}
              // getTiffinMealTypes={getTiffinMealTypes}
              // getTiffinServiceTypes={getTiffinServiceTypes}
              // getTiffinKitchenTypes={getTiffinKitchenTypes}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={9} xl={9.2}>
              <Stack direction='row' justifyContent="space-between" style={{ margin: '0px 0px 0px 0px' }}>
                <h2 className='catering-found'>Chennai: 78 Catering service providers found</h2>
                <TiffinSwitchSearchResult checked={checked} setChecked={setChecked} />
              </Stack>

              <TiffinSelectBox />

              {checked ? <ListViewTiffin /> : <GridViewTiffin />}
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
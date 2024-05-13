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
import { useState } from 'react';
import SelectBox from '@/components/catering/SelectBox';
import ListView from '@/components/catering/ListView';
import GridViewList from '@/components/catering/GridView';

const page = () => {

  const [checked, setChecked] = useState(true);


  return (
    <>
      <section className='nav-bg'>
        <Navbar cateringHome />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="md">
            <CateringSearchBar searchLink="/catering-search" />
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
              <Filters />
            </Grid>
            <Grid item xs={12} md={12} lg={9} xl={9.2}>
              <Stack direction='row' justifyContent="space-between" style={{ margin: '0px 0px 0px 0px' }}>
                <h2 className='catering-found'>Chennai: 78 Catering service providers found</h2>
                <SwitchSearchResult checked={checked} setChecked={setChecked} />
              </Stack>

              <SelectBox />

              {checked ? <ListView /> : <GridViewList />}
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
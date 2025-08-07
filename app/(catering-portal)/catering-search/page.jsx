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
import { useSearchParams } from 'next/navigation';
import SelectBox from '@/components/catering/SelectBox';
import ListView from '@/components/catering/ListView';
import GridViewList from '@/components/catering/GridView';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCateringCuisines, fetchCateringFoodTypes, fetchCateringSearchCards, fetchCateringServingTypes, fetchCaterRatings, fetchHeadCounts, fetchPriceRanges, fetchServiceTypes, setCuisineTypeFilter } from '@/app/features/user/cateringFilterSlice';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';
import { useMediaQuerym, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import useDocumentTitle from '@/components/useDocumentTitle';

const page = () => {
  useDocumentTitle('Caterings & Tiffins');
  const [checked, setChecked] = useState(true);
  const { selectedLocation } = useGetLocationResults()
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { userDetails } = useSelector((state) => state.user)
  const { selectLocation } = useGetLocationResults()
  const { showOnMapLocLat } = useSelector((state) => state.globalnavbar)
  // console.log(showOnMapLocLat, "showOnMapLocLat");

  const router = useRouter()
  const dispatch = useDispatch()
  const { getCateringSearchCards, getCateringPriceRanges, getCateringFoodTypes, getCateringCuisines, getCateringServiceTypes, getCateringRatings, getCateringHeadCount, getCateringServingTypes, total_count } = useSelector((state) => state.cateringFilter)

  const searchParams = useSearchParams();
  const { getOccasionCateringTypes } = useSelector((state) => state.cateringFilter);
  useEffect(() => {
    dispatch(fetchCateringSearchCards());
  }, []);

  // Cuisine force-select logic
  useEffect(() => {
    dispatch(fetchCateringCuisines()).then(() => {
      const cuisineId = searchParams.get('cuisineId');
      const selectAllChildren = searchParams.get('selectAllChildren');
      if (cuisineId && getCateringCuisines?.length) {
        setTimeout(() => {
          if (selectAllChildren === '1') {
            // Select parent and all children
            const updatedCuisines = getCateringCuisines.map(cuisine => {
              if (cuisine.id === cuisineId) {
                return {
                  ...cuisine,
                  selectedweb: 1,
                  children: cuisine.children.map(child => ({ ...child, selectedweb: 1 }))
                };
              } else {
                return {
                  ...cuisine,
                  selectedweb: 0,
                  children: cuisine.children.map(child => ({ ...child, selectedweb: 0 }))
                };
              }
            });
            dispatch(setCuisineTypeFilter({ cuisineId, getCateringCuisines: updatedCuisines, forceSelect: true }));
          } else {
            dispatch(setCuisineTypeFilter({ cuisineId, getCateringCuisines, forceSelect: true }));
          }
          dispatch(fetchCateringSearchCards());
        }, 100);
      }
    });
  }, [getCateringCuisines?.length]);


  // Occasion force-select
  useEffect(() => {
    const occasionId = searchParams.get('occasionId');

    if (occasionId && getOccasionCateringTypes?.length > 0) {
      const alreadySelected = getOccasionCateringTypes.some(
        (o) => String(o.occasion_id) === String(occasionId) && o.selectedweb === 1
      );

      if (!alreadySelected) {
        dispatch({
          type: 'cateringFilter/setOccasionTypes',
          payload: {
            occasionId,
            forceSelect: true,
          },
        });
        dispatch(fetchCateringSearchCards());
      }

      // ✅ Remove the occasionId from URL after use
      const params = new URLSearchParams(window.location.search);
      params.delete('occasionId');
      router.replace(`/catering-search?${params.toString()}`, undefined, { shallow: true });
    }
  }, [searchParams, getOccasionCateringTypes]);

  

  const theme = useTheme();
  const isMobileOrTab = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleFilterDrawer = (open) => () => {
    setIsFilterOpen(open);
  };


  const onHandleMapView = () => {
    let zoomLevel = 15;
    if (!showOnMapLocLat?.latitude || !showOnMapLocLat?.longitude) {
      alert("Latitude and Longitude are required to proceed! Please Search with your Location");
      return;
    }
    const url = `/catering-search/catering-map?lat=${showOnMapLocLat?.latitude}&lng=${showOnMapLocLat?.longitude}&zoom=${zoomLevel}`;
    window.open(url, '_blank'); // Opens in a new tab
  }


  return (
    <>
      <section className='nav-bg'>
        <Navbar cateringHome />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="lg">
            <CateringSearchBar />
          </Container>
        </div>
      </div>
      <Breadcrumb homeLink="/catering" serviceLink="/catering-search" service="Catering Service" title="Search Results" />

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={3} xl={2.9}>
              <div className="position-relative map-hide-mob">
                <img
                  src="/img/Search-Result-View-Page-Images/01-map.png"
                  alt=""
                  className="img-fluid"
                  style={{ borderRadius: '5px', marginBottom: '4px' }}
                />
                <div className="position-absolute map-box">
                  <Button
                    onClick={() => onHandleMapView()}
                    variant="contained"
                    className="show-on-map"
                    sx={{
                      backgroundColor: '#C33332',
                      fontSize: '10px',
                      '&:hover': { backgroundColor: '#C33332' },
                    }}
                  >
                    Show on map
                  </Button>
                </div>
              </div>



              {!isMobileOrTab && <Filters />}
              {/* Mobile and Tablet Buttons */}


              {isMobileOrTab && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="end"
                  mt={2}
                >
                  {/* const url = `/catering-search/catering-map?lat=${locLatitude}&lng=${locLongtitude}&zoom=${zoomLevel}`; */}
                  <Button
                    onClick={() => window.open('/catering-search/catering-map', '_blank')}
                    variant="contained"
                    className="show-on-map"
                    sx={{
                      backgroundColor: '#C33332',
                      fontSize: '10px',
                      '&:hover': { backgroundColor: '#C33332' },
                    }}
                  >
                    Show on map
                  </Button>

                  <Button
                    variant="contained"
                    onClick={toggleFilterDrawer(true)}
                    sx={{
                      backgroundColor: '#C33332',
                      fontSize: '12px',
                      '&:hover': { backgroundColor: '#C33332' },
                    }}
                  >
                    Filter
                  </Button>


                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={9} xl={9.1}>
              {getCateringSearchCards.length > 0 && <Stack direction={{ xs: 'row', sm: 'row', md: 'row' }} alignItems="center" justifyContent="space-between" style={{ margin: '0px 0px 0px 0px' }}>
                <h2 className='catering-found'>
                  {selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                    ? `${selectedLocation?.terms[0].value} : ${total_count} Catering service providers found`
                    : 'India : ' + total_count + ' Catering service providers found'}
                </h2>
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


      {/* Filter Drawer */}
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={toggleFilterDrawer(false)}
      >
        <Box
          sx={{ width: 300, padding: 2 }}
          role="presentation"
          onClick={toggleFilterDrawer(false)}
          onKeyDown={toggleFilterDrawer(false)}
        >
          <Filters />
        </Box>
      </Drawer>
    </>
  )
}

export default page
"use client"
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import Subscribe from '@/components/Subscribe';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TiffinSearchBar from '@/components/tiffin/TiffinSearchBar';
import TiffinSwitchSearchResult from '@/components/tiffin/TiffinSwitchSearchResult';
import TiffinSelectBox from '@/components/tiffin/TiffinSelectBox';
import ListViewTiffin from '@/components/tiffin/ListViewTiffin';
import GridViewTiffin from '@/components/tiffin/GridViewTiffin';
import TiffinFilters from '@/components/tiffin/TiffinFilters';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchtiffinSearchCards, setKitchenTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';
import { useTheme } from '@emotion/react';
import { useMediaQuery, Drawer } from '@mui/material';
import useDocumentTitle from '@/components/useDocumentTitle';



const page = () => {

  useDocumentTitle('Caterings & Tiffins');

  const router = useRouter();
  const searchParams = useSearchParams();
  const { getTiffinSearchCards, total_count } = useSelector((state) => state.tiffinFilter);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const { selectedLocation } = useGetLocationResults();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { showOnMapLocLat } = useSelector((state) => state.globalnavbar);
    const { getTiffinKitchenTypes } = useSelector((state) => state.tiffinFilter)

  // On mount, check for kitchenType param and set selected kitchen type after fetch
  // useEffect(() => {
  //   const kitchenTypeId = searchParams.get('kitchenType');
  //   dispatch(fetchtiffinSearchCards()).then(() => {
  //     if (kitchenTypeId) {
  //       // Delay to ensure kitchen types are fetched, then set selected with forceSelect
  //       setTimeout(() => {
  //         dispatch({ type: 'tiffinFilter/setKitchenTypeFilter', payload: { id: kitchenTypeId, forceSelect: true } });
  //         dispatch(fetchtiffinSearchCards());
  //       }, 100);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const kitchenTypeId = searchParams.get('kitchenType');

    if (kitchenTypeId && getTiffinKitchenTypes?.length > 0) {
      const alreadySelected = getTiffinKitchenTypes.some(
        (k) => String(k.id) === String(kitchenTypeId) && k.selectedweb === 1
      );

      if (!alreadySelected) {
        dispatch(setKitchenTypeFilter({ id: kitchenTypeId, forceSelect: true }));
        dispatch(fetchtiffinSearchCards());
      }

      // ✅ Remove kitchenType param from URL
      const params = new URLSearchParams(window.location.search);
      params.delete('kitchenType');
      router.replace(`/tiffin-search?${params.toString()}`, undefined, { shallow: true });
    } else if (!kitchenTypeId) {
      // No kitchenType param — just fetch data
      dispatch(fetchtiffinSearchCards());
    }
  }, [searchParams, getTiffinKitchenTypes, dispatch]);


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
    const url = `/tiffin-search/tiffin-map?lat=${showOnMapLocLat?.latitude}&lng=${showOnMapLocLat?.longitude}&zoom=${zoomLevel}`;
    window.open(url, '_blank'); // Opens in a new tab
  }



  return (
    <>
      <section className='nav-bg-tiffin'>
        <Navbar />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="lg">
            <TiffinSearchBar searchLink="/tiffin-search" />
          </Container>
        </div>
      </div>


      <Breadcrumb tiffinColor homeLink="/tiffin" serviceLink="/tiffin-search" service="Tiffin Service" title="Search Results" />

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={3} xl={2.9}>
              <div className="position-relative map-hide-mob">
                <img src="/img/Search-Result-View-Page-Images/01-map.png" alt="" className="img-fluid" style={{ borderRadius: '5px', marginBottom: '4px' }} />
                <div className="position-absolute map-box">
                  <Button
                    onClick={() => onHandleMapView()}
                    // onClick={() => window.open('/tiffin-search/tiffin-map', '_blank')} 
                    variant="contained" className='show-on-map' sx={{ backgroundColor: '#d9822b', fontSize: '10px', '&:hover': { backgroundColor: '#d9822b' } }}>Show on map</Button>
                </div>
              </div>

              {!isMobileOrTab && <TiffinFilters />}

              {/* Mobile and Tablet Buttons */}
              {isMobileOrTab && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="end"
                  mt={2}
                >
                  <Button
                    onClick={() => window.open('/tiffin-search/tiffin-map', '_blank')}
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


              {/* <TiffinFilters /> */}
            </Grid>
            <Grid item xs={12} md={12} lg={9} xl={9.1}>

              {getTiffinSearchCards?.length > 0 && <Stack direction='row' alignItems="center" justifyContent="space-between" style={{ margin: '0px 0px 0px 0px' }}>
                <h2 className='catering-found'>
                  {selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                    ? `${selectedLocation?.terms[0]?.value} : ${total_count} Tiffin service providers found`
                    : 'India : ' + total_count + ' Tiffin service providers found'}
                </h2>

                <TiffinSwitchSearchResult checked={checked} setChecked={setChecked} />
              </Stack>}

              <TiffinSelectBox />

              {checked ? <ListViewTiffin /> : <GridViewTiffin xs={12} sm={6} md={4} lg={4} />}
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
          <TiffinFilters />
        </Box>
      </Drawer>

    </>
  )
}

export default page
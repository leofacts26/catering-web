"use client"
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import brandedcaterers from '../../data/brandedcaterers.json'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBrandedCaterers } from '@/app/features/user/homeSlice';
import BrandedCaterersShimmer from '../shimmer/BrandedCaterersShimmer';
import { fetchGetAllSubscriptionTypes, setSubscriptionFilter } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';

const BrandedCaters = () => {
  const router = useRouter()
  const { brandedList, isLoading } = useSelector((state) => state.homepage)
  const { userDetails } = useSelector((state) => state.user)
  const { locationValuesGlobal } = useSelector((state) => state.globalnavbar)
  const { subscriptionTypes } = useSelector((state) => state.cateringFilter);

  // console.log(locationValuesGlobal, "locationValuesGloballocationValuesGlobal");

  const dispatch = useDispatch()

  const data = {
    latitude: locationValuesGlobal?.latitude,
    longitude: locationValuesGlobal?.longitude,
    is_city_search: locationValuesGlobal.latitude ? 1 : 0
  }

  useEffect(() => {
    if (!subscriptionTypes.length) {
      dispatch(fetchGetAllSubscriptionTypes());
    }
  }, [dispatch, subscriptionTypes.length]);

  useEffect(() => {
    dispatch(fetchBrandedCaterers(data));
  }, [dispatch]);


  const handleImageClick = (item) => {
    // const id = "3";
    // dispatch(setSubscriptionFilter({ id, subscriptionTypes }))
    const url = `/catering-search/${item?.vendor_id}/${item?.id}`
    router.push(url);
  };

  // console.log(brandedList, "brandedList 666"); 

  return (
    <Container maxWidth="lg" className="branded-slider-caterer" style={{ marginTop: '25px' }} id="caterers">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Swiper
            slidesPerView={6}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            freeMode={true}
            modules={[Autoplay, FreeMode, Navigation]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              600: {
                slidesPerView: 3,
              },
              960: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            }}

          >
            {brandedList?.length > 0 && brandedList?.map((brandedcaterer) => (
              <>
                {/* <SwiperSlide key={brandedcaterer?.id}>
                  <CardContent style={{ padding: '10px 20px' }}>
                    <Stack direction="row" justifyContent="center" className='branded-caters-card w-100'>
                      <img onClick={() => handleImageClick()} src={brandedcaterer?.gallery_images['vendor-brand-logo']?.[0]?.image_name[0]?.original ? brandedcaterer?.gallery_images['vendor-brand-logo']?.[0]?.image_name[0]?.original : '/img/no-image.jpg'} alt="" className="img-fluid explore-cuisine-img cursor-pointer" />
                    </Stack>
                  </CardContent>
                </SwiperSlide> */}

                <SwiperSlide key={brandedcaterer?.id}>
                  <Box onClick={() => handleImageClick(brandedcaterer)} style={{ padding: '10px 0px 10px 15px' }}>
                    <Box className="image-shadow branded-slider-box">
                      <img src={brandedcaterer?.gallery_images['vendor-brand-logo']?.[0]?.image_name[0]?.medium ? brandedcaterer?.gallery_images['vendor-brand-logo']?.[0]?.image_name[0]?.medium : '/img/no-image.jpg'} alt="logo" className="img-fluid branded-caterers-img cursor-pointer" />
                    </Box>
                  </Box>
                </SwiperSlide>

              </>
            ))}
          </Swiper>
        </Grid>
      </Box>
    </Container >
  )
}

export default BrandedCaters
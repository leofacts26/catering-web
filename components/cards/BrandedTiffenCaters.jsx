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
import { fetchBrandedTiffins } from '@/app/features/user/homeSlice';
import BrandedCaterersShimmer from '../shimmer/BrandedCaterersShimmer';
import Heading from '../Heading';
import { fetchtiffinSearchCards, setTiffinSubscriptionFilter } from '@/app/features/tiffin/tiffinFilterSlice';
import { useRouter } from 'next/navigation';

const BrandedTiffenCaters = () => {
  const router = useRouter()
  const { userDetails } = useSelector((state) => state.user)
  const { tiffinList, isLoading } = useSelector((state) => state.homepage)

  const dispatch = useDispatch()

  const data = {
    latitude: userDetails?.latitude,
    longitude: userDetails?.longitude
  }

  useEffect(() => {
    dispatch(fetchBrandedTiffins(data))
  }, [])

  // console.log(tiffinList, "tiffinList 666");

  const onHandleBrandedFilter = () => {
    const id = "6";
    dispatch(setTiffinSubscriptionFilter(id))
    dispatch(fetchtiffinSearchCards())
    const url = `/tiffin-search`;
    router.push(url);
  };

  return (
    <>
      {tiffinList?.length > 0 && <Heading title="Recommended Tiffins in Chennai" subHeading />}
      <Container maxWidth="lg" className="branded-cater-slider" style={{ marginTop: '25px' }}>
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
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}

            >
              {tiffinList?.length > 0 && tiffinList?.map((brandedcaterer) => (
                <>
                  <SwiperSlide key={brandedcaterer?.id}>
                    <CardContent key={brandedcaterer?.id} style={{ padding: '10px 20px' }}>
                      <Stack direction="row" justifyContent="center" className='recent-search-card w-100'>
                        <img onClick={() => onHandleBrandedFilter()} src={brandedcaterer?.gallery_images['vendor-brand-logo']?.[0]?.image_name[0]?.original ? brandedcaterer?.gallery_images['vendor-brand-logo']?.[0]?.image_name[0]?.original : '/img/no-image.jpg'} alt="" className="img-fluid explore-cuisine-img cursor-pointer" />
                      </Stack>
                    </CardContent>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </Grid>
        </Box>
      </Container >
    </>
  )
}

export default BrandedTiffenCaters
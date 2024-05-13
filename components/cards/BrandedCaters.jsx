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

const BrandedCaters = () => {
  return (
    <Container maxWidth="lg" className="branded-cater-slider" style={{marginTop: '25px'}}>
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
            {
              brandedcaterers.map((brandedcaterer) => (
                <>
                  <SwiperSlide>
                    <CardContent key={brandedcaterer.id} style={{ padding: '10px 20px' }}>
                      <Stack direction="row" justifyContent="center" className='recent-search-card w-100'>
                        <img src={brandedcaterer.url} alt="" className="img-fluid explore-cuisine-img" />
                      </Stack>
                    </CardContent>
                  </SwiperSlide>
                </>
              ))
            }
          </Swiper>
        </Grid>
      </Box>
    </Container >
  )
}

export default BrandedCaters
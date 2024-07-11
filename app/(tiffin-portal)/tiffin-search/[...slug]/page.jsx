'use client'
import Breadcrumb from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShowAllImages from '@/components/ShowAllImages';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EditNoteIcon from '@mui/icons-material/EditNote';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import SimilarCaterers from '@/components/cards/SimilarCaterers';
import ReciewCards from '@/components/cards/ReciewCards';
import Subscribe from '@/components/Subscribe';
import Footer from '@/components/Footer';
import CateringSearchBar from '@/components/catering/CateringSearchBar';
import TiffinSearchBar from '@/components/tiffin/TiffinSearchBar';
import { api, BASE_URL } from '@/api/apiConfig';
import TimeRange from '@/components/TimeRange';
import OurGallery from '@/components/OurGallery';
import ContactBtn from '@/components/ContactBtn';
import SimilarCaterersTiffin from '@/components/cards/SimilarCaterersTiffin';
import ShowOnMap from '@/components/ShowOnMap';
import TiffinDetailSave from '@/components/TiffinDetailSave';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setlLocationValuesGlobal, setManualLocation, setPeople } from '@/app/features/user/globalNavSlice';
import { fetchCateringSearchCards } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';
import { fetchtiffinSearchCards } from '@/app/features/tiffin/tiffinFilterSlice';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import ReviewCardTiffin from '@/components/cards/ReviewCardTiffin';
import ReactMarkdown from 'react-markdown';


const page = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const { slug } = useParams()
  const dispatch = useDispatch()
  const router = useRouter()

  const vendorId = slug[0];
  const branchId = slug[1];

  const [data, setData] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await api.get(`${BASE_URL}/user-get-vendor-show-details?branch_id=${branchId}&vendor_id=${vendorId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }


  const onBreadcrumbLocationSearch = () => {
    const { latitude, longitude, city, place_id, pincode, formatted_address } = data;
    dispatch(setManualLocation(city));
    // dispatch(setPeople(vendor_service_name));
    dispatch(setlLocationValuesGlobal({ latitude, longitude, place_id, pincode, city: { long_name: city }, formatted_address }));
    dispatch(fetchtiffinSearchCards());
    const url = `/tiffin-search`;
    router.push(url);
  }


  console.log(data, "data");

  return (
    <>
      <section className='nav-bg-tiffin'>
        <Navbar cateringHome />
      </section>
      <div className="search-container">
        <div className="container-search">
          <Container maxWidth="md">
            <TiffinSearchBar  searchLink="/tiffin-search" />
          </Container>
        </div>
      </div>
      <Breadcrumb tiffinColor homeLink="/tiffin" serviceLink="/tiffin-search" service="Tiffin Service" city={data?.city} title={data?.vendor_service_name}
        onBreadcrumbLocationSearch={onBreadcrumbLocationSearch} />

      <Container maxWidth="lg">
        <Stack sx={{ marginTop: '20px' }} direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} alignItems="end" justifyContent="space-between">
          <div>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} alignItems="center" spacing={2}>
              {data?.vendor_service_name && <h2 className="vc-heading"> {data?.vendor_service_name} </h2>}
              <span className='vc-chip-tiffin'>{data?.subscription_type_display} {data?.vendor_type}</span>
            </Stack>
            {data?.formatted_address && <h3 className="vc-address">{data?.formatted_address}</h3>}
          </div>
          <div className='vc-icon-box'>
            <Stack direction='row' justifyContent="space-between" alignItems="end">
              <Stack direction="row" alignItems="center" spacing={1} className="vc-icons-tiffin"> <ShareIcon style={{ fontSize: '18px' }} />
                <span>Share</span></Stack>
              {/* TiffinDetailSave  */}
              <TiffinDetailSave branchId={branchId} is_wishlisted={data?.is_wishlisted} />
              <ShowOnMap tiffinColor locLatitude={data?.latitude} locLongtitude={data?.longitude} />
            </Stack>
          </div>
        </Stack>

        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <ShowAllImages galleryImages={data?.galleryImages} bennerMenuMixGalleryImages={data?.bennerMenuMixGalleryImages} />
        </Box>

        <Box sx={{ flexGrow: 1 }} className="mb-4">
          <Grid container spacing={2}>
            <Grid item sm={12} lg={7}>

              {data?.foodTypes?.length > 0 && <Stack direction="row" alignItems="center" spacing={1} className="mb-4">
                <h2 className="food-type-tiffin">Food Type :</h2>
                {
                  data?.foodTypes?.slice(1, 3).map((food_type, index) => {
                    let iconSrc = '';
                    if (food_type?.food_type_name === 'Veg') {
                      iconSrc = '/img/icons/list-card-veg.png';
                    } else if (food_type?.food_type_name === 'Non Veg') {
                      iconSrc = '/img/icons/list-card-non-veg.png';
                    } else {
                      iconSrc = '/img/icons/list-card-veg.png';
                    }
                    return (
                      <Stack direction="row" alignItems="center" spacing={0} key={index}>
                        <img src={iconSrc} className='list-card-veg' alt="" />
                        <p className='list-card-veg-font'> {food_type?.food_type_name} </p>
                      </Stack>
                    )
                  })
                }
              </Stack>}


              {data?.cuisines?.length > 0 && <div>
                <h2 className="vc-cater-tiffin">Cuisines We Cater</h2>
                <h2 className="vc-locations"> {data?.cuisines?.slice(0, 8)?.map((item) => item?.cuisine_name).join(" | ")}... </h2>
              </div>}
            </Grid>


            <Grid item sm={12} lg={5}>
              <Stack direction="column" alignContent="end" alignItems="end" justifyContent="end">
                {data?.start_price && <Stack direction="row" alignItems="center" className="mb-4">
                  <span className="vc-price">Starting Price / Plate -</span>
                  <Stack direction="row" alignItems="center" spacing={0}>
                    <CurrencyRupeeIcon className="vc-price-one-tiffin" /> <span className="vc-price-one-tiffin"> {data?.start_price} </span>
                  </Stack>
                </Stack>}
                <p className="vc-reviews-tiffin">See Reviews (352)</p>
                {data?.business_phone_number && <Stack direction="row" spacing={2} style={{ marginTop: '10px' }}>
                  <ContactBtn number={data?.business_phone_number} />
                </Stack>}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Grid container spacing={2}>
          {data?.serviceTypes?.length > 0 && <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  {/* <img src="/img/icons/service-type-filled.svg" className='vc-icon-svg' alt="" /> */}
                  <OutdoorGrillIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Service Type</p>
                  <h3 className="vc-service-heading">
                    {data?.serviceTypes?.slice(0, 8)?.map((item) => item?.service_type_name).join(" , ")}
                  </h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

          {data?.mealTimes?.length > 0 && <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <WbSunnyIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Meal Times</p>
                  <h3 className="vc-service-heading">
                    {data?.mealTimes?.slice(0, 8)?.map((item) => item?.meal_time_name).join(" , ")}
                  </h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

          {data?.start_day && data?.end_day && data?.start_time && data?.end_time && <Grid item xs={12} sm={6} md={3} lg={3}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <AccessTimeIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Working Hours</p>
                  <h3 className="vc-service-heading"> {data?.start_day}  - {data?.end_day}  {" "}
                    <TimeRange startTime={data?.start_time} endTime={data?.end_time} /> </h3>
                </div>
              </CardContent>
            </div>
          </Grid>}


          {data?.working_since && <Grid item xs={12} sm={6} md={3} lg={2}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <TimelineIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Working Since</p>
                  <h3 className="vc-service-heading">{data?.working_since}</h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

        </Grid>
      </Container>

      <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>

        {data?.about_description && <div>
          <h3 className="vc-about-us-tiffin">About Us</h3>
          <p className="vc-para vc-markdown my-3"> <ReactMarkdown>{data?.about_description}</ReactMarkdown></p>
        </div>}

        {data?.branches > 0 && <>
          <h3 className="vc-about-us-tiffin" style={{ marginTop: '20px' }}>Our Branches</h3>
          <p className="vc-para"> {data?.branches?.map((item) => item?.city).join(", ")} <span className="text-orange view-all">View all</span> </p>
        </>}


      </Container>

      <OurGallery galleryImages={data?.galleryImages} bennerMenuMixGalleryImages={data?.bennerMenuMixGalleryImages} />

      <SimilarCaterersTiffin tiffin />
      <ReviewCardTiffin tiffin />
      <Subscribe />
      <Footer />
    </>
  )
}

export default page
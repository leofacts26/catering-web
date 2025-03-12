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
import toast from 'react-hot-toast';
import FoodType from '@/components/FoodType';
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star';


const page = () => {
  const [showAllCuisines, setShowAllCuisines] = useState(false)
  const [cuisineCount, setCuisineCount] = useState(20)
  const [isAnimating, setIsAnimating] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };



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


  const onHandleCuisineShow = () => {
    console.log("true");
    setShowAllCuisines(true)
    setCuisineCount(100)
  }

  const onHandleCuisineClose = () => {
    console.log("false");
    setShowAllCuisines(false)
    setCuisineCount(20)
  }

  const selectedCuisines = data?.cuisines?.filter((item) => item.selected === "1") || [];


  const onHandleShare = (cardId, data) => {
    setIsAnimating(cardId);
    // const { vendorId, Id } = data;
    const linkToCopy = `https://cateringsandtiffins.com/tiffin-search/${vendorId}/${branchId}`;
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        toast.success('Link copied to clipboard');
        setTimeout(() => setIsAnimating(false), 1000); // Stop the animation after 1 second
      })
      .catch((error) => {
        toast.error('Failed to copy link');
        setTimeout(() => setIsAnimating(false), 1000); // Stop the animation after 1 second
      });
  };

  // console.log(data, "data");


  // Adjust the length as needed
  const shortContentLength = 500;
  const content = data?.about_description || '';
  const shortContent = content.slice(0, shortContentLength);

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
      <Breadcrumb tiffinColor homeLink="/tiffin" serviceLink="/tiffin-search" service="Tiffin Service" city={data?.city} title={data?.vendor_service_name}
        onBreadcrumbLocationSearch={onBreadcrumbLocationSearch} />

      <Container maxWidth="lg">
        <Stack sx={{ marginTop: '20px' }} direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} alignItems="end" justifyContent="space-between">
          {/* <div>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} alignItems="center" spacing={2}>
              {data?.vendor_service_name && <h2 className="vc-heading"> {data?.vendor_service_name} </h2>}
              <span className='vc-chip-tiffin'>{data?.subscription_type_display} {data?.vendor_type}</span>
            </Stack>
            {data?.formatted_address && <h3 className="vc-address">{data?.formatted_address}</h3>}
          </div> */}

          <div className="detailname-width">
            <Stack direction="row" alignItems="center" spacing={2}>
              {data?.vendor_service_name && <h2 className="vc-heading text-ellipse-vc-heading"> {data?.vendor_service_name} </h2>}
              <span className='vc-chip-tiffin' style={{ backgroundColor: `${data?.label_display_color}` }}> {data?.subscription_type_display} {data?.vendor_type}</span>
            </Stack>
            {data?.formatted_address && <h3 className="vc-address text-ellipse-vc-heading">{data?.formatted_address}</h3>}
          </div>
          <div className='vc-icon-box'>
            <Stack direction='row' justifyContent="space-between" alignItems="end">
              <Stack direction="row" alignItems="center" spacing={1} className="vc-icons-tiffin">
                <Stack direction="row" alignItems="center" spacing={1} className="vc-icons-tiffin"
                  onClick={() => onHandleShare(data?.id, { vendorId: data?.vendor_id, Id: data?.id })}>
                  <ShareIcon className={` ${isAnimating === data?.id ? 'spin-animation text-orange' : ''}`} style={{ fontSize: '18px' }}
                  />
                  <span>Share</span>
                </Stack>
              </Stack>
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

              {data?.foodTypes.length > 0 ? <Stack direction="row" spacing={1} sx={{ marginBottom: '15px' }}>
                <h2 className="food-type-tiffin">Food Type : </h2>
                <FoodType data={data?.foodTypes} />
              </Stack> : <Stack direction="row" spacing={1} sx={{ marginBottom: '15px' }}>
                <h2 className="food-type-tiffin">Food Type : </h2>
                <p className={`list-card-veg-font mt-1`}> N/A </p>
              </Stack>}


              {selectedCuisines.length > 0 ? (
                <div>
                  <h2 className="vc-cater-tiffin" style={{ marginBottom: '10px' }}>Cuisines We Cater</h2>
                  <Stack direction="row" flexWrap="wrap" alignItems="start" spacing={3}>
                    {selectedCuisines.slice(0, cuisineCount).map((item, index) => (
                      <span
                        className="cuisine-detail-list"
                        key={index}
                        style={{ marginLeft: "0px", marginRight: "0px", marginBottom: "10px" }}
                      >
                        {item?.cuisine_name}{" "}
                        <span style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}>
                          |
                        </span>
                      </span>
                    ))}

                    {selectedCuisines.length > 20 && (
                      <span
                        className="text-orange view-all cursor-pointer ms-0"
                        onClick={showAllCuisines ? onHandleCuisineClose : onHandleCuisineShow}
                      >
                        {showAllCuisines ? "Show Less" : "Show All"}
                      </span>
                    )}
                  </Stack>
                </div>
              ) : (
                <div>
                  <h2 className="food-type">Cuisines We Cater: </h2>
                  <p className="vc-about-content vc-markdown mt-1">N/A</p>
                </div>
              )}


              {/* {data?.cuisines?.filter((item) => item.selected === "1").length > 0 ? <div>
                <h2 className="vc-cater-tiffin" style={{ marginBottom: '10px' }}>Cuisines We Cater</h2>
                <Stack direction="row" flexWrap="wrap" alignItems="start" spacing={3}>

                  {
                    data?.cuisines
                      ?.filter((item) => item.selected === "1")
                      ?.slice(0, cuisineCount)
                      ?.map((item, index) => (
                        <span
                          className="cuisine-detail-list"
                          key={index}
                          style={{ marginLeft: "0px", marginRight: "0px", marginBottom: "10px" }}
                        >
                          {item?.cuisine_name}
                          <span style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}>
                            |
                          </span>
                        </span>
                      ))
                  }



                  {showAllCuisines ? (
                    <span className="text-orange view-all cursor-pointer ms-0" onClick={onHandleCuisineShow}> Show All </span>
                  ) : (
                    <span className="text-orange view-all cursor-pointer ms-0" onClick={onHandleCuisineClose}> Show Less </span>
                  )}
                </Stack>
              </div> : <div>
                <h2 className="vc-cater-tiffin" style={{ marginBottom: '10px' }}>Cuisines We Cater</h2>
                <p className="vc-about-content vc-markdown mt-1"> N/A </p>
              </div>} */}

            </Grid>


            <Grid item sm={12} lg={5}>
              <Stack direction="column" alignContent="end" alignItems="end" justifyContent="end">
                {data?.start_price ? <Stack direction="row" alignItems="center" className="mb-2">
                  <span className="vc-price">Monthly Plan Price -</span>
                  <Stack direction="row" alignItems="center" spacing={0}>
                    <CurrencyRupeeIcon className="vc-price-one-tiffin" /> <span className="vc-price-one-tiffin"> {data?.start_price} </span>
                  </Stack>
                </Stack> : <Stack direction="row" alignItems="center" className="mb-2">
                  <span className="vc-price">Monthly Plan Price -</span>
                  <span className="vc-price-one-tiffin ms-1"> N/A </span>
                </Stack>}

                {accessToken && <Link href="#reviews" className="vc-reviews-tiffin">
                  <div className="mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(Math.round(parseFloat(data?.rating || "0")))].map((_, index) => (
                      <StarIcon key={index} style={{ color: '#d9822b', fontSize: 20 }} />
                    ))}
                    <span className='ms-2'>{data?.review_count > 0 ? `See Reviews ${data.review_count}` : "No Reviews"}</span>
                  </div>

                </Link>}
                {data?.business_phone_number && <Stack direction="row" spacing={2} style={{ marginTop: '10px' }}>
                  <ContactBtn number={data?.business_phone_number} vendorId={vendorId} branchId={branchId} />
                </Stack>}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Grid container spacing={2}>

          {data?.kitchenTypes?.length > 0 ? <Grid item xs={12} sm={6} md={3} lg={2}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <OutdoorGrillIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Kitchen Type</p>
                  <h3 className="vc-service-heading">
                    {data?.kitchenTypes
                      ?.filter((item) => item.selected === "1")
                      ?.slice(0, 8)
                      ?.map((item) => item.kitchen_type_name)
                      .join(" , ")}
                  </h3>
                </div>
              </CardContent>
            </div>
          </Grid> : <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <OutdoorGrillIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Kitchen Type</p>
                  <h3 className="vc-service-heading">N/A</h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

          {data?.serviceTypes?.length > 0 ? <Grid item xs={12} sm={6} md={3} lg={3}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <OutdoorGrillIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Service Type</p>
                  <h3 className="vc-service-heading">
                    {data?.serviceTypes
                      ?.filter((item) => item.selected === 1)
                      ?.slice(0, 8)
                      ?.map((item) => item.service_type_name)
                      .join(" , ")}
                  </h3>
                </div>
              </CardContent>
            </div>
          </Grid> : <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <OutdoorGrillIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Service Type</p>
                  <h3 className="vc-service-heading">N/A</h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

          {data?.mealTimes?.length > 0 ? <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <WbSunnyIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Meal Times</p>
                  <h3 className="vc-service-heading">
                    {data?.mealTimes
                      ?.filter((item) => item.selected === "1")
                      ?.slice(0, 8)
                      ?.map((item) => item.meal_time_name)
                      .join(" , ")}
                  </h3>
                </div>
              </CardContent>
            </div>
          </Grid> : <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <WbSunnyIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Meal Times</p>
                  <h3 className="vc-service-heading">N/A</h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

          {data?.start_day && data?.end_day && data?.start_time && data?.end_time ? <Grid item xs={12} sm={6} md={3} lg={2.5}>
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
          </Grid> : <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <AccessTimeIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Working Hours</p>
                  <h3 className="vc-service-heading">N/A</h3>
                </div>
              </CardContent>
            </div>
          </Grid>}


          {data?.working_since ? <Grid item xs={12} sm={6} md={3} lg={2}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <TimelineIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Working Since</p>
                  <h3 className="vc-service-heading">{data?.working_since}</h3>
                </div>
              </CardContent>
            </div>
          </Grid> : <Grid item xs={12} sm={6} md={3} lg={2}>
            <div className="vc-shadow-tiffin">
              <CardContent>
                <div className="text-center">
                  <TimelineIcon className="vc-icon-label-tiffin" />
                  <p className="vc-service-type">Working Since</p>
                  <h3 className="vc-service-heading">N/A</h3>
                </div>
              </CardContent>
            </div>
          </Grid>}

        </Grid>
      </Container>

      <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>

        <div>
          <h3 className="vc-about-us text-orange">About Us</h3>
          {content ? (
            <div>
              <p className="vc-about-content vc-markdown my-3">
                <ReactMarkdown>
                  {isExpanded ? content : `${shortContent}${content.length > shortContentLength ? '...' : ''}`}
                </ReactMarkdown>
              </p>
              {content.length > shortContentLength && (
                <span
                  style={{ marginLeft: '0px' }}
                  className="text-orange view-all cursor-pointer"
                  onClick={toggleExpand}
                >
                  {isExpanded ? 'Show Less' : 'Show All'}
                </span>
              )}
            </div>
          ) : (
            <div>
              <p className="vc-about-content vc-markdown mt-1">
                N/A
              </p>
            </div>
          )}
        </div>



        {/* {
          data?.branches > 0 && <div>
            <h3 className="vc-about-us-tiffin" style={{ marginTop: '20px' }}>Our Branches</h3>
            <p className="vc-para"> {data?.branches?.map((item) => item?.city).join(", ")} <span className="text-orange view-all">View all</span> </p>
          </div>
        } */}


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
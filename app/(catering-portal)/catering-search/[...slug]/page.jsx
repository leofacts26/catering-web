"use client"
import { api, BASE_URL } from "@/api/apiConfig";
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
import OurGallery from "@/components/OurGallery";
import TimeRange from "@/components/TimeRange";
import ContactBtn from "@/components/ContactBtn";
import CateringDetailSave from "@/components/CateringDetailSave";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'


const page = () => {

    const accessToken = useSelector((state) => state.user.accessToken);
    const { slug } = useParams()
  
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
            <Breadcrumb service="Catering Service" city={data?.city} title={data?.vendor_service_name} results="Search results" />

            <Container maxWidth="lg">
                <Stack sx={{ marginTop: '20px' }} direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} alignItems="center" justifyContent="space-between">
                    <div>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <h2 className="vc-heading"> {data?.vendor_service_name} </h2>
                            <span className='vc-chip'> {data?.subscription_type_display} {data?.vendor_type}</span>
                        </Stack>
                        <h3 className="vc-address">{data?.formatted_address}</h3>
                    </div>
                    <div className='vc-icon-box'>
                        <Stack direction='row' justifyContent="space-between" alignItems="end">
                            <Stack direction="row" alignItems="center" spacing={1} className="vc-icons"> <ShareIcon style={{ fontSize: '18px' }} /> <span>Share</span></Stack>
                            {/* <Stack direction="row" alignItems="center" spacing={1} className="vc-icons"> <FavoriteBorderIcon style={{ fontSize: '18px' }} /> <span>Save</span></Stack> */}
                            <CateringDetailSave branchId={branchId} is_wishlisted={data?.is_wishlisted} />
                            <Stack direction="row" alignItems="center" spacing={1} className="vc-icons"> <LocationOnIcon style={{ fontSize: '14px' }} /> <span className="font-12">Show On Map</span></Stack>
                        </Stack>
                    </div>
                </Stack>

                <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                    <ShowAllImages galleryImages={data?.galleryImages} bennerMenuMixGalleryImages={data?.bennerMenuMixGalleryImages} />
                </Box>

                <Box sx={{ flexGrow: 1 }} className="mb-4">
                    <Grid container spacing={2}>
                        <Grid item sm={12} lg={7}>

                            <Stack direction="row" spacing={1} sx={{ marginTop: '15px', marginBottom: '15px' }}>
                                <h2 className="food-type">Food Type : </h2>
                                {
                                    data?.foodTypes?.map((food_type, index) => {
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
                            </Stack>

                            <h2 className="vc-cater">Cuisines We Cater</h2>
                            <h2 className="vc-locations">
                                {data?.cuisines?.slice(0, 8)?.map((item) => item?.cuisine_name).join(" | ")}...
                            </h2>
                        </Grid>
                        <Grid item sm={12} lg={5}>
                            <Stack direction="column" alignContent="end" alignItems="end" justifyContent="end">
                                <Stack direction="row" alignItems="center" className="mb-4">
                                    <span className="vc-price">Starting Price / Plate -</span>
                                    <Stack direction="row" alignItems="center" spacing={0}>
                                        <CurrencyRupeeIcon className="vc-price-one" /> <span className="vc-price-one"> {data?.start_price} </span>
                                    </Stack>
                                </Stack>
                                <p className="vc-reviews">See Reviews (352)</p>
                                <Stack direction="row" spacing={2} style={{ marginTop: '10px' }}>
                                    {/* <Button variant="contained" className="vt-whatsapp-btn"> <WhatsAppIcon style={{ marginRight: '3px' }} /> Whatsapp</Button> */}
                                    <ContactBtn number={data?.business_phone_number} />
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={2.5}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    {/* <FastfoodIcon className="vc-icon-label" /> */}
                                    <img src="/img/icons/service-type-filled.svg" className='vc-icon-svg' alt="" />
                                    <p className="vc-service-type">Service Type</p>
                                    <h3 className="vc-service-heading">
                                        {data?.serviceTypes?.slice(0, 8)?.map((item) => item?.service_type_name).join(" , ")}
                                    </h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2.5}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <EditNoteIcon className="vc-icon-label" />
                                    <p className="vc-service-type">Min & Max Order Quantity</p>
                                    <h3 className="vc-service-heading"> {data?.minimum_capacity} - {data?.maximum_capacity} Plates</h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <AccessTimeIcon className="vc-icon-label" />
                                    <p className="vc-service-type">Working Hours</p>
                                    <h3 className="vc-service-heading"> {data?.start_day}  - {data?.end_day}  {" "}
                                        <TimeRange startTime={data?.start_time} endTime={data?.end_time} /> </h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <GroupIcon className="vc-icon-label" />
                                    <p className="vc-service-type">Total No. of Staffs</p>
                                    <h3 className="vc-service-heading">{data?.total_staffs_approx}</h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <TimelineIcon className="vc-icon-label" />
                                    <p className="vc-service-type">Working Since</p>
                                    <h3 className="vc-service-heading">{data?.working_since}</h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
                <h3 className="vc-about-us">About Us</h3>
                <p className="vc-para">{data?.about_description}</p>

                <h3 className="vc-about-us" style={{ marginTop: '20px' }}>Our Branches</h3>
                <p className="vc-para"> {data?.branches?.map((item) => item?.city).join(", ")}
                    {data?.branches?.length >= 6 && <span className="text-red view-all">View all</span>} </p>
            </Container>

            <OurGallery galleryImages={data?.galleryImages} bennerMenuMixGalleryImages={data?.bennerMenuMixGalleryImages} />

            <SimilarCaterers />
            <ReciewCards />


            <Subscribe />
            <Footer />
        </>
    )
}

export default page
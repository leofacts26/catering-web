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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { setlLocationValuesGlobal } from "@/app/features/user/globalNavSlice";
import { fetchCateringSearchCards } from "@/app/features/user/cateringFilterSlice";
import { useRouter } from 'next/navigation';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import ShowOnMapCatering from "@/components/ShowOnMapCatering";
import ReactMarkdown from 'react-markdown';
import FoodType from "@/components/FoodType";



const page = () => {

    const [showAll, setShowAll] = useState(true)
    const [count, setCount] = useState(3)
    console.log(showAll, "showAll");
    console.log(count, "count");

    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.user.accessToken);
    const { slug } = useParams()
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

    console.log(data, "data TTT");

    const onBreadcrumbLocationSearch = () => {
        const { latitude, longitude, city, place_id, pincode, formatted_address } = data;
        dispatch(setlLocationValuesGlobal({ latitude, longitude, place_id, pincode, city: { long_name: city }, formatted_address }));
        dispatch(fetchCateringSearchCards());
        const url = `/catering-search`;
        router.push(url);
    }


    const onHandleShow = () => {
        console.log("true");
        setShowAll(false)
        setCount(100)
    }

    const onHandleClose = () => {
        console.log("false");
        setShowAll(true)
        setCount(3)
    }

    console.log(data?.foodTypes, "data?.foodTypes data?.foodTypes");

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
            <Breadcrumb homeLink="/catering" serviceLink="/catering-search" service="Catering Service" city={data?.city} title={data?.vendor_service_name} onBreadcrumbLocationSearch={onBreadcrumbLocationSearch} />

            <Container maxWidth="lg">
                <Stack sx={{ marginTop: '20px' }} direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} alignItems="center" justifyContent="space-between">
                    <div className="detailname-width">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {data?.vendor_service_name && <h2 className="vc-heading text-ellipse-vc-heading"> {data?.vendor_service_name} </h2>}
                            <span className='vc-chip'> {data?.subscription_type_display} {data?.vendor_type}</span>
                        </Stack>
                        {data?.formatted_address && <h3 className="vc-address text-ellipse-vc-heading">{data?.formatted_address}</h3>}
                    </div>
                    <div className='vc-icon-box'>
                        <Stack direction='row' justifyContent="space-between" alignItems="end">
                            <Stack direction="row" alignItems="center" spacing={1} className="vc-icons">
                                <ShareIcon style={{ fontSize: '18px' }} /> <span>Share</span></Stack>
                            {/* <Stack direction="row" alignItems="center" spacing={1} className="vc-icons"> <FavoriteBorderIcon style={{ fontSize: '18px' }} /> <span>Save</span></Stack> */}
                            <CateringDetailSave branchId={branchId} is_wishlisted={data?.is_wishlisted} />
                            {/* <Stack direction="row" alignItems="center" spacing={1} className="vc-icons"> 
                                <LocationOnIcon style={{ fontSize: '14px' }} /> <span className="font-12">Show On Map</span></Stack> */}
                            <ShowOnMapCatering locLatitude={data?.latitude} locLongtitude={data?.longitude} />

                        </Stack>
                    </div>
                </Stack>

                <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                    <ShowAllImages galleryImages={data?.galleryImages} bennerMenuMixGalleryImages={data?.bennerMenuMixGalleryImages} />
                </Box>

                <Box sx={{ flexGrow: 1 }} className="mb-4">
                    <Grid container spacing={2}>
                        <Grid item sm={12} lg={7}>

                            {data?.foodTypes.length > 0 && <Stack direction="row" spacing={1} sx={{ marginBottom: '15px' }}>
                                <h2 className="food-type">Food Type : </h2>
                                <FoodType data={data?.foodTypes} />
                            </Stack>}

                            {data?.cuisines?.length > 0 && <div>
                                <h2 className="vc-cater">Cuisines We Cater</h2>
                                <h2 className="vc-locations">
                                    {data?.cuisines?.slice(0, 8)?.map((item) => item?.cuisine_name).join(" | ")}...
                                </h2>
                            </div>}

                        </Grid>
                        <Grid item sm={12} lg={5} className="w-100">
                            <Stack direction="column" alignContent="end" alignItems="end" justifyContent="end" className="w-100">
                                {data?.start_price && <Stack direction="row" alignItems="center" className="mb-2">
                                    <span className="vc-price">Starting Price / Plate -</span>
                                    <Stack direction="row" alignItems="center" spacing={0}>
                                        <CurrencyRupeeIcon className="vc-price-one" /> <span className="vc-price-one"> {data?.start_price} </span>
                                    </Stack>
                                </Stack>}

                                <p className="vc-reviews">See Reviews (352)</p>

                                {data?.business_phone_number && <Stack direction="row" spacing={2} style={{ marginTop: '10px' }}>
                                    {/* <Button variant="contained" className="vt-whatsapp-btn"> <WhatsAppIcon style={{ marginRight: '3px' }} /> Whatsapp</Button> */}
                                    <ContactBtn number={data?.business_phone_number} />
                                </Stack>}

                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
                <Grid container spacing={2}>
                    {data?.serviceTypes?.length > 0 && <Grid item xs={12} sm={12} md={4} lg={2.5}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <OutdoorGrillIcon className="vc-icon-label" />
                                    {/* <img src="/img/icons/service-type-filled.svg" className='vc-icon-svg' alt="" /> */}
                                    {/* <EditNoteIcon className="vc-icon-label" /> */}
                                    <p className="vc-service-type">Service Type</p>
                                    <h3 className="vc-service-heading">
                                        {data?.serviceTypes?.slice(0, 8)?.map((item) => item?.service_type_name).join(" , ")}
                                    </h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>}

                    {data?.minimum_capacity && data?.maximum_capacity && <Grid item xs={12} sm={12} md={4} lg={2.5}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <EditNoteIcon className="vc-icon-label" />
                                    <p className="vc-service-type">Min & Max Order Quantity</p>
                                    <h3 className="vc-service-heading"> {data?.minimum_capacity} - {data?.maximum_capacity} Plates</h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>}

                    {data?.start_day && data?.end_day && data?.start_time && data?.end_time && <Grid item xs={12} sm={12} md={4} lg={3}>
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
                    </Grid>}


                    {data?.total_staffs_approx && <Grid item xs={12} sm={12} md={4} lg={2}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <GroupIcon className="vc-icon-label" />
                                    <p className="vc-service-type">Total No. of Staffs</p>
                                    <h3 className="vc-service-heading">{data?.total_staffs_approx}</h3>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>}

                    {data?.working_since && <Grid item xs={12} sm={12} md={4} lg={2}>
                        <div className="vc-shadow">
                            <CardContent>
                                <div className="text-center">
                                    <TimelineIcon className="vc-icon-label" />
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
                    <h3 className="vc-about-us">About Us</h3>
                    <p className="vc-para vc-markdown my-3"> <ReactMarkdown>{data?.about_description}</ReactMarkdown></p>
                </div>}


                {data?.branches.length > 0 && <div>
                    <h3 className="vc-about-us" style={{ marginTop: '20px' }}>Our Branches</h3>
                    <p className="vc-para"> {data?.branches?.slice(0, count).map((item) => item?.city).join(", ")}
                        {showAll ? <span className="text-red view-all ms-2 cursor-pointer" onClick={() => onHandleShow()}> Show All </span> :
                            <span className="text-red view-all ms-2 cursor-pointer" onClick={() => onHandleClose()}> Show Less </span>}

                    </p>
                </div>}

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
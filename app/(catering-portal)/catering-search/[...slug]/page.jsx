"use client"
import React from 'react'
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
import toast from "react-hot-toast";
import { Link } from '@mui/material';



const page = () => {

    const [showAll, setShowAll] = useState(true)
    const [count, setCount] = useState(3)
    const [isAnimating, setIsAnimating] = useState(false);

    const [showAllCuisines, setShowAllCuisines] = useState(true)
    const [cuisineCount, setCuisineCount] = useState(12)

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };





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

    // console.log(data, "data TTT");

    const onBreadcrumbLocationSearch = () => {
        const { latitude, longitude, city, place_id, pincode, formatted_address } = data;
        dispatch(setlLocationValuesGlobal({ latitude, longitude, place_id, pincode, city: { long_name: city }, formatted_address }));
        dispatch(fetchCateringSearchCards());
        const url = `/catering-search`;
        router.push(url);
    }


    const onHandleShow = () => {
        setShowAll(false)
        setCount(100)
    }

    const onHandleClose = () => {
        setShowAll(true)
        setCount(3)
    }

    const onHandleCuisineShow = () => {
        console.log("true");
        setShowAllCuisines(false)
        setCuisineCount(100)
    }

    const onHandleCuisineClose = () => {
        console.log("false");
        setShowAllCuisines(true)
        setCuisineCount(12)
    }

    const onHandleShare = (cardId, data) => {
        setIsAnimating(cardId);
        const { vendorId, Id } = data;
        const linkToCopy = `https://cateringsandtiffins.com/catering-search/${vendorId}/${Id}`;
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

    // console.log(data?.foodTypes, "data?.foodTypes data?.foodTypes");


    // Adjust the length as needed
    const shortContentLength = 500;
    const content = data?.about_description || '';
    const shortContent = content.slice(0, shortContentLength);

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
                            <Stack direction="row" alignItems="center" spacing={1} className="vc-icons" onClick={() => onHandleShare(data?.id, { vendorId: data?.vendor_id, Id: data?.id })}>
                                <ShareIcon className={` ${isAnimating === data?.id ? 'spin-animation text-red' : ''}`} style={{ fontSize: '18px' }}
                                />
                                <span>Share</span>
                            </Stack>
                            <CateringDetailSave branchId={branchId} is_wishlisted={data?.is_wishlisted} />
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
                                <Stack direction="row" flexWrap="wrap" alignItems="start" spacing={3}>
                                    {
                                        data?.cuisines?.slice(0, cuisineCount).map((item, index) => (
                                            <span className='cuisine-detail-list' key={index} style={{ marginLeft: '0px', marginRight: '0px', marginBottom: '10px' }}>
                                                {item?.cuisine_name} <span style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>|</span>
                                            </span>
                                        ))
                                    }
                                    {showAllCuisines ? (
                                        <span className="text-red view-all cursor-pointer" onClick={onHandleCuisineShow}> Show All </span>
                                    ) : (
                                        <span className="text-red view-all cursor-pointer" onClick={onHandleCuisineClose}> Show Less </span>
                                    )}
                                </Stack>
                            </div>}

                        </Grid>
                        <Grid item sm={12} lg={5} className="w-100">
                            <Stack direction="column" alignContent="end" alignItems="end" justifyContent="end" className="w-100">
                                {data?.start_price && <Stack direction="row" alignItems="center" className="mb-2">
                                    <span className="vc-price">Starting Price / Plate -</span>
                                    <Stack direction="row" alignItems="center" spacing={0}>
                                        <CurrencyRupeeIcon className="vc-price-one" /> <span className="vc-price-one"> {data?.start_price && data?.start_price} </span>
                                    </Stack>
                                </Stack>}

                                <Link href="#reviews" className="vc-reviews">See Reviews {data?.review_count && data?.review_count}</Link>

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
                <div>
                    {data?.about_description && <h3 className="vc-about-us">About Us</h3>}
                    <p className="vc-about-content vc-markdown my-3">
                        <ReactMarkdown>
                            {isExpanded ? content : `${shortContent}${content.length > shortContentLength ? '...' : ''}`}
                        </ReactMarkdown>
                    </p>
                    {content.length > shortContentLength && (
                        <span
                            style={{ marginLeft: '0px' }}
                            className="text-red view-all cursor-pointer"
                            onClick={toggleExpand}
                        >
                            {isExpanded ? 'Show Less' : 'Show All'}
                        </span>
                    )}
                </div>


                {data?.branches.length > 0 && (
                    <div>
                        <h3 className="vc-about-us" style={{ marginTop: '20px' }}>Our Branches</h3>
                        <p className="vc-para">
                            {data?.branches?.slice(0, count).map((item) => item?.city).join(", ")}
                            {data?.branches.length > 6 && (
                                showAll ? (
                                    <span className="text-red view-all ms-2 cursor-pointer" onClick={onHandleShow}>
                                        Show All
                                    </span>
                                ) : (
                                    <span className="text-red view-all ms-2 cursor-pointer" onClick={onHandleClose}>
                                        Show Less
                                    </span>
                                )
                            )}
                        </p>
                    </div>
                )}


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
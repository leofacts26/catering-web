"use client"
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Heading from '@/components/Heading';
import Navbar from '@/components/Navbar';
import Subscribe from '@/components/Subscribe';
import BrandedCaters from '@/components/cards/BrandedCaters';
import ExploreCaterersByOccasion from '@/components/cards/ExploreCaterersByOccasion';
import ExploreCaters from '@/components/cards/ExploreCaters';
import ExpoloreCuisinesCard from '@/components/cards/ExpoloreCuisinesCard';
import PopularCaters from '@/components/cards/PopularCaters';
import RecentSearchCard from '@/components/cards/RecentSearchCard';
import Container from '@mui/material/Container';
import CateringSearchBar from '@/components/catering/CateringSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearFiltersGlobal } from '@/app/features/user/homeSlice';
import { fetchCateringSearchCards, fetchOccasionCateringTypes, resetFilters } from '@/app/features/user/cateringFilterSlice';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';


const page = () => {
    const { userDetails } = useSelector((state) => state.user)
    const { selectedLocation } = useGetLocationResults()

    // console.log(selectedLocation, "selectedLocationselectedLocation");


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearFiltersGlobal());
        dispatch(resetFilters());
    }, [dispatch])

    return (
        <>
            <section className='nav-bg'>
                <Navbar cateringHome />
            </section>
            <div className="search-container">
                <div className="container-search">
                    <Container maxWidth="lg">
                        <CateringSearchBar searchLink="/catering-search" />
                    </Container>
                </div>
            </div>
            <RecentSearchCard />
            {/* <Heading title="Explore Cuisines" subHeading /> */}
            <ExpoloreCuisinesCard />
            <Heading title="Explore Caterers around INDIA" subHeading />
            <ExploreCaters />

            <Heading
                title={`Branded Caterers in ${selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                    ? selectedLocation.terms[0].value
                    : userDetails?.city || 'INDIA'
                    }`}
                subHeading
            />            <BrandedCaters />

            <PopularCaters
                title={`Popular Caterers in ${selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                        ? selectedLocation.terms[0].value
                        : userDetails?.city || 'INDIA'
                    }`}
            />
            <Heading title="Explore Caterers by Occasions" subHeading />
            <ExploreCaterersByOccasion />
            <Heading title="FAQ's" center subHeading />
            <Faq />
            <Subscribe />
            <Footer />
        </>
    )
}

export default page
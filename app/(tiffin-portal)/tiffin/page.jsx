"use client"
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Heading from '@/components/Heading';
import Navbar from '@/components/Navbar';
import Subscribe from '@/components/Subscribe';
import ExploreCaters from '@/components/cards/ExploreCaters';
import ExpoloreCuisinesCard from '@/components/cards/ExpoloreCuisinesCard';
import PopularCaters from '@/components/cards/PopularCaters';
import RecentSearchCard from '@/components/cards/RecentSearchCard';
import Container from '@mui/material/Container';
import TiffinSearchBar from '@/components/tiffin/TiffinSearchBar';
import BrandedTiffenCaters from '@/components/cards/BrandedTiffenCaters';
import { useEffect } from 'react';
import { clearFiltersGlobal } from '@/app/features/tiffin/tiffinFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import PopularTiffins from '@/components/cards/PopularTiffins';
import ExploreTiffins from '@/components/cards/ExploreTiffins';

const page = () => {
    const { userDetails } = useSelector((state) => state.user)
    // console.log(userDetails, "userDetails");
    return (
        <>
            <section className='nav-bg-tiffin'>
                <Navbar cateringHome />
            </section>
            <div className="search-container">
                <div className="container-search">
                    <Container maxWidth="md">
                        <TiffinSearchBar searchLink="/tiffin-search" />
                    </Container>
                </div>
            </div>
            <RecentSearchCard />

            <ExpoloreCuisinesCard />
            <Heading title="Explore Tiffins around INDIA" subHeading />
            <ExploreTiffins />


            <BrandedTiffenCaters />

            <Heading title={`Popular Tiffins in ${userDetails?.city ? userDetails?.city : 'Chennai'}`} subHeading />
            <PopularTiffins />

            {/* <Heading title="Explore Tiffins by Occasions" subHeading /> */}
            {/* <ExploreCaterersByOccasion /> */}
            <Heading title="FAQ's" center subHeading />
            <Faq tiffin />
            <Subscribe />
            <Footer />
        </>
    )
}

export default page
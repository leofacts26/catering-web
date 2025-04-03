"use client"
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Heading from '@/components/Heading';
import Navbar from '@/components/Navbar';
import Subscribe from '@/components/Subscribe';
import RecentSearchCard from '@/components/cards/RecentSearchCard';
import Container from '@mui/material/Container';
import TiffinSearchBar from '@/components/tiffin/TiffinSearchBar';
import { useSelector } from 'react-redux';
import PopularTiffins from '@/components/cards/PopularTiffins';
import ExploreTiffins from '@/components/cards/ExploreTiffins';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';
import ExpoloreKitchenCardTiffin from '@/components/cards/ExpoloreCuisinesCardTiffin';
import FaqCaterer from '@/components/FaqCaterer';

const page = () => {
    // const { userDetails } = useSelector((state) => state.user)
    const { selectedLocation } = useGetLocationResults()

    // console.log(userDetails, "userDetails");
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
            <RecentSearchCard />

            <ExpoloreKitchenCardTiffin />
            <Heading title="Explore Tiffins around INDIA" subHeading />
            <ExploreTiffins />


            {/* <BrandedTiffenCaters /> */}

            <Heading title={`Popular Tiffins in ${selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                ? selectedLocation.terms[0].value
                : 'INDIA'}`} subHeading />
            <PopularTiffins />

            {/* <Heading title="Explore Tiffins by Occasions" subHeading /> */}
            {/* <ExploreCaterersByOccasion /> */}
            <Heading title="FAQ's" center subHeading />
            <FaqCaterer tiffin />
            <Subscribe />
            <Footer />
        </>
    )
}

export default page
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
import { useSelector } from 'react-redux';


const page = () => {
    const { userDetails } = useSelector((state) => state.user)

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
            <RecentSearchCard />
            {/* <Heading title="Explore Cuisines" subHeading /> */}
            <ExpoloreCuisinesCard />
            <Heading title="Explore Caterers around INDIA" subHeading />
            <ExploreCaters />

            <Heading title={`Branded Caterers in ${userDetails?.city ? userDetails?.city : 'Chennai'}`} subHeading />
            <BrandedCaters />

            <PopularCaters title={`Popular Caterers in ${userDetails?.city ? userDetails?.city : 'Chennai'}`} />
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
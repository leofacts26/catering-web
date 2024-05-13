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
import TiffinSearchBar from '@/components/tiffin/TiffinSearchBar';

const page = () => {
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
            <Heading title="Your Recent Searches" />
            <RecentSearchCard />
            <Heading title="Explore Cuisines" subHeading />
            <ExpoloreCuisinesCard />
            <Heading title="Explore Caterers around INDIA" subHeading />
            <ExploreCaters />
            <Heading title="Branded Caterers in Chennai" subHeading />
            <BrandedCaters />
            <Heading title="Popular Caterers in Chennai" center subHeading />
            <PopularCaters />
            <Heading title="Explore Caterers by Occasions" subHeading />
            <ExploreCaterersByOccasion />
            <Heading title="FAQ's" center subHeading />
            <Faq tiffin />
            <Subscribe />
            <Footer />
        </>
    )
}

export default page
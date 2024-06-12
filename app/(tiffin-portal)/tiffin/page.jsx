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
import BrandedTiffenCaters from '@/components/cards/BrandedTiffenCaters';

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
            <RecentSearchCard />
            <Heading title="Explore Cuisines" subHeading />
            <ExpoloreCuisinesCard />
            <Heading title="Explore Tiffins around INDIA" subHeading />
            <ExploreCaters />
            <Heading title="Branded Tiffins in Chennai" subHeading />
            <BrandedTiffenCaters />
            <Heading title="Popular Tiffins in Chennai" center subHeading />
            <PopularCaters />
            <Heading title="Explore Tiffins by Occasions" subHeading />
            <ExploreCaterersByOccasion />
            <Heading title="FAQ's" center subHeading />
            <Faq tiffin />
            <Subscribe />
            <Footer />
        </>
    )
}

export default page
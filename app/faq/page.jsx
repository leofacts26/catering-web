import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';

export default function Page() {
    return <>
        <section className='nav-bg nav-bg-footer'>
            <Navbar cateringHome />
        </section>


        <Container className="about-us mt-4">

            <h1 className="mb-4"> FAQ's </h1>

            <Faq />


        </Container>

        <Footer />
    </>
}
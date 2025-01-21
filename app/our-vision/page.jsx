import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';

export default function Page() {
    return <>
        <section className='nav-bg nav-bg-footer'>
            <Navbar cateringHome />
        </section>

        <Container className="about-us mt-4">
            <h1 className="mb-2"> Our Vision </h1>
            <p> To become the world's most trusted and innovative online marketplace for catering and tiffin services, connecting customers with reliable service providers while empowering businesses to thrive. </p>

            <p>We envision a future where:</p>
            <p className="my-3">1. <b>Global Connectivity:</b> Catering and tiffin service providers from all regions can showcase their unique offerings to a global audience seamlessly.</p>
            <p className="my-3">2. <b>Technology-Led Transformation:</b> Advanced tools and insights revolutionize how food service providers operate, ensuring efficiency, quality, and sustainability.</p>
            <p className="my-3">3. <b>Enhanced Customer Experience:</b> Every customer can access diverse and trustworthy services tailored to their unique needs, delivered with excellence.</p>
            <p className="my-3">4. <b>Sustainable Growth:</b> Vendors can grow their businesses with transparency, trust, and fairness, fostering economic opportunities across communities.</p>
            <p className="my-3">5. <b>Leadership in Innovation:</b> By setting new industry benchmarks, we aim to redefine standards for convenience, quality, and reliability in food services.</p>
            <p className="my-3">Our ultimate goal is to build a vibrant ecosystem where every vendor and customer thrives together, driven by collaboration, innovation, and trust.</p>

        </Container>

        <Footer />
    </>
}
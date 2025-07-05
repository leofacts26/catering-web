import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';

export const metadata = {
    title: 'Cancellation & Refund Policy - Caterings & Tiffins',
};

export default function Page() {
    return <>
        <section className='nav-bg nav-bg-footer'>
            <Navbar cateringHome />
        </section>


        <Container className="about-us mt-4">
            <h1 className="mb-2"> Cancellation & Refund Policy </h1>
            <p> Thank you for subscribing to Caterings & Tiffins. We value your business and strive to provide excellent service. Please read this policy carefully regarding the cancellation of your subscription. </p>

            <p className="my-3">1. <b>Cancellation Process:</b> You may cancel your Monthly subscription within 3 days & Annual subscription within 7 days from the date of subscription. Refund will be issued, if the cancellation raised within this time period on a prorate basis.</p>

            <p className="my-3">2. <b>Refund Policy:</b> We do not issue refunds for full or partial subscription periods after the cancellation date. When you cancel, you will continue to have access to your subscription until the end of your current billing period.</p>

            <p className="my-3">3. <b>Recurring Billing:</b> Subscriptions are automatically renewed unless cancelled. You authorize us to charge your provided payment method at the beginning of each billing period.</p>

            <p className="my-3">4. <b>Renewal Cancellation Deadline:</b> To avoid being charged for the next billing cycle, you must cancel your subscription 48 hours before the renewal date. Cancellations made after the renewal date will be effective for the following billing cycle.</p>




        </Container>

        <Footer />
    </>
}
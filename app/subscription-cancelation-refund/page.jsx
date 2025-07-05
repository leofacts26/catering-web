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


        <Container className="disclaimer mt-4">
            <h1 className="mb-2">Cancellation & Refund Policy
            </h1>

            <p>Thank you for subscribing to Caterings & Tiffins.
            </p>
            <p>We value your business and strive to provide excellent service. Please read this policy carefully
                regarding the cancellation and refund of your subscription. </p>




            <h2>Cancellation Process</h2>
            <p>You may cancel your Monthly subscription within 3 days and Annual subscription
                within 7 days from the date of subscription. </p>
            <p>A pro-rated refund will be issued if cancellation is requested within this time period. </p>
            <p>To initiate a cancellation, please contact our support team through the registered email
                address or via your dashboard account. </p>
            <p>Include your subscription ID, reason for cancellation, and bank/payment details if
                required.</p>




            <h2>Refund Policy</h2>
            <p>Refunds are only allowed if the cancellation is requested within the above-mentioned
                timeframes (3 days for Monthly, 7 days for Annual). </p>
            <p>Refunds will be processed to the original payment method within 7-10 business days
                after approval. </p>
            <p>No refunds will be issued for cancellations made after the eligible cancellation
                window, whether partial or full. </p>
            <p>Upon cancellation, you will still have access to your subscription until the end of the
                current billing period. </p>




            <h2>Recurring Billing </h2>
            <p>All subscriptions are set to auto-renew unless cancelled in advance.</p>
            <p>By subscribing, you authorize us to charge your provided payment method at the
                beginning of each billing cycle.</p>




            <h2>Renewal Cancellation Deadline </h2>
            <p>To avoid being charged for the next billing cycle, you must cancel your subscription at
                least 48 hours before the renewal date.
            </p>
            <p>Cancellations made after the renewal charge will apply from the next billing cycle
                onward.</p>

            <h2>Renewal Cancellation Deadline </h2>
            <p> <b>Note:</b> We do not offer any shipping or delivery services. Our platform is a digital service only
                and does not involve the delivery of any physical goods. </p>


            <br />
            <br />



        </Container>
        <Footer />
    </>
}
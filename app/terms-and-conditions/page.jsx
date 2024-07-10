import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';

export default function Page() {
    return <>
        <section className='nav-bg nav-bg-footer'>
            <Navbar cateringHome />
        </section>


        <Container className="about-us mt-4">
            <h1 className="mb-2">Terms and Conditions</h1>
            <p> Welcome to our online Caterings & Tiffins vendor service marketplace! These Terms and Conditions
                govern your use of our platform. By accessing or using our platform, you agree to be bound by these
                Terms and Conditions. Please read them carefully before proceeding. </p>

            <h2>1. Introduction & Acceptance of Terms</h2>
            <p>These Terms and Conditions ("Terms") govern your use of the online catering and tiffin service
                vendor marketplace ("Marketplace") provided by Caterings & Tiffins ("we", "us", or "our"). By
                accessing or using the Marketplace, you agree to be bound by these Terms. If you do not agree to all
                of these Terms, you are not authorized to use the Marketplace.
            </p>

            <h2>2. Definitions</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>User: Any individual or entity who uses the Marketplace, including customers and vendors</li>
                <li>Customer: A User who orders catering or tiffin services through the Marketplace.</li>
                <li>Vendor: A User who provides catering or tiffin services through the Marketplace.</li>
                <li>Order: A request by a customer for catering or tiffin services from a Vendor through the
                    Marketplace.</li>
            </ul>


            <h2>3. User Accounts</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Users must create an account to access certain features of the Marketplace.</li>
                <li>You are responsible for maintaining the confidentiality of your account information,
                    including your username and password. You are also responsible for all activities that occur
                    under your account.</li>
                <li>You agree to notify us immediately of any unauthorized use of your account or any other
                    breach of security.</li>
            </ul>


            <h2>4. Vendor Responsibilities</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Vendors are responsible for:</li>
                <li>Providing accurate and complete information about their services, including pricing, menus,
                    and availability.
                </li>
                <li>Complying with all applicable laws and regulations related to food safety and preparation.</li>
                <li>Preparing and delivering orders according to the agreed-upon specifications and within the
                    specified timeframe.</li>
                <li>Maintaining a professional and responsive communication with Customers.</li>
                <li>Obtaining any necessary licenses and permits to operate their business.</li>
            </ul>

            <h2>5. Customer Responsibilities</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Customers are responsible for:</li>
                <li>Providing accurate and complete information when placing an order.</li>
                <li>Reviewing and understanding the menu, pricing, and terms of service before placing an
                    order.</li>
                <li>Making payment for their orders in a timely manner</li>
                <li>Communicating any special requests or dietary restrictions to the Vendor</li>
                <li>Cancelling orders within the timeframe specified by the Vendor.
                </li>
            </ul>


            <h2>6. Registration</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>To use certain features of our platform, you may be required to register for an account.</li>
                <li>You agree to provide accurate, current, and complete information during the registration
                    process and to update such information to keep it accurate, current, and complete.</li>
                <li>You are solely responsible for maintaining the confidentiality of your account credentials and
                    for any activity that occurs under your account.</li>
            </ul>



            <h2>7. Service Providers</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Our platform connects users with catering and tiffin vendors ("Service Providers").
                </li>
                <li>We do not endorse or guarantee the quality, safety, or legality of any services provided by
                    Service Providers.
                </li>
                <li>Users are solely responsible for evaluating and selecting Service Providers and for any
                    interactions with Service Providers.
                </li>
            </ul>


            <h2>8. Cancellations and Refunds</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Users may cancel orders subject to the cancellation policy of the respective Service Provider.</li>
                <li>Refunds, if applicable, will be subject to the refund policy of the respective Service Provider.
                </li>
            </ul>


            <h2>9. User Conduct</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Users agree to use our platform in compliance with all applicable laws and regulations.</li>
                <li>Users agree not to engage in any conduct that may disrupt, interfere with, or harm the
                    operation of our platform or the experience of other users.</li>
            </ul>


            <h2>10. Intellectual Property</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Our platform and its contents, including but not limited to text, graphics, logos, and images,
                    are the property of our company or its licensors and are protected by copyright and other
                    intellectual property laws.</li>
                <li>Users may not reproduce, distribute, modify, or otherwise use any content from our
                    platform without our prior written consent.
                </li>
            </ul>

            <h2>11. Disclaimer of Warranties</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Our platform is provided on an "as is" and "as available" basis, without any warranties of any
                    kind, either express or implied.
                </li>
                <li>We do not warrant that our platform will be uninterrupted or error-free, or that any defects
                    will be corrected.</li>
            </ul>

            <h2>12. Limitation of Liability</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>
                    To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special,
                    consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
                    indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your access
                    to or use of or inability to access or use our platform, (ii) any conduct or content of any third party
                    on our platform, or (iii) unauthorized access, use, or alteration of your transmissions or content.
                </li>
            </ul>

            <h2>13. Modifications to Terms</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>
                    We reserve the right to modify these Terms and Conditions at any time. Any changes will be
                    effective immediately upon posting on our platform. Your continued use of our platform after any
                    such changes constitutes your acceptance of the new Terms and Conditions.
                </li>
            </ul>


            <h2>14. Governing Law</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of
                    Indian Jurisdiction, without regard to its conflict of law principles.
                </li>
            </ul>

            <h2>15. Contact Us</h2>
            <ul style={{ listStyleType: 'lower-alpha' }}>
                <li className="mb-4">
                    If you have any questions about these Terms and Conditions, please raise a support ticket on our
                    platform.
                </li>
            </ul>












        </Container>
        <Footer />
    </>
}
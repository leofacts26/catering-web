import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';

export const metadata = {
    title: 'Privacy Policy - Caterings & Tiffins',
};

export default function Page() {
    return <>
        <section className='nav-bg nav-bg-footer'>
            <Navbar cateringHome />
        </section>


        <Container className="disclaimer mt-4">
            <h1 className="mb-2">Privacy Policy</h1>

            <p>This Privacy Policy describes how Caterings & Tiffins ("we", "us", or "our") collects, uses, and shares
                information when you use our online marketplace platform for catering and tiffin services (referred to as the
                "Service"). By accessing or using the Service, you agree to the terms of this Privacy Policy.</p>
            <p>Caterings & Tiffins is very stringent in maintaining the privacy of the customers information. Your privacy is
                highly important for us. Upon agreeing the T&C in our website, we consider that, you accept this privacy
                agreement and permit us to collect and store such data. You also confirm that you are above the age of 18
                years and you are solely responsible for the services you have rendered through our website using all your
                personal and financial information. We would also consider that any information you provide while booking or
                registering for services is true to your knowledge and you are aware of your purchases thereof.</p>

            <h2>Payment Privacy</h2>
            <p>We do not store your credit / debit card information’s or any data related to payment. We always respect your
                privacy. At every step, we make sure our customers’ & vendors privacy is protected and their personal
                information is kept confidential. We provide our customers with the information that we collect about them,
                upon request from them. We also have facilities whereby they can update or change any relevant information.
            </p>

            <h2>Information We Collect</h2>
            <p>Personal Information: When you register for an account, contact a vendor, or interact with our Service, we
                may collect personal information such as your name, email address, phone number, delivery address, KYC
                documents, and payment information.
            </p>
            <p>Usage Information: We may collect information about how you interact with our Service, such as the pages
                you visit, the search terms you enter, and other actions you take on the platform.</p>
            <p>Device Information: We automatically collect certain information about your device, including your IP address,
                browser type, operating system, and device identifiers.
            </p>
            <p>Cookies and Similar Technologies: We use cookies and similar tracking technologies to provide and personalize
                the Service, analyse usage, and enhance user experience.</p>

            <h2>How We Use Information</h2>
            <p>To Provide and Improve the Service: We use the information collected to operate, maintain, and improve our
                Service, including processing orders, facilitating communication between users, and personalizing your
                experience.
            </p>
            <p>To Communicate with You: We may use your contact information to send you important updates, service
                announcements, and marketing communications.</p>
            <p>For Research and Analytics: We may use aggregated and anonymized data for research, analytics, and
                reporting purposes to better understand user preferences and trends.
            </p>
            <p>To Ensure Security: We may use information to detect and prevent fraud, unauthorized access, and other
                illegal activities.</p>

            <h2>How We Share Information</h2>
            <p>With Service Providers: We may share information with third-party service providers who help us operate,
                maintain, and improve our Service.</p>
            <p>With Caterers and Tiffin Providers: We share necessary information with caterers and tiffin providers to fulfil
                orders and provide services.</p>
            <p>For Legal Purposes: We may disclose information in response to legal requests, to comply with applicable laws,
                regulations, or legal processes, or to protect our rights, property, or safety, or the rights, property, or safety of
                others.
            </p>
            <p>In Connection with Business Transfers: If we are involved in a merger, acquisition, financing, or sale of all or a
                portion of our business, information may be transferred as part of that transaction.</p>
            <p>In some cases, such as when it comes to employing legal methods to collect a delinquent account, a medical
                emergency or suspicion of illegal activities do we legally access and disclose our customers’ personal
                information. We use the information we collect on our site to offer a higher browsing experience. And also, to
                inform you about the services whenever we believe it's necessary.
            </p>


            <h2>Your Choices</h2>
            <p>You can choose not to provide certain information, but it may limit your ability to use certain features of the
                Service. You can also opt-out of receiving marketing communications from us by following the unsubscribe
                instructions provided in such communications.</p>

            <h2>Data Retention</h2>
            <p>We retain personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy,
                unless a longer retention period is required or permitted by law.</p>

            <h2>Security</h2>
            <p>We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or
                destruction.</p>

            <h2>Children's Privacy</h2>
            <p>Our Service is not directed to children under the age of 13, and we do not knowingly collect personal
                information from children under the age of 13. If you believe that a child under the age of 13 has provided
                personal information to us, please contact us immediately.</p>

            <h2>Changes to this Privacy Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email
                or by posting a notice on our website prior to the change becoming effective. Your continued use of the
                Service after the effective date of the revised Privacy Policy constitutes acceptance of the terms.</p>




        </Container>
        <Footer />
    </>
}
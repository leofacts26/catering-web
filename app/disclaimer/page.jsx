import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';


export const metadata = {
    title: 'Disclaimer - Caterings & Tiffins',
};


export default function Page() {
    return <>
        <section className='nav-bg nav-bg-footer'>
            <Navbar cateringHome />
        </section>


        <Container className="disclaimer mt-4">
            <h1 className="mb-2">Disclaimer</h1>

            <h2>Service Representation: </h2>
            <p>Our platform serves as a marketplace connecting users with catering & tiffin service
                vendors. We do not directly provide these services, and therefore, cannot guarantee the quality, accuracy, or
                suitability of vendors' offerings.</p>

            <h2>Vendor Responsibility:</h2>
            <p>Vendors listed on our platform are independent entities responsible for their own
                services, including food preparation, delivery, and customer service. We do not assume liability for any actions
                or omissions of vendors.</p>

            <h2>Accuracy of Information:</h2>
            <p>While we strive to maintain accurate and up-to-date information about vendors, we
                cannot guarantee the completeness or reliability of their profiles, menus, pricing, or availability.</p>

            <h2>User Discretion Advised:</h2>
            <p>Users are advised to exercise caution and conduct their own due diligence when
                engaging with vendors. Reviews and ratings provided by other users are for informational purposes only and
                may not reflect the full range of experiences.</p>

            <h2>User Responsibility: </h2>
            <p> Users are responsible for their own actions, decisions, and interactions on our platform. It
                is recommended to review vendor policies, terms of service, and privacy policies before engaging with any
                vendor.</p>

            <h2>Health and Safety: </h2>
            <p>We encourage vendors to adhere to applicable health and safety regulations. However,
                users should be aware that consumption of food prepared by vendors carries inherent risks, including allergies
                and foodborne illnesses. </p>

            <h2>Contractual Relationships:</h2>
            <p>Any agreements or transactions entered into between users and vendors are solely
                between those parties. We are not a party to any such agreements and disclaim any liability arising from
                disputes or dissatisfaction with services rendered. </p>

            <h2>Third-Party Links:</h2>
            <p>Our platform may contain links to third-party websites or services. These links are provided
                for convenience and informational purposes only. We do not endorse or have control over the content,
                policies, or practices of any third-party websites</p>

            <h2>Intellectual Property:</h2>
            <p> All content provided on our platform, including but not limited to logos, trademarks, and
                textual content, is the property of our company or respective owners and may not be reproduced without
                permission. </p>

            <h2>Limitation of Liability:</h2>
            <p>  In no event shall we be liable for any direct, indirect, incidental, special, or
                consequential damages arising out of or in any way connected with the use of our platform or the services
                provided by vendors. </p>

            <h2>Indemnification: </h2>
            <p> By using our platform, users agree to indemnify and hold harmless our company, its affiliates,
                officers, directors, employees, agents, and licensors from any claims, losses, liabilities, damages, costs, or
                expenses arising out of or related to their use of our services or any breach of these terms.  </p>

            <h2>Modification of Terms:</h2>
            <p> We reserve the right to modify or update these disclaimers at any time without prior
                notice. Users are responsible for regularly reviewing this disclaimer for changes. </p>

            <h2>Legal Jurisdiction:</h2>
            <p className="mb-4"> This disclaimer shall be governed by and construed in accordance with the laws of the
                jurisdiction in which our company is registered, without regard to conflicts of law principles.
                By accessing or using our platform, users agree to abide by these disclaimers and any other terms and
                conditions outlined in our terms of service. If you do not agree with these terms, please refrain from using our
                platform.</p>





        </Container>
        <Footer />
    </>
}
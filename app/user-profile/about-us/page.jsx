"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import { display } from '@mui/system';


const Page = () => {
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue.toString());
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='about-us-mobile-box'>
                    <Tabs
                        className='about-us-mobile'
                        value={parseInt(value, 10)}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#c33332",
                            }
                        }}
                    >
                        <Tab
                            label="About"
                            value="0"
                            sx={{
                                borderBottom: value === '0' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Privacy Policy"
                            value="1"
                            sx={{
                                borderBottom: value === '1' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Security Policy"
                            value="2"
                            sx={{
                                borderBottom: value === '2' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Terms & Conditions"
                            value="3"
                            sx={{
                                borderBottom: value === '3' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Disclaimer"
                            value="4"
                            sx={{
                                borderBottom: value === '4' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                    </Tabs>
                </Box>
                <TabPanel value="0" className='p-1'>
                    <Container className="about-us mt-4">
                        <h1 className="mb-2">About Us: Your One-Stop Shop for Delicious Caterings & Tiffin Solutions </h1>
                        <p>Welcome to Caterings & Tiffins, your ultimate destination for discovering and booking exceptional catering services and delectable daily tiffin options! We're passionate about connecting you with culinary experiences that cater to every occasion and appetite. </p>

                        <h2>Our Story: </h2>
                        <p>Caterings & Tiffins was born from a simple yet powerful idea: to make finding delicious and convenient food solutions effortless. We envisioned a platform that would bridge the gap between talented caterers and tiffin vendors with individuals seeking culinary satisfaction. </p>

                        <h2>What We Offer: </h2>

                        <ul>
                            <li> <b>Catering for Every Occasion:</b> Whether you're planning a grand wedding, a corporate event, a casual gathering, or simply seeking a hassle-free daily meal, we offer a diverse range of catering options to suit your needs. Explore a variety of cuisines, catering styles, and budget-friendly packages to find the perfect fit for your celebration. </li>
                            <li> <b>Daily Tiffin Delights:</b> Craving the comfort and warmth of home-cooked food? Our platform connects you with passionate tiffin vendors who prepare delicious and healthy meals using fresh, high-quality ingredients. Choose from a wide variety of cuisines and dietary options to satisfy your everyday cravings. </li>
                            <li> <b>Seamless User Experience:</b> Our user-friendly platform makes finding the perfect caterer or tiffin vendor a breeze. Browse & compare vendors, request quotes, and manage your orders conveniently, all in one place. </li>
                        </ul>

                        <h2>Our Commitment: </h2>
                        <p>We are dedicated to providing a platform that is: </p>

                        <ul>
                            <li> <b>Convenient:</b> Simplifying your food planning, catering & tiffin service needs with a hassle-free experience. </li>
                            <li> <b>Reliable:</b> Connecting you with experienced and professional caterers and passionate tiffin vendors who prioritize quality and hygiene. </li>
                            <li> <b>Diverse:</b> Offering a wide range of options to cater to all tastes, budgets, and dietary requirements. </li>
                            <li> <b>High-Quality:</b> Ensuring a seamless and enjoyable culinary experience for every occasion. </li>
                        </ul>

                        <h2>Join our Culinary Community: </h2>
                        <p className="mb-4">Catering & Tiffin’s is more than just a platform; it's a community that celebrates the joy of food and brings people together through delicious experiences. Whether you're seeking a caterer for a special event or a daily dose of home-cooked comfort, we're here to connect you with the perfect culinary solution. </p>

                    </Container>
                </TabPanel>
                <TabPanel value="1">
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
                </TabPanel>
                <TabPanel value="2">
                    <Container className="about-us mt-4">
                        <h1 className="mb-2">Security Policy
                        </h1>

                        <h2 className="mt-4">Introduction</h2>
                        <p>The security policy outlines the measures and protocols to ensure the protection, confidentiality, integrity, and availability
                            of data and systems within the online Caterings & Tiffins vendor marketplace. The policy aims to safeguard sensitive
                            information, prevent unauthorized access, and maintain trust with vendors and customers.</p>

                        <h2>Access Control</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li> User Authentication: Implement strong authentication mechanisms such as username/password, multi-factor
                                authentication (MFA), or biometric verification for user access.</li>
                            <li> Role-Based Access Control (RBAC): Assign access privileges based on roles and responsibilities to restrict unauthorized
                                access to sensitive data.</li>
                            <li>Access Monitoring: Regularly monitor user access logs and employ intrusion detection systems to detect and prevent
                                unauthorized access attempts.
                            </li>
                            <li> We strongly recommend our customers to register and login with their own account before render or register any
                                service due to security purpose..</li>
                        </ul>

                        <h2>Data Protection</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li>Encryption: Encrypt sensitive data at rest and in transit using industry-standard encryption algorithms to prevent
                                unauthorized access.</li>
                            <li>Data Minimization: Collect and retain only necessary customer and vendor information, minimizing the risk of data
                                exposure in case of a breach.
                            </li>
                            <li>Data Backup: Regularly backup data to secure off-site locations to ensure data integrity and availability in the event of
                                data loss or corruption.</li>
                        </ul>


                        <h2>Network Security</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li>Firewalls: Implement firewalls to monitor and control incoming and outgoing network traffic, preventing unauthorized
                                access and malicious activities.</li>
                            <li>Secure Transmission: Use secure protocols such as HTTPS to encrypt data transmitted between clients and servers,
                                mitigating the risk of eavesdropping and data interception.</li>
                            <li> Network Segmentation: Segment network resources to isolate critical systems from non-essential components, reducing
                                the impact of potential security breaches.
                            </li>
                        </ul>


                        <h2>Vendor Management</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li> Vendor Due Diligence: Conduct thorough background checks and assessments of vendors to ensure they adhere to
                                security best practices and compliance requirements.</li>
                            <li>Vendor Contracts: Establish contractual agreements outlining security responsibilities, confidentiality clauses, and
                                breach notification procedures to hold vendors accountable for security incidents.
                            </li>
                            <li>Regular Audits: Periodically audit vendor security practices and compliance with contractual obligations to mitigate risks
                                associated with third-party services.
                            </li>
                        </ul>


                        <h2>Incident Response</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li>Incident Reporting: Establish clear procedures for reporting security incidents and breaches promptly to designated
                                personnel for investigation and mitigation.
                            </li>
                            <li>Response Plan: Develop and maintain an incident response plan outlining roles, responsibilities, and procedures for
                                containing, eradicating, and recovering from security incidents.</li>
                            <li>Post-Incident Analysis: Conduct post-incident analysis to identify root causes, lessons learned, and areas for
                                improvement to enhance incident response capabilities.</li>
                        </ul>


                        <h2>Training and Awareness</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li> Security Awareness Training: Provide regular training sessions to employees, vendors, and stakeholders to raise
                                awareness about security threats, best practices, and their roles in safeguarding data and systems.</li>
                            <li>Policy Acknowledgment: Ensure all users acknowledge and adhere to the security policy and related procedures,
                                emphasizing their responsibility in maintaining a secure environment.</li>
                        </ul>


                        <h2>Compliance and Regulations</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li> Compliance Assessment: Regularly assess the marketplace's compliance with relevant regulations such as DPDP and
                                industry-specific standards to ensure data protection and regulatory compliance.</li>
                            <li>Privacy Protection: Implement measures to protect customer privacy rights, including data access controls, consent
                                mechanisms, and transparent data handling practices.</li>
                        </ul>


                        <h2>Continuous Improvement</h2>
                        <ul style={{ listStyleType: 'lower-alpha' }}>
                            <li>Security Risk Assessment: Conduct periodic security risk assessments to identify vulnerabilities, evaluate risks, and
                                prioritize mitigation efforts to strengthen the security posture of the marketplace.</li>
                            <li>Security Updates: Stay current with security patches, updates, and security advisories for all software, hardware, and
                                systems to address known vulnerabilities and reduce the risk of exploitation.</li>
                        </ul>

                        <h2>Conclusion</h2>
                        <p>This security policy serves as a foundation for maintaining a secure and trusted online caterings & tiffins vendor
                            marketplace. All stakeholders are responsible for adhering to these guidelines and collaborating to uphold the highest
                            standards of security and data protection. Regular reviews and updates to the policy are essential to adapt to evolving
                            threats and technologies.</p>
                        <p className="mb-5">By adhering to this security policy, the online caterings and tiffins vendor marketplace can ensure the confidentiality,
                            integrity, and availability of data and systems, fostering trust among vendors and customers while mitigating risks
                            associated with cyber threats and security breaches.</p>

                    </Container>
                </TabPanel>
                <TabPanel value="3">
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
                </TabPanel>
                <TabPanel value="4">
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
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Page;

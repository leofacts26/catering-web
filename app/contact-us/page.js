import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import ContactUsComp from './ContactUs';

export const metadata = {
    title: 'Contact Us - Caterings & Tiffins',
};


const ContactUs = () => {


  return (
    <>
      <section className='nav-bg nav-bg-footer'>
        <Navbar cateringHome />
      </section>

      <ContactUsComp />


      <Footer />
    </>

  );
};

export default ContactUs;

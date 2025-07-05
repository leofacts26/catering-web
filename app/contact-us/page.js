"use client"
import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submit
    alert("Form submitted!");
  };

  return (
    <>
      <section className='nav-bg nav-bg-footer'>
        <Navbar cateringHome />
      </section>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" mb={4}>
          Have questions or need a custom catering solution? Reach out to us!
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Your Name" margin="normal" required sx={{
                '& label.Mui-focused': {
                  color: '#c33332',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#c33332',
                  },
                },
              }} />
              <TextField fullWidth label="Email Address" type="email" margin="normal" required sx={{
                '& label.Mui-focused': {
                  color: '#c33332',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#c33332',
                  },
                },
              }} />
              <TextField fullWidth label="Phone Number" type="tel" margin="normal" required sx={{
                '& label.Mui-focused': {
                  color: '#c33332',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#c33332',
                  },
                },
              }} />
              <TextField
                fullWidth
                label="Your Message"
                multiline
                rows={4}
                margin="normal"
                required
                sx={{
                  '& label.Mui-focused': {
                    color: '#c33332',
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#c33332',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: '#c33332',
                  '&:hover': {
                    backgroundColor: '#a82c2b', // Slightly darker on hover
                  },
                }}
              >
                Send Message
              </Button>

            </form>
          </Grid>

          {/* Contact Info & Map */}
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Contact Details</Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Phone sx={{ mr: 1 }} /> <Typography>+91 98765 43210</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Email sx={{ mr: 1 }} /> <Typography>support@cateringsandtiffins.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn sx={{ mr: 1 }} /> <Typography>#93, 1st Floor, Nehru Road,
                  Kammanahalli Circle,
                  Bangalore – 560084, Karnataka, India</Typography>
              </Box>
            </Box>
            {/* Google Map Embed */}
            <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.990309204848!2d77.63091807794352!3d13.014500254571125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1720a8120da7%3A0x5b4cdf2dad9f0541!2sNehru%20Rd%20%26%20Kammanahalli%20Main%20Rd%2C%20St%20Thomas%20Town%2C%20Inasappa%20Layout%2C%20Kammanahalli%2C%20Bengaluru%2C%20Karnataka%20560043!5e1!3m2!1sen!2sin!4v1750161009956!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>

  );
};

export default ContactUs;

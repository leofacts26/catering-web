import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Footer = () => {
    return (
        <section className="footer-bg">
            <div className='footer-container'>
                <Stack direction="row" justifyContent="end" style={{ marginBottom: '30px' }}>
                    <img src="/img/footer/google-play-badge.png" alt="" className="img-fluid" style={{ width: '160px', objectFit: 'contain' }} />
                    <img src="/img/footer/apple.png" alt="" className="img-fluid" style={{ width: '150px', objectFit: 'contain' }} />
                </Stack>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={5}>
                            <Stack direction="row" justifyContent="start" alignItems="center" sx={{ height: '100%' }}>
                                <h2 className='footer-logo'><span className="footer-red">CATERINGS</span> <span className="footer-and">&</span> <span className="footer-orange">TIFFINS</span></h2>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={8} xl={7}>
                            <Grid container spacing={5}>
                                <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
                                    <h3 className="footer-sub-heading">Search</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li>Countries</li>
                                            <li>Region</li>
                                            <li>Zip Code</li>
                                            <li>City</li>
                                            <li>Area</li>
                                            <li>Cuisines</li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
                                    <h3 className="footer-sub-heading">Links</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li>Our Motive</li>
                                            <li>Our Mission</li>
                                            <li>FAQ</li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2} md={2.5} lg={2.5} xl={2.5}>
                                    <h3 className="footer-sub-heading">Partners</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li>Business</li>
                                            <li>Affiliate With Us</li>
                                            <li>Careers</li>
                                            <li>Inverstor Relations</li>
                                            <li>Partners Dispute</li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
                                    <h3 className="footer-sub-heading">Help Desk</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li>E - Mail</li>
                                            <li>Raise Ticket</li>
                                            <li>Get Call Back</li>
                                            <li>My Bookings</li>
                                            <li>Wish List</li>
                                            <li>My Account</li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
                                    <h3 className="footer-sub-heading">Contact Us</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li>hello@teckaa.com</li>
                                            <li>+1234567890</li>
                                            <li>+0987654321</li>
                                        </ul>
                                        <Stack direction="row" spacing={1} sx={{ marginTop: '10px' }}>
                                            <FacebookIcon />
                                            <InstagramIcon />
                                            <XIcon />
                                            <YouTubeIcon />
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Stack direction="row" justifyContent="center" sx={{ marginTop: '50px' }}>
                    <p className='footer-copywright'>Copyright © - CateringsandTiffins.com™ All Rights Reserved</p>
                </Stack>
            </div>
        </section>
    )
}

export default Footer
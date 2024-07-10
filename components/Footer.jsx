"use client"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const Footer = () => {

    const accessToken = useSelector((state) => state.user.accessToken);

    const onHandleError = () =>{
        toast.error("Please Login to access this resource!!")
    }

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
                                    <h3 className="footer-sub-heading">Home</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li><Link href="/about">About Us</Link></li>
                                            <li><Link href="/catering">Our Mission</Link></li>
                                            <li><Link href="/catering">Our Vision</Link></li>
                                            <li><Link href="/faq">FAQ's</Link></li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
                                    <h3 className="footer-sub-heading">Search</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li><Link href="/catering">Cuisine</Link></li>
                                            <li><Link href="/catering">Occasion</Link></li>
                                            <li><Link href="/catering">Location</Link></li>
                                            <li><Link href="/catering">Caterers</Link></li>
                                            <li><Link href="/tiffin">Tiffins</Link></li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2} md={2.5} lg={2.5} xl={2.5}>
                                    <h3 className="footer-sub-heading">Policies</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link href="/security-policy">Security Policy</Link></li>
                                            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                                            <li><Link href="/disclaimer">Disclaimer</Link></li>
                                            <li><Link href="/subscription-cancelation-refund">Cancellation & Refund Policy </Link></li>
                                            <li><Link href="/catering"> Partner With Us </Link></li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
                                    <h3 className="footer-sub-heading">Helpdesk</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                        <li>
                                                {accessToken ? (
                                                    <Link href={'javascript:void(0)'}>Raise Ticket</Link>
                                                ) : (
                                                    <Link onClick={onHandleError} href='javascript:void(0)'>Raise Ticket</Link>
                                                )}
                                            </li>
                                            <li>
                                                {accessToken ? (
                                                    <Link href={'/user-profile/my-inquiries'}>My Inquires</Link>
                                                ) : (
                                                    <Link onClick={onHandleError} href='javascript:void(0)'>My Inquires</Link>
                                                )}
                                            </li>
                                            <li>
                                                {accessToken ? (
                                                    <Link href={'/user-profile/my-wishlist'}>My Wishlist</Link>
                                                ) : (
                                                    <Link onClick={onHandleError} href='javascript:void(0)'>My Wishlist</Link>
                                                )}
                                            </li>
                                            <li>
                                                {accessToken ? (
                                                    <Link href={'/user-profile/user-profile'}>My Account</Link>
                                                ) : (
                                                    <Link onClick={onHandleError} href='javascript:void(0)'>My Account</Link>
                                                )}
                                            </li>
                                            <li><Link href="/catering">Newsletter</Link></li>
                                        </ul>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
                                    <h3 className="footer-sub-heading">Contact</h3>
                                    <Box>
                                        <ul className="footer-ul">
                                            <li><Link href="/catering">Support Email</Link></li>
                                            <li><Link href="/catering">Phone No</Link></li>
                                            <li><Link href="/catering">Address</Link></li>
                                            <li><Link href="/catering">Social Media Icons</Link></li>
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
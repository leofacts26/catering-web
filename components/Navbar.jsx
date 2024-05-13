"use client"
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import navlinks from '../data/navlinks.json'
import { useActivePath } from '@/helper';
import RegisterModal from './RegisterModal';
import UserIcon from './UserIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Notification from './Notification';
import Container from '@mui/material/Container';

const Navbar = ( ) => {
    const checkActivePath = useActivePath()
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [login, setLogin] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} className='desktop-nav'>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Link href="/" className='text-decoration-none'><HomeIcon className='nav-heading large-icon' /></Link>
                        <Link href="/" className='text-decoration-none'>
                            <h2 className='nav-heading'> Caterings & Tiffins</h2></Link>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {navlinks.map((navlink) => {
                            console.log(navlink, "navlinknavlinknavlinknavlink");
                            return (
                                <Link href={navlink.url} key={navlink.id} className={checkActivePath(navlink.url) ? 'active nav-link' : 'nav-link'}
                                >{navlink.name}</Link>
                            )
                        })}

                        {!login && <>
                            <RegisterModal />
                            <Link href="javascript:void(0)" onClick={() => setLogin(!login)} className="nav-link"
                            >Login</Link>
                        </>}

                        {login &&
                            <>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Link href="/user-profile/my-wishlist" className='notification-bg'>
                                        <FavoriteBorderIcon className='notification' style={{ color: '#ffffff' }} />
                                    </Link>
                                    <Notification />
                                </Stack>
                                <UserIcon />
                            </>
                        }

                    </Stack>
                </Stack>

                <Stack direction="row" justifyContent="end" >
                    <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu" className='mobile-nav'>
                        <MenuIcon style={{ color: '#ffffff' }} />
                    </IconButton>
                </Stack>

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    style={{ zIndex: '9999' }}
                >
                    <div style={{ width: 300 }}>
                        <Stack direction="row" justifyContent="space-around" alignItems="center" alignContent="center" sx={{ marginTop: '30px' }}>
                            <h2 className='nav-logo'><span className="footer-red">CATERINGS</span> & <span className="footer-orange">TIFFINS</span></h2>
                            <CloseIcon onClick={() => setDrawerOpen(false)} />
                        </Stack>

                        <ul style={{ marginTop: '25px' }}>
                            <li className='nav-link-li'>
                                <a href="#" className='nav-link-mobile'>Catering</a>
                            </li>
                            <li className='nav-link-li'>
                                <a href="#" className='nav-link-mobile'>Tiffen</a>
                            </li>
                            <li className='nav-link-li'>
                                <a href="#" className='nav-link-mobile'>List Your Service</a>
                            </li>
                        </ul>
                    </div>
                </Drawer>
            </Container>
        </>
    )
}

export default Navbar;

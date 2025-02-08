"use client"
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import navlinks from '../data/navlinks.json'
import mobilenavlinks from '../data/mobilenavlinks.json'
import { useActivePath } from '@/helper';
import RegisterModal from './RegisterModal';
import UserIcon from './UserIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Notification from './Notification';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import useResetCateringFilter from '@/hooks/useResetCateringFilter';
import useRegistration from '@/hooks/useRegistration';
import { useRouter } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '@/app/features/user/userSlice';
import toast from 'react-hot-toast';


const Navbar = ({ cateringHome }) => {
    const checkActivePath = useActivePath()
    const [drawerOpen, setDrawerOpen] = useState(false);
    // const [login, setLogin] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const clearCateringFilter = useResetCateringFilter()

    const accessToken = useSelector((state) => state.user.accessToken)
    const { handleClickOpen, handleRegisterClickOpen } = useRegistration();

    const { userDetails } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    const onLogout = () => {
        localStorage.clear();
        dispatch(logoutUser());
        // dispatch(resetFilters());
        // dispatch(clearTiffinSlice());

        toast.success("Logout Successfull")
        router.push('/')
        window.location.reload();
    }

    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} className='desktop-nav'>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {/* <Link href="/" className='text-decoration-none'></Link> */}
                        <Link href="/" className='text-decoration-none'>  <HomeIcon className='large-icon' /> </Link>
                        <h2 className='nav-heading'>
                            <Link href="/catering" className='text-decoration-none nav-heading'>Caterings</Link>  &
                            <Link href="/tiffin" className='text-decoration-none nav-heading ms-1'>Tiffins</Link> </h2>
                        {/* {cateringHome ? <img src="/img/catering-service-logo.png" alt="" className="img-fluid catering-logo" /> : <img src="/img/tiffin-logo.png" alt="" className="img-fluid catering-logo" /> }  */}
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {navlinks?.map((navlink) => {
                            return (
                                <Link href={navlink.url} key={navlink.id} className={checkActivePath(navlink.url) ? 'active nav-link' : 'nav-link'}
                                >{navlink.name}</Link>
                            )
                        })}

                        {!accessToken && (
                            <>
                                {/* <RegisterModal /> */}
                                {/* <LoginModal /> */}
                                <Link href="javascript:void(0)" onClick={handleRegisterClickOpen} className="nav-link"
                                >Signup</Link>
                                <Link href="javascript:void(0)" onClick={handleClickOpen} className="nav-link"
                                >Login</Link>
                            </>
                        )}


                        {accessToken && (
                            <>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Link href="/user-profile/my-wishlist" className='notification-bg'>
                                        <FavoriteBorderIcon className='notification' style={{ color: '#ffffff' }} />
                                    </Link>
                                    <Notification />
                                </Stack>
                                <UserIcon />
                            </>
                        )}
                    </Stack>
                </Stack>


                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <div className='mobile-nav-logo-left'>
                        <Stack direction="row" alignItems="center" spacing={1} >
                            <Link href="/" className='text-decoration-none'><HomeIcon className='nav-heading large-icon' /></Link>
                            <Link href="/" className='text-decoration-none'>
                                <h2 className='nav-heading'> Caterings & Tiffins</h2></Link>
                        </Stack>
                    </div>

                    <Stack direction="row" justifyContent="end" >
                        <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu" className='mobile-nav'>
                            <MenuIcon style={{ color: '#ffffff' }} />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* {
    //     "id": 2,
    //     "name": "Wishlist",
    //     "url": "/user-profile/my-wishlist"
    // },
    // {
    //     "id": 2,
    //     "name": "My Profile",
    //     "url": "/user-profile/my-wishlist"
    // } */}

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    style={{ zIndex: '9999' }}
                >
                    <div style={{ width: 300 }}>



                        <Stack direction="row" justifyContent="space-around" alignItems="center" alignContent="center" sx={{ marginTop: '30px' }}>
                            <h2 className='nav-logo'><span className="footer-red mobile-nav-logo">CATERINGS</span> & <span className="footer-orange mobile-nav-logo">TIFFINS</span></h2>
                            <CloseIcon onClick={() => setDrawerOpen(false)} className='cursor-pointer' />
                        </Stack>


                        <ul>
                            {mobilenavlinks?.map((navlink) => {
                                return (

                                    <li className='nav-link-li-mobile' style={{ marginTop: '25px' }}>
                                        <Link onClick={clearCateringFilter} href={navlink.url} key={navlink.id} className={checkActivePath(navlink.url) ? 'active nav-link-mobile' : 'nav-link-mobile'}
                                        >{navlink.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>

                        {accessToken && <ul >
                            <li className='nav-link-li-mobile' style={{ marginTop: '25px' }}>
                                <Link href="/user-profile/my-wishlist" onClick={clearCateringFilter} className="nav-link-mobile"
                                >Wishlist</Link>
                            </li>
                            <li className='nav-link-li-mobile' style={{ marginTop: '25px' }}>
                                <Link href="/user-profile" onClick={clearCateringFilter} className="nav-link-mobile"
                                >My Profile</Link>
                            </li>
                        </ul>}



                        {!accessToken ? <div className='nav-link-li-mobile nav-mobile-link' style={{ marginTop: '20px', marginLeft: '12px' }}>
                            <Link href="javascript:void(0)" onClick={() => {
                                handleRegisterClickOpen()
                                setDrawerOpen(false)
                            }} style={{ color: '#000' }} className="nav-link"
                            >Signup</Link>
                            <Link href="javascript:void(0)" onClick={() => {
                                handleClickOpen()
                                setDrawerOpen(false)
                            }} style={{ color: '#000' }} className="nav-link"
                            >Login</Link>
                        </div> : <div className='nav-link-li-mobile mt-2 '>
                            <Stack className='nav-link-mobile' direction="row" alignItems="center" style={{ cursor: 'pointer' }} onClick={() => onLogout()}>
                                <LogoutIcon style={{ color: '#000000', fontWeight: '500', fontSize: '25px' }} />
                                <h6 style={{ color: '#000' }} className='up-signout'>Logout</h6>
                            </Stack>
                        </div>}

                        <Stack sx={{ marginTop: '20px', marginLeft: '12px' }} className='mobile-login-register'>
                            {!accessToken && (
                                <>
                                    <RegisterModal />
                                    <LoginModal />
                                </>
                            )}
                        </Stack>

                    </div>
                </Drawer>
            </Container>
        </>
    )
}

export default Navbar;

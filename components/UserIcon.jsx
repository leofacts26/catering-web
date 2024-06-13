"use client"
import React, { useEffect } from 'react'
import Slide from '@mui/material/Slide';
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchUserData, logoutUser } from '@/app/features/user/userSlice';
import { resetFilters } from '@/app/features/user/cateringFilterSlice';
import { clearTiffinSlice } from '@/app/features/tiffin/tiffinFilterSlice';
import { useRouter } from 'next/navigation'


const UserIcon = () => {
    const dispatch = useDispatch()
    const { userDetails } = useSelector((state) => state.user)
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    // dropdown 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        localStorage.clear();
        dispatch(logoutUser());
        // dispatch(resetFilters());
        // dispatch(clearTiffinSlice());
        toast.success("Logout Successfull")
        router.push('/catering')
        window.location.reload();
    }

    return (
        <>
            <Stack direction="row" alignItems="center" sx={{ paddingLeft: '10px', cursor: 'pointer' }}>
                <Stack direction="row" alignItems="center"
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <Avatar sx={{ bgcolor: '#a81e1e' }}>{userDetails?.username?.slice(0, 1).toUpperCase()}</Avatar>

                    <p className='avatar-text'>{userDetails?.username}</p>
                </Stack>
            </Stack>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                    style: {
                        zIndex: 9999
                    }
                }}
            >
                <div className="user-link-box" style={{ padding: '20px' }}>
                    <Stack direction="row" alignItems="center" spacing={2} onClick={handleClose}>
                        <Avatar sx={{ bgcolor: '#a81e1e' }}>{userDetails?.username?.slice(0, 1).toUpperCase()}</Avatar>
                        <Stack direction="column">
                            <h2 className='up-name'>{userDetails?.username}</h2>
                            <p className='up-domain'>{userDetails?.phone_number}</p>
                        </Stack>
                    </Stack>

                    <p style={{ marginTop: '5px', fontSize: '12px' }}>Manage your account</p>
                    <Link href="/user-profile">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <PersonIcon className="up-profile-icon" />
                                <p>Edit Profile</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <Link href="/user-profile/my-wishlist">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FavoriteBorderIcon className="up-profile-icon" />
                                <p>My Wishlist</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <Link href="/user-profile/my-wishlist">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <DownloadDoneIcon className="up-profile-icon" />
                                <p>View Bookings</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <p style={{ marginTop: '10px', fontSize: '12px' }}>Settings</p>
                    <Link href="/user-profile/user-settings">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <SettingsIcon className="up-profile-icon" />
                                <p>Settings</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <p style={{ marginTop: '10px', fontSize: '12px' }}>Get in Touch</p>
                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <p>Help & Support</p>
                        <ChevronRightIcon className="up-profile-icon" />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <p>Share Caterings & Tiffins</p>
                        <ShareIcon className="up-profile-icon" />
                    </Stack>

                    <Stack direction="row" justifyContent="end" sx={{ marginTop: '10px' }}>
                        <Button variant="contained" className='logout-icon' onClick={() => onLogout()}> <LogoutIcon style={{ marginRight: '10px', fontSize: '18px' }} />
                            <span className='logout-icon-span'>Logout</span> </Button>
                    </Stack>
                </div>
            </Menu>
        </>
    )
}

export default UserIcon
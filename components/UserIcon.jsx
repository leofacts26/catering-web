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
import EditIcon from '@mui/icons-material/Edit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import ViewListIcon from '@mui/icons-material/ViewList';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';


const UserIcon = () => {
    const dispatch = useDispatch()
    const { userDetails, accessToken } = useSelector((state) => state.user)
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch, accessToken]);

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

    // console.log(userDetails, "userDetails");

    return (
        <>
            <Stack direction="row" alignItems="center" sx={{ paddingLeft: '10px', cursor: 'pointer' }}>
                <Stack direction="row" alignItems="center"
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <Avatar sx={{ bgcolor: '#ffffff', color: '#57636c' }}>{userDetails?.username?.slice(0, 1).toUpperCase()}</Avatar>

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
                        <Avatar className='avatar-gradient'>{userDetails?.username?.slice(0, 1).toUpperCase()}</Avatar>
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

                    <Link href="/user-profile/my-inquiries">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <EditNoteIcon className="up-profile-icon" />
                                <p>My Inquiries</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <p style={{ marginTop: '10px', fontSize: '12px' }}>Links</p>
                    <Link href="/user-profile/about-us">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <InfoIcon className="up-profile-icon" />
                                <p>About Us</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <Link href="/user-profile/faq">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <QuestionMarkIcon className="up-profile-icon" />
                                <p>FAQ's</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>



                    <p style={{ marginTop: '10px', fontSize: '12px' }}>Get in Touch</p>
                    <Link href="/user-profile/list-your-service">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ViewListIcon className="up-profile-icon" />
                                <p>List your Service</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>


                    <Link href="/user-profile/helpdesk-support">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <LiveHelpIcon className="up-profile-icon" />
                                <p>Helpdesk & Support</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>


                    <Stack direction="row" justifyContent="space-between" className='up-card share-icon-modal'>
                        <p>Share Caterings & Tiffins</p>
                        <ShareIcon className="up-profile-icon" />
                    </Stack>

                    <Stack direction="row" justifyContent="end" sx={{ marginTop: '20px' }}>
                        <Button variant="contained" className='logout-icon avatar-gradient' onClick={() => onLogout()}> <LogoutIcon style={{ marginRight: '10px', fontSize: '18px' }} />
                            <span className='logout-icon-span'>Logout</span> </Button>
                    </Stack>
                </div>
            </Menu>
        </>
    )
}

export default UserIcon
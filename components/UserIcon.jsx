"use client"
import React from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Notification from './Notification';
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserIcon = () => {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // dropdown 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Stack direction="row" alignItems="center" sx={{ paddingLeft: '10px', cursor: 'pointer' }}>
                <Stack direction="row" alignItems="center"
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width: 28, height: 28 }}
                    />
                    <p className='avatar-text'>Christiana</p>
                </Stack>
                {/* <NotificationsNoneIcon style={{color: '#fff'}} /> */}
                {/* <Notification /> */}
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
                        <img src="https://mui.com/static/images/avatar/1.jpg" alt="" className="img-fluid up-img" />
                        <Stack direction="column">
                            <h2 className='up-name'>Randy Peterson</h2>
                            <p className='up-domain'>name@domainname.com</p>
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
                        <Button variant="contained" className='logout-icon'> <LogoutIcon style={{ marginRight: '10px', fontSize: '18px' }} /> 
                        <span className='logout-icon-span'>Logout</span> </Button>
                    </Stack>


                </div>
            </Menu>


            {/* <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                style={{ zIndex: '9999', width: '100%' }}
                className='up-box'
            >
                <div className="" style={{ padding: '20px' }}>
                    <Stack direction="row" alignItems="center" spacing={2} onClick={handleClickOpen}>
                        <img src="https://mui.com/static/images/avatar/1.jpg" alt="" className="img-fluid up-img" />
                        <Stack direction="column">
                            <h2 className='up-name'>Randy Peterson</h2>
                            <p className='up-domain'>name@domainname.com</p>
                        </Stack>
                    </Stack>

                    <p style={{ marginTop: '10px' }}>Manage your account</p>
                    <Link href="/user-profile">
                        <Stack direction="row" justifyContent="space-between" className='up-card'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <PersonIcon />
                                <p>Edit Profile</p>
                            </Stack>
                            <ChevronRightIcon />
                        </Stack>
                    </Link>

                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FavoriteBorderIcon />
                            <p>My Wishlist</p>
                        </Stack>
                        <ChevronRightIcon />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <DownloadDoneIcon />
                            <p>View Bookings</p>
                        </Stack>
                        <ChevronRightIcon />
                    </Stack>

                    <p style={{ marginTop: '10px' }}>Settings</p>
                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <SettingsIcon />
                            <p>Settings</p>
                        </Stack>
                        <ChevronRightIcon />
                    </Stack>

                    <p style={{ marginTop: '10px' }}>Get in Touch</p>
                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <p>Help & Support</p>
                        <ChevronRightIcon />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" className='up-card'>
                        <p>Share Caterings & Tiffins</p>
                        <ShareIcon />
                    </Stack>

                    <Stack direction="row" justifyContent="end" sx={{ marginTop: '10px' }}>
                        <Button variant="contained" className='logout-icon'> <LogoutIcon style={{ marginRight: '10px' }} /> <span>Logout</span> </Button>
                    </Stack>


                </div>
            </Dialog> */}
        </>
    )
}

export default UserIcon
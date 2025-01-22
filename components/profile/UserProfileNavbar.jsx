"use client"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import { useActivePathProfile } from '@/helper';
import EditIcon from '@mui/icons-material/Edit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import ViewListIcon from '@mui/icons-material/ViewList';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ShareIcon from '@mui/icons-material/Share';
import toast from 'react-hot-toast';

const dataLinks = [
    {
        id: 1,
        name: 'Edit Profile',
        url: '/user-profile',
        icon: <EditIcon className='user-profile-icon' />
    },
    // {
    //     id: 2,
    //     name: 'Notification Settings',
    //     url: '/user-profile/notification-settings',
    //     icon: <NotificationsActiveIcon className='user-profile-icon' />
    // },
    {
        id: 2,
        name: 'My Wishlist',
        url: '/user-profile/my-wishlist',
        icon: <FavoriteBorderIcon className='user-profile-icon' />
    },
    {
        id: 2,
        name: 'My Inquiries',
        url: '/user-profile/my-inquiries',
        icon: <EditNoteIcon className='user-profile-icon' />
    }
]

const ctLinks = [
    {
        id: 1,
        name: 'About Us',
        url: '/user-profile/about-us',
        icon: <InfoIcon className='user-profile-icon' />
    },
    {
        id: 1,
        name: `FAQ's`,
        url: '/user-profile/faq',
        icon: <QuestionMarkIcon className='user-profile-icon' />
    },
]


const getInTouch = [
    {
        id: 1,
        name: 'List your Service',
        url: 'https://cateringvendor.cateringsandtiffins.com/',
        icon: <ViewListIcon className='user-profile-icon' />
    }
    // {
    //     id: 2,
    //     name: 'Helpdesk & Support',
    //     url: '/user-profile/helpdesk-support',
    //     icon: <LiveHelpIcon className='user-profile-icon' />
    // }
]

const UserProfileNavbar = ({ onMenuItemClick }) => {
    const checkActivePath = useActivePathProfile()

    const handleCopyToClipboard = () => {
        const textToCopy = "https://cateringvendor.cateringsandtiffins.com/";
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success("Link Copied")
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <>

            <div className="user-profile-shadow-box">
                <h2 className='manage-account'>Manage Account</h2>
                {
                    dataLinks.map((datalink) => {
                        return (
                            <Link href={datalink.url} className='text-decoration-none' onClick={onMenuItemClick}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between"
                                    className={checkActivePath(datalink.url) ? 'active-up user-profile-box' : 'user-profile-box'} >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <p className='user-profile-links-icon'>{datalink.icon}</p>
                                        <p className='user-profile-links'> {datalink.name} </p>
                                    </Stack>
                                    <KeyboardArrowRightIcon className='user-profile-icon' />
                                </Stack>
                            </Link>
                        )
                    })
                }


                {/* <Divider style={{ marginTop: '30px' }} /> */}
                <h2 className='manage-account' style={{ marginTop: '30px' }}>Links</h2>
                {
                    ctLinks.map((ctLink) => {
                        return (
                            <Link href={ctLink.url} className='text-decoration-none' onClick={onMenuItemClick}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between"
                                    className={checkActivePath(ctLink.url) ? 'active-up user-profile-box' : 'user-profile-box'} >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <p>{ctLink.icon}</p>
                                        <p className='user-profile-links'> {ctLink.name} </p>
                                    </Stack>
                                    <KeyboardArrowRightIcon className='user-profile-icon' />
                                </Stack>
                            </Link>
                        )
                    })
                }



                {/* <Divider style={{ marginTop: '30px' }} /> */}
                <h2 className='manage-account' style={{ marginTop: '30px' }}>Get In Touch</h2>
                {
                    getInTouch.map((gtintouch) => {
                        return (
                            <>
                                <Link href={gtintouch.url} className='text-decoration-none' onClick={onMenuItemClick}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between"
                                        className={checkActivePath(gtintouch.url) ? 'active-up user-profile-box' : 'user-profile-box'} >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <p>{gtintouch.icon}</p>
                                            <p className='user-profile-links'> {gtintouch.name} </p>
                                        </Stack>
                                        <KeyboardArrowRightIcon className='user-profile-icon' />
                                    </Stack>
                                </Link>


                            </>
                        )
                    })
                }


                <Stack direction="row" alignItems="center" sx={{ cursor: 'pointer' }}
                    onClick={handleCopyToClipboard}
                    className="user-profile-box">
                    <p className='me-3'><ShareIcon className='user-profile-icon' /></p>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <p className='user-profile-links'> Share Caterings & Tiffin's </p>
                    </Stack>
                </Stack>

            </div>
            <br />

        </>
    )
}

export default UserProfileNavbar
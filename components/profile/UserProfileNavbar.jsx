"use client"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import { useActivePathProfile } from '@/helper';

const dataLinks = [
    {
        id: 1,
        name: 'Edit Profile',
        url: '/user-profile',
        icon: <FavoriteBorderIcon className='user-profile-icon' />
    },
    {
        id: 2,
        name: 'Notification Settings',
        url: '/user-profile/notification-settings',
        icon: <NotificationsActiveIcon className='user-profile-icon' />
    },
    {
        id: 2,
        name: 'My Wishlist',
        url: '/user-profile/my-wishlist',
        icon: <FavoriteBorderIcon className='user-profile-icon' />
    }
]

const csBookings = [
    {
        id: 1,
        name: 'Current Bookings',
        url: '/user-profile/current-bookings',
    },
    {
        id: 1,
        name: 'Bookings History',
        url: '/user-profile/bookings-history',
    },
]

const tiffinServiceSubscriptions = [
    {
        id: 1,
        name: 'Current Subscription',
        url: '/user-profile/current-subscription',
    },
    {
        id: 1,
        name: 'Subscription History',
        url: '/user-profile/subscription-history',
    },
]

const settingLinks = [
    {
        id: 1,
        name: 'Settings',
        url: '/user-profile/user-settings',
        icon: <SettingsIcon className='user-profile-icon' />
    }
]

const UserProfileNavbar = () => {
    const checkActivePath = useActivePathProfile()

    return (
        <>

            <div className="user-profile-shadow-box">
                <h2 className='manage-account'>Manage Account</h2>
                {
                    dataLinks.map((datalink) => {
                        return (
                            <Link href={datalink.url} className='text-decoration-none'>
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


                {/* <Divider style={{ marginTop: '30px' }} />
                <h2 className='manage-account' style={{ marginTop: '30px' }}>Catering Service Bookings</h2>

                {
                    csBookings.map((csBooking) => {
                        return (
                            <Link href={csBooking.url} >
                                <Stack direction="row" alignItems="center" justifyContent="space-between"
                                    className={checkActivePath(csBooking.url) ? 'active-up user-profile-box' : 'user-profile-box'} >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <p className='user-profile-links'> {csBooking.name} </p>
                                    </Stack>
                                    <KeyboardArrowRightIcon className='user-profile-icon' />
                                </Stack>
                            </Link>
                        )
                    })
                } */}



                {/* <Divider style={{ marginTop: '30px' }} />
                <h2 className='manage-account' style={{ marginTop: '30px' }}>Tiffin Service Subscription</h2>

                {
                    tiffinServiceSubscriptions.map((tiffinServiceSubscription) => {
                        return (
                            <Link href={tiffinServiceSubscription.url} >
                                <Stack direction="row" alignItems="center" justifyContent="space-between"
                                    className={checkActivePath(tiffinServiceSubscription.url) ? 'active-up user-profile-box' : 'user-profile-box'} >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <p className='user-profile-links'> {tiffinServiceSubscription.name} </p>
                                    </Stack>
                                    <KeyboardArrowRightIcon className='user-profile-icon' />
                                </Stack>
                            </Link>
                        )
                    })
                } */}



                <Divider style={{ marginTop: '30px' }} />
                <h2 className='manage-account' style={{ marginTop: '30px' }}>Settings</h2>

                {
                    settingLinks.map((settingLink) => {
                        return (
                            <Link href={settingLink.url} className='text-decoration-none'>
                                <Stack direction="row" alignItems="center" justifyContent="space-between"
                                    className={checkActivePath(settingLink.url) ? 'active-up user-profile-box' : 'user-profile-box'} >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <p>{settingLink.icon}</p>
                                        <p className='user-profile-links'> {settingLink.name} </p>
                                    </Stack>
                                    <KeyboardArrowRightIcon className='user-profile-icon' />
                                </Stack>
                            </Link>
                        )
                    })
                }



            </div>


            <br />

        </>
    )
}

export default UserProfileNavbar
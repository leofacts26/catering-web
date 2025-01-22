"use client"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/app/features/user/userSlice';
// import { resetFilters } from '@/app/features/user/cateringFilterSlice';
// import { clearTiffinSlice } from '@/app/features/tiffin/tiffinFilterSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'


const UserProfileComponent = () => {
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
        <div className="user-profile-gradient">
            <Container maxWidth="xl">
                <Link href="/catering">
                    <KeyboardArrowLeftIcon style={{ color: '#ffffff', fontWeight: '500', fontSize: '30px', marginBottom: '30px' }} />
                </Link>
                <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>

                        <Avatar className='avatar-gradient avatar-mob' style={{ width: 100, height: 100, fontSize: '3em' }}>{userDetails?.username?.slice(0, 1).toUpperCase()}</Avatar>
                        <div>
                            <h2 className='up-name-profile'>{userDetails?.username}</h2>
                            <p className='up-number mt-1'>{userDetails?.phone_number}</p>
                        </div>
                    </Stack>

                    <Stack direction="row" alignItems="center" style={{ cursor: 'pointer' }} onClick={() => onLogout()}>
                        <LogoutIcon style={{ color: '#ffffff', fontWeight: '500', fontSize: '25px' }} />
                        <h6 className='up-signout'>Logout</h6>
                    </Stack>

                </Stack>
            </Container>

        </div>
    )
}

export default UserProfileComponent
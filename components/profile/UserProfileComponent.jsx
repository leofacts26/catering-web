"use client"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const UserProfileComponent = () => {
    // const router = useRouter();

    // const handleBackClick = () => {
    //       router.back();
    //   };

    return (
        <div className="user-profile-gradient">
            <Container maxWidth="xl">
               <Link href="/catering">
               <KeyboardArrowLeftIcon  style={{ color: '#ffffff', fontWeight: '500', fontSize: '30px', marginBottom: '30px' }} />
               </Link>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                            alt="Travis Howard"
                            src="https://mui.com/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100 }}
                        />
                        <div>
                            <h2 className='up-name-profile'>Chris P. Bacon</h2>
                            <p className='up-email'>ChrisBacon68@gmail.com</p>
                            <p className='up-number'>8624852648</p>
                        </div>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <LogoutIcon style={{ color: '#ffffff', fontWeight: '500', fontSize: '25px' }} />
                        <h6 className='up-signout'>Sign Out</h6>
                    </Stack>

                </Stack>
            </Container>

        </div>
    )
}

export default UserProfileComponent
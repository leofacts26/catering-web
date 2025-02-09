"use client";
import UserProfileComponent from "@/components/profile/UserProfileComponent";
import UserProfileNavbar from "@/components/profile/UserProfileNavbar";
import { redirect } from 'next/navigation';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Container, Grid, Drawer, IconButton, Box, useMediaQuery, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function UserProfileLayout({ children }) {

    const accessToken = useSelector((state) => state.user.accessToken);
    const router = useRouter();

    useEffect(() => {
        if (!accessToken) {
            router.push("/catering");
        }
    }, [accessToken, router]);

    // Check if screen width is below 768px
    const isMobile = useMediaQuery('(max-width:768px)');

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const handleMenuItemClick = () => {
        setIsDrawerOpen(false); // Close the drawer
    };

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <UserProfileComponent />

            <Container maxWidth="xl" style={{ marginTop: '50px' }}>
                <Grid container spacing={5} style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Conditional Rendering: Show Hamburger Menu on Mobile */}
                    {isMobile ? (
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }} className="pt-0">
                            <Stack direction="row" justifyContent="end" className="w-100">
                                <IconButton
                                    className="w-100"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer(true)}
                                    style={{ marginRight: 'auto' }}
                                >
                                    Menu  <MenuIcon />
                                </IconButton>
                            </Stack>
                            {/* Drawer for UserProfileNavbar */}
                            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                                <Box sx={{ width: 250, padding: '16px' }}>
                                    <IconButton aria-label="close drawer" onClick={toggleDrawer(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                    <UserProfileNavbar onMenuItemClick={handleMenuItemClick} />
                                </Box>
                            </Drawer>
                        </Grid>
                    ) : (
                        // Show UserProfileNavbar directly for larger screens
                        <Grid item sm={12} md={12} lg={3.5} xl={3.5} >
                            <UserProfileNavbar />
                        </Grid>
                    )}

                    {/* Main Content */}
                    <Grid item sm={12} md={12} lg={8.5} xl={8.5} className="pt-0">
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
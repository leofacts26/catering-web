"use client";
import UserProfileComponent from "@/components/profile/UserProfileComponent";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import UserProfileNavbar from "@/components/profile/UserProfileNavbar";
import { redirect } from 'next/navigation';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function UserProfileLayout({ children }) {

    const accessToken = useSelector((state) => state.user.accessToken);
    const router = useRouter();

    useEffect(() => {
        if (!accessToken) {
            router.push("/catering");
        }
    }, [accessToken, router]);

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <UserProfileComponent />

            <Container maxWidth="xl" style={{ marginTop: '50px' }}>
                <Grid container spacing={5} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item sm={12} md={12} lg={3.5} xl={3.5} >
                        <UserProfileNavbar />
                    </Grid>
                    <Grid item sm={12} md={12} lg={8.5} xl={8.5} >
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
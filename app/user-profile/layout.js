import UserProfileComponent from "@/components/profile/UserProfileComponent";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import UserProfileNavbar from "@/components/profile/UserProfileNavbar";

export default function UserProfileLayout({
    children, // will be a page or nested layout
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <UserProfileComponent />

            <Container maxWidth="xl" style={{marginTop: '50px'}}>
                <Grid container spacing={5} style={{display: 'flex', justifyContent: 'center'}}>
                    <Grid item sm={12} md={12} lg={3} xl={3} >
                        <UserProfileNavbar />
                    </Grid>
                    <Grid item sm={12} md={12} lg={9} xl={9} >
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
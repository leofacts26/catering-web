import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const PopularCaterersShimmer = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} key={index}>
                    <Card style={{ marginTop: '30px' }}>
                        <Skeleton variant="rounded" width="100%" height={100} />
                        <CardContent>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}

export default PopularCaterersShimmer;

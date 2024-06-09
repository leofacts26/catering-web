import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

const ExploreoccasionsShimmer = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                 <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Card style={{ marginTop: '30px' }}>
                        <Skeleton variant="rounded" width="100%" height={150} />
                        <CardContent>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}

export default ExploreoccasionsShimmer;

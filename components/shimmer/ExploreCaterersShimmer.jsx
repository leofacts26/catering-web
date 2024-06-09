import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

const ExploreCaterersShimmer = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card style={{ marginTop: '30px' }}>
                        <Skeleton variant="rounded" width="100%" height={200} />
                        <CardContent>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                            {/* <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} /> */}
                        </CardContent>
                        {/* <CardActions>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                        </CardActions> */}
                    </Card>
                </Grid>
            ))}
        </>
    );
}

export default ExploreCaterersShimmer;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const GridViewSkeleton = ({xs, sm, md, lg}) => {
    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
            <Card style={{marginTop: '30px'}}>
                <Skeleton variant="rounded" width="100%" height={170} />
                <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                </CardContent>
                <CardActions>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                </CardActions>
            </Card>
        </Grid>
    );
}

export default GridViewSkeleton;

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const ListViewSkeleton = () => {
    return (
        <Stack spacing={1} direction="row" style={{marginTop: '30px'}}>
            <Skeleton variant="rounded" width={280} height={210} />
            <Stack style={{width: '100%'}}>
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
            </Stack>
        </Stack>
    )
}

export default ListViewSkeleton 
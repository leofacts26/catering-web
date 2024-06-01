import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const FilterSkeleton = () => {
    return (
        <Stack spacing={1} direction="row" style={{ marginTop: '30px' }}>
            <Stack style={{ width: '100%' }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%', height: '30px', paddingTop: '10px' }} />
            </Stack>
        </Stack>
    )
}

export default FilterSkeleton
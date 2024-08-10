import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoaderSpinner = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress style={{color: '#c33332'}} />
        </Box>
    )
}

export default LoaderSpinner
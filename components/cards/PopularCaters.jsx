import React from 'react'
import popularcaters from '../../data/popularcaters.json'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const PopularCaters = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }} style={{marginTop: '20px'}}>
                    <Grid container spacing={2}>
                        {popularcaters.map((cater, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
                                <Box>
                                    <img src={cater.url} alt={cater.title} className="img-fluid popular-caterers-img image-shadow" />
                                    <h4 className='popular-caterers-heading'>{cater.title}</h4>
                                    <p className='popular-caterers-des'>{cater.description}</p>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container >
        </>
    )
}

export default PopularCaters
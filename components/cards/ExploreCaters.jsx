import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import explorecaters from '../../data/explorecaterers.json'


const ExploreCaters = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }} className="mb-4"  style={{marginTop: '20px'}}>
                    <Grid container spacing={2}>
                        {explorecaters.map((explorecater) => (
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={explorecater.id}>
                                <Box sx={{ position: 'relative' }} className="image-shadow explore-caters-box">
                                    <img src={explorecater.url} alt="" className="img-fluid w-100 explore-caters-img" />
                                    <Box sx={{ position: 'absolute', top: '4%', right: '4%' }}>
                                        <h4 className='explore-caters-heading'>{explorecater.name}</h4>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container >
        </>
    )
}

export default ExploreCaters
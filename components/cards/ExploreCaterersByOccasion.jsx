import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import caterersbyoccasions from '../../data/caterersbyoccasion.json'

const ExploreCaterersByOccasion = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }} style={{marginTop: '20px'}}>
                    <Grid container spacing={2}>
                        {
                            caterersbyoccasions.map((caterersbyoccasion) => (
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                    <div className="explore-cator-box">
                                        <img src={caterersbyoccasion.url} alt="" className="img-fluid caterers-occasion-img image-shadow" />
                                        <h4 className='text-center caterers-occasion-title'>{caterersbyoccasion.title}</h4>
                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Container >

            {/* <Divider sx={{ width: '100%', backgroundColor: '#f8f0f0', marginTop: '20px' }} /> */}
        </>
    )
}

export default ExploreCaterersByOccasion
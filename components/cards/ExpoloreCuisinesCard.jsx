import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import explorecuisines from '../../data/explorecuisines.json'

const ExpoloreCuisinesCard = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                {
                    explorecuisines.map((explorecuisine, index) => (
                        <Grid item xs={6} sm={3} md={3} lg={2} xl={2} className={`p-0 w-100 first-card`} key={index}>
                            <CardContent key={explorecuisine.id} className='w-100' style={{ padding: '5px 10px' }}>
                                <Stack direction="row" justifyContent="center" className='explore-cuisine-card border-radius-two w-100'>
                                    <img src={explorecuisine.url} alt="" className="img-fluid explore-cuisine-img image-shadow" />
                                </Stack>
                            </CardContent>
                        </Grid>
                    ))
                }
            </Grid>
            <Stack direction="row" justifyContent="center">
                <ExpandMoreIcon style={{ fontSize: '55px', color: 'rgb(90 88 88)' }} />
            </Stack>
        </Container >

    )
}

export default ExpoloreCuisinesCard
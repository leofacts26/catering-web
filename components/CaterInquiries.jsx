import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CallIcon from '@mui/icons-material/Call';

const CaterInquiries = () => {

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
            <h2 className="user-profile-title" style={{ fontSize: '1.8em', color: '#57636c', marginTop: '-10px' }}>Caterers Inquiries</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                                    <p className='inquery-heading'>Saravana Catering Service</p>
                                    <span className='vc-chip-inquiry'> Popular </span>
                                </Stack>
                                <div>
                                    <p className='inquery-heading'>Adayar, Chennai</p>
                                </div>
                                <Stack className='my-3'>
                                    <p className='inq-contact'>Contacted on Mar 24, 2024 (7.14PM)</p>
                                </Stack>
                                <div>
                                    <p className='inquery-heading'>Food Type : Veg</p>
                                    <p className='inquery-heading mt-2'>Cuisines : <b className='inq-weight'>South Indian</b> </p>
                                    <p className='inquery-heading mt-2'>Occasion : <b className='inq-weight'>Wedding</b> </p>
                                    <p className='inquery-heading mt-2'>Service : <b className='inq-weight'>Table Service</b> </p>
                                </div>
                            </CardContent>

                            <Stack direction="row" justifyContent="end" spacing={2}>
                                <CardActions>
                                    <Button className='inquiry-cater-btn' size="small" sx={{ textTransform: 'capitalize' }}>
                                        <CallIcon style={{ marginRight: '10px', fontSize: '20px' }} /> Call Now</Button>
                                </CardActions>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                                    <p className='inquery-heading'>Saravana Catering Service</p>
                                    <span className='vc-chip-inquiry'> Popular </span>
                                </Stack>
                                <div>
                                    <p className='inquery-heading'>Adayar, Chennai</p>
                                </div>
                                <Stack className='my-3'>
                                    <p className='inq-contact'>Contacted on Mar 24, 2024 (7.14PM)</p>
                                </Stack>
                                <div>
                                    <p className='inquery-heading'>Food Type : Veg</p>
                                    <p className='inquery-heading mt-2'>Cuisines : <b className='inq-weight'>South Indian</b> </p>
                                    <p className='inquery-heading mt-2'>Occasion : <b className='inq-weight'>Wedding</b> </p>
                                    <p className='inquery-heading mt-2'>Service : <b className='inq-weight'>Table Service</b> </p>
                                </div>
                            </CardContent>

                            <Stack direction="row" justifyContent="end" spacing={2}>
                                <CardActions>
                                    <Button className='inquiry-cater-btn' size="small" sx={{ textTransform: 'capitalize' }}>
                                        <CallIcon style={{ marginRight: '10px', fontSize: '20px' }} /> Call Now</Button>
                                </CardActions>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Box>



        </>
    )
}

export default CaterInquiries
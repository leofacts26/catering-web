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
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnquiryList } from '@/app/features/user/settingSlice';

const CaterInquiries = () => {
    const { enquiryList } = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    

    React.useEffect(() => {
        dispatch(fetchEnquiryList());
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <h2 className="user-profile-title" style={{ fontSize: '1.8em', color: '#57636c', marginTop: '-10px' }}>
                Tiffins Inquiries
            </h2>
            <Grid container spacing={2}>
                {enquiryList?.Tiffin?.map((inquiry) => (
                    <Grid item xs={12} lg={6} key={inquiry.id}>
                        <Card>
                            <CardContent>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                                    <p className='inquery-heading'>{inquiry.vendor_service_name}</p>
                                    <span className='vc-chip-inquiry'>Popular</span>
                                </Stack>
                                <div>
                                    <p className='inquery-heading'>Location: {inquiry.user_location || 'N/A'}</p>
                                </div>
                                <Stack className='my-3'>
                                    <p className='inq-contact-tiffins'>
                                        Contacted on {new Date(inquiry.enquiry_date).toLocaleDateString()} ({new Date(inquiry.enquiry_date).toLocaleTimeString()})
                                    </p>
                                </Stack>
                                <div>
                                    <p className='inquery-heading'>Food Type: {inquiry.insertedData?.food_types?.[0]?.food_type_name || 'N/A'}</p>
                                    <p className='inquery-heading mt-2'>Cuisines: <b className='inq-weight'>{inquiry.insertedData?.cuisines?.[0]?.cuisine_name || 'N/A'}</b></p>
                                    <p className='inquery-heading mt-2'>Occasion: <b className='inq-weight'>{inquiry.insertedData?.occasions?.[0]?.occasion_name || 'N/A'}</b></p>
                                    <p className='inquery-heading mt-2'>Service: <b className='inq-weight'>{inquiry.insertedData?.serving_types?.[0]?.serving_type_name || 'N/A'}</b></p>
                                </div>
                            </CardContent>
                            <Stack direction="row" justifyContent="end" spacing={2}>
                                <CardActions>
                                    <Button className='inquiry-tiffin-btn' size="small" sx={{ textTransform: 'capitalize' }}>
                                        <CallIcon style={{ marginRight: '10px', fontSize: '20px' }} /> Call Now
                                    </Button>
                                </CardActions>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CaterInquiries;

"use client"
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';

const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #F0F1F3',
        },
        '&:hover fieldset': {
            border: '2px solid #F0F1F3',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #D7792C',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '16px',
        padding: '15px 20px',
    },
}));

const page = () => {

    return (
        <>
            <h2 className="user-profile-title" style={{ marginTop: '30px' }}>Edit Profile</h2>


            <Grid container spacing={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" className='w-100 mt-5'>
                    <Card className='p-5'>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CssTextField
                                        id="outlined-number"
                                        placeholder="User Name Here..."
                                        variant="outlined"
                                        label="User Name Here..."
                                        className='mt-0'
                                        style={{ width: '100%' }}
                                        InputLabelProps={{
                                            style: { color: '#777777', fontSize: '14px' },
                                        }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '8px',
                                                backgroundColor: '#FFFFFF',
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        id="outlined-number"
                                        placeholder="Phone Number..."
                                        variant="outlined"
                                        label="Phone Number..."
                                        className='mt-0'
                                        style={{ width: '100%' }}
                                        InputLabelProps={{
                                            style: { color: '#777777', fontSize: '14px' },
                                        }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '8px',
                                                backgroundColor: '#FFFFFF',
                                            }
                                        }}
                                    />
                                </Grid>

                                <Stack direction="row" justifyContent="end" alignItems="center" className='mt-4 w-100'>
                                    <Button size="small" variant="contained" sx={{
                                        width: 'auto', fontWeight: '600', padding: '10px 30px', fontSize: '16px',
                                        backgroundColor: '#D9822B', borderRadius: '8px', textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#C33332',
                                        },
                                    }}>
                                        Submit
                                    </Button>
                                </Stack>

                            </Grid>
                        </Grid>
                    </Card>
                </Stack>
            </Grid>




        </>
    )
}

export default page
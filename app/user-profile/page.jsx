"use client"
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';

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
            <h2 className="user-profile-title" style={{marginTop: '30px'}}>Edit Profile</h2>

            <Grid container spacing={2}>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <CssTextField
                        id="outlined-number"
                        placeholder="Email Address..."
                        variant="outlined"
                        label="Email Address..."
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
            </Grid>

            <div style={{ marginTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={10}>
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
                    <Grid item xs={12} lg={2}>
                        <Stack direction="row" justifyContent="end">
                            <Button size="small" variant="contained" sx={{
                                width: 'auto', fontWeight: '600', padding: '10px 30px', fontSize: '16px',
                                backgroundColor: '#D9822B', borderRadius: '8px', textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: '#C33332',
                                },
                            }}>
                                Change
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>


            <div style={{ marginTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <textarea placeholder="Write your answer here" rows="20" name="comment[text]" id="comment_text" cols="40"
                                className="job-textarea" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></textarea>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <Stack direction="row" justifyContent="end" alignItems="center" sx={{height: '100%'}}>
                            <Button size="small" variant="contained" sx={{
                                width: 'auto', fontWeight: '600', padding: '10px 30px', fontSize: '16px',
                                backgroundColor: '#D9822B', borderRadius: '8px', textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: '#C33332',
                                },
                            }}>
                               <EditIcon style={{color: '#ffffff', fontSize: '18px', marginRight: '10px'}} /> Edit
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>


        </>
    )
}

export default page
"use client"
import { useState } from 'react';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #ffffff',
            borderRadius: '10px'
        },
        '&:hover fieldset': {
            border: '2px solid #ffffff',
            borderRadius: '10px'
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #ffffff',
            borderRadius: '10px'
        },
    },
    '& input': {
        fontSize: '16px',
        padding: '10px 20px',
        borderRadius: '10px',
        color: '#fff'
    },
    'input': {
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: '#ffffff'
        }
    }
}));


const Subscribe = () => {
    const [checked, setChecked] = useState(true);
    const [name, setName] = useState('Cat in the Hat');

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    return (
        <section className='subscribe-bg'>
            <Container maxWidth="lg">
                <Box className="text-center">
                    <h4 className='sub-heading'>Subscribe to Get Deals on Bookings</h4>
                    <p className='sub-desc'>Signup & get Discount Updates on Every Bookings</p>
                    <Box sx={{ marginBottom: '10px', marginTop: '20px' }}>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    color: '#ffffff'
                                }
                            }}
                        />
                        <span className='sub-accept'>I Accept to Receive the offers & Discounts from Caterings&Tiffins.com</span>
                    </Box>

                    <Container maxWidth="md" >
                        <Stack direction="row" justifyContent="center">
                            <Stack direction={{ xs: 'column', sm: 'column', md: "row" }} justifyContent="center" alignItems="center" className='subscribe-input'>

                                <CssTextField
                                    id="outlined-number"
                                    variant="outlined"
                                    // label="Enter Email ID"
                                    placeholder='Enter Email ID'
                                    className='mt-0'
                                    style={{ width: '75%' }}
                                    InputLabelProps={{
                                        style: { color: '#ffffff' },
                                    }}
                                    InputProps={{
                                        style: {
                                            borderRadius: '8px'
                                        }
                                    }}
                                />
                                <Button variant="contained" sx={{ height: '40px',
                                    backgroundColor: '#c33332', padding: '10px 30px',
                                    fontSize: '14px', fontWeight: '500', textTransform: 'capitalize', marginLeft: '10px',
                                    borderRadius: '8px', '&:hover': {
                                        backgroundColor: '#c33332',
                                    }
                                }}>Sign Up</Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Container>
        </section>
    )
}

export default Subscribe
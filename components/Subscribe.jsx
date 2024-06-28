"use client"
import { useState } from 'react';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSubscribeEmail } from '@/app/features/user/homeSlice';

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


const initialState = {
    email: '',
    accept: false
}

const Subscribe = () => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(true);
    const [name, setName] = useState('Cat in the Hat');
    const { isLoading } = useSelector((state) => state.homepage)

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    // validation schema
    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        accept: Yup.bool()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('You must accept the terms and conditions')
    });


    const handleSubmit = (data, resetForm) => {
        console.log(data, "data");
        const { email } = data;
        dispatch(userSubscribeEmail(email))
        resetForm(initialState);
    }

    return (
        <section className='subscribe-bg'>
            <Formik initialValues={initialState} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                {({ values, errors, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="px-4" autocomplete="off">
                        <Container maxWidth="lg">
                            <Box className="text-center">
                                <h4 className='sub-heading'>Subscribe to Get Deals on Bookings</h4>
                                <p className='sub-desc'>Signup & get Discount Updates on Every Bookings</p>
                                <Box sx={{ marginBottom: '10px', marginTop: '20px' }}>
                                    <Checkbox
                                        checked={values.accept}
                                        onChange={handleChange}
                                        name="accept"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                color: '#ffffff'
                                            }
                                        }}
                                    />
                                    <span className='sub-accept'>I Accept to Receive the offers & Discounts from Caterings&Tiffins.com</span>
                                    <br />
                                    {errors.accept && <small className='text-white mb-2 ms-1'>{errors.accept}</small>}
                                </Box>

                                <Container maxWidth="md" >

                                    <Stack direction="row" justifyContent="center">
                                        <Stack direction={{ xs: 'column', sm: 'column', md: "row" }} justifyContent="center" alignItems="center" className='subscribe-input'>

                                            <CssTextField
                                                id="outlined-number"
                                                variant="outlined"
                                                value={values?.email}
                                                name="email"
                                                onChange={handleChange}
                                                placeholder='Enter Email ID'
                                                className='mt-0 sub-input'
                                                // style={{ width: '75%' }} 
                                                InputLabelProps={{
                                                    style: { color: '#ffffff' },
                                                }}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: '8px'
                                                    }
                                                }}
                                            />

                                            <Button className='sub-bottom' type="submit" variant="contained" sx={{
                                                height: '40px',
                                                backgroundColor: '#c33332', padding: '10px 30px',
                                                fontSize: '14px', fontWeight: '500', textTransform: 'capitalize', marginLeft: '10px',
                                                borderRadius: '8px', '&:hover': {
                                                    backgroundColor: '#c33332',
                                                }
                                            }}> {isLoading ? 'Loading...' : 'Sign Up'} </Button>

                                        </Stack>
                                    </Stack>
                                    {errors.email && <small className='text-white mb-2 ms-1'>{errors.email}</small>}

                                </Container>
                            </Box>
                        </Container>
                    </form>
                )}
            </Formik>
        </section >
    )
}

export default Subscribe
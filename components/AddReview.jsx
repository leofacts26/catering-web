"use client"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addReviews, fetchReviews } from '@/app/features/user/vendorDetailSlice';
import { useParams } from 'next/navigation'


const initialState = {
    rating: '',
    ratingText: ""
}

const AddReview = () => {

    const { accessToken } = useSelector((state) => state.user)
    const { isLoading } = useSelector((state) => state.vendorDetails)
    const dispatch = useDispatch()
    const { slug } = useParams()
    console.log(accessToken, "accessToken");


    // validation schema
    const schema = Yup.object().shape({
        rating: Yup.string().required('Rating is required.'),
        ratingText: Yup.string().required('Rating text is required.')
    });

    // onHandleRegisterSubmit 
    const handleSubmit = async (ratingData, { resetForm }) => {

        const data = {
            rating: ratingData?.rating,
            review_text: ratingData?.ratingText,
            vendor_id: slug
        }

        dispatch(addReviews(data))
        resetForm();
    }

    return (
        <Container maxWidth="lg" className='mt-3'>
            {accessToken ? (
                <Formik initialValues={initialState} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange }) => (
                        <Form className="px-4" autoComplete="off">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                className="w-100"
                            >
                                <Grid container spacing={2} className="w-100" justifyContent="center">
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={2} justifyContent="center" alignItems="center" direction="column" className="w-100">
                                            <h2 className='review-cards'>Write a Review</h2>
                                            <Grid item xs={12}>
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth
                                                        error={touched.rating && Boolean(errors.rating)}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: touched.rating && errors.rating ? '#C33332' : 'default',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: touched.rating && errors.rating ? '#C33332' : 'default',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: touched.rating && errors.rating ? '#C33332' : 'default',
                                                                },
                                                            }
                                                        }}
                                                    >
                                                        <InputLabel id="demo-simple-select-label">Select Rating</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Select Rating"
                                                            value={values.rating}
                                                            name="rating"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>1</MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem>
                                                            <MenuItem value={4}>4</MenuItem>
                                                            <MenuItem value={5}>5</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <ErrorMessage name="rating" component="small" className="text-red mb-2 ms-1" />
                                                </Box>
                                                <Box>
                                                    <Field
                                                        as="textarea"
                                                        name="ratingText"
                                                        rows="20"
                                                        id="comment_text"
                                                        cols="40"
                                                        placeholder="Comments..."
                                                        className="job-textarea mt-3 mb-0"
                                                        autoComplete="off"
                                                        role="textbox"
                                                        aria-autocomplete="list"
                                                        aria-haspopup="true"
                                                    />
                                                    <Box>
                                                        <ErrorMessage name="ratingText" component="small" className="text-red mb-2 ms-1" />
                                                    </Box>
                                                </Box>
                                                <Button disabled={isLoading} type="submit" variant="contained" className='mb-3 mt-2' sx={{
                                                    height: '40px',
                                                    backgroundColor: '#c33332',
                                                    padding: '10px 30px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#c33332',
                                                    }
                                                }}>
                                                    {isLoading ? 'Loading...' : 'Submit'}
                                                </Button>
                                            </Grid>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    )}
                </Formik>
            ) : (
                <>
                </>
            )}

        </Container>
    )
}

export default AddReview;

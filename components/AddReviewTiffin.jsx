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
import { unwrapResult } from '@reduxjs/toolkit';


const initialState = {
    rating: '',
    ratingText: ""
}




const AddReviewTiffin = ({ tiffin }) => {

    const { accessToken } = useSelector((state) => state.user)
    const { isLoading } = useSelector((state) => state.vendorDetails)
    const dispatch = useDispatch()
    const { slug } = useParams()
    // console.log(accessToken, "accessToken");


    // validation schema
    const schema = Yup.object().shape({
        rating: Yup.string(),
        ratingText: Yup.string(),
    }).test("rating-or-text", "Select Rating or enter a review to submit", function (values) {
        const { rating, ratingText } = values;
        if (!rating && !ratingText?.trim()) {
            return this.createError({ path: "rating", message: "Select Rating or enter a review to submit" });
        }
        return true;
    });
    // const schema = Yup.object().shape({
    //     rating: Yup.string().required('Select Rating to Submit'),
    //     ratingText: Yup.string().required('Type review to Submit')
    // });

    // onHandleRegisterSubmit 
    const handleSubmit = async (ratingData, { resetForm }) => {
        const data = {
            rating: ratingData?.rating,
            review_text: ratingData?.ratingText,
            vendor_id: slug[0]
        };
        try {
            const resultAction = await dispatch(addReviews(data));
            unwrapResult(resultAction); // Unwrap the result to check if it was successful
            await dispatch(fetchReviews(slug[0])); // Fetch the reviews after successfully adding a review
            resetForm();
        } catch (error) {
            console.error('Failed to add review:', error);
        }
    }

    return (
        <Container maxWidth="lg" className='mt-5'>
            {accessToken ? (
                <Formik initialValues={initialState} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange }) => (
                        <Form className="review-desktop" autoComplete="off">
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
                                                                    borderColor: touched.rating && errors.rating ? `${tiffin ? '#d9822b' : '#C33332'}` : 'default',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: `${tiffin ? '#d9822b' : '#C33332'}`,
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: `${tiffin ? '#d9822b' : '#C33332'}`,
                                                                },
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: '#57636c',
                                                                fontFamily: 'Readex Pro, sans-serif', // Add your font family here
                                                                fontSize: '14px',
                                                            },
                                                            '& .MuiInputLabel-root.Mui-focused': {
                                                                color: '#d9822b',
                                                                fontFamily: 'Readex Pro, sans-serif', // Add your font family here
                                                                fontSize: '14px',
                                                            },
                                                            '& .MuiSelect-icon': {
                                                                color: '#d9822b',
                                                            },
                                                        }}
                                                    >
                                                        <InputLabel id="demo-simple-select-label"
                                                            style={{ color: '#57636c', fontFamily: 'Readex Pro, sans-serif' }}>
                                                            Select Rating </InputLabel>
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
                                                    <ErrorMessage name="rating" component="small" className={`${tiffin ? 'text-orange' : 'text-red'} mb-2 ms-1`} />
                                                </Box>
                                                <Box>
                                                    <Field
                                                        as="textarea"
                                                        name="ratingText"
                                                        rows="20"
                                                        id="comment_text"
                                                        cols="40"
                                                        placeholder="Comments..."
                                                        className={`${tiffin ? 'job-textarea-tiffin' : 'job-textarea'} mt-3 mb-0 custom-textarea`}
                                                        autoComplete="off"
                                                        role="textbox"
                                                        aria-autocomplete="list"
                                                        aria-haspopup="true"
                                                    />
                                                    <Box>
                                                        <ErrorMessage name="ratingText" component="small" className={`${tiffin ? 'text-orange' : 'text-red'} mb-2 ms-1`} />
                                                    </Box>
                                                </Box>
                                                <Button className="ratingBtn mb-3 mt-2" disabled={isLoading} type="submit" variant="contained" sx={{
                                                    height: '40px',
                                                    backgroundColor: `${tiffin ? '#d9822b' : '#C33332'}`,
                                                    padding: '10px 30px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: `${tiffin ? '#d9822b' : '#C33332'}`,
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

export default AddReviewTiffin;

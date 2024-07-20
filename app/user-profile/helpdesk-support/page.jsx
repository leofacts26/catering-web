
"use client"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';

const initialState = {
    issue: '',
    comments: '',
}

const Page = () => {

    const accessToken = useSelector((state) => state.user.accessToken);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()



    // const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // const handleTogglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const CssTextField = styled(TextField)(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid #e0e3e7',
            },
            '&:hover fieldset': {
                border: '2px solid #e0e3e7',
            },
            '&.Mui-focused fieldset': {
                border: '2px solid #a81e1e',
            },
            '& input::placeholder': {
                fontWeight: '400',
                fontSize: '15px',
                color: '#000000'
            }
        },
        '& input': {
            border: 'none',
            fontSize: '16px',
            padding: '10px 20px',
        },
    }));


    const schema = Yup.object().shape({
        issue: Yup.string().required('Issue is required.'),
        comments: Yup.string().required('Comments is required.')
    });


    const handleSubmit = async (values, resetForm) => {
        const { issue, comments } = values;
        const data = {
            issue,
            comments,
        }

        setLoading(true)
        try {
            const response = await api.post(`${BASE_URL}/vendor-raise-ticket`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            toast.success(successToast(response))
            resetForm(initialState);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            setLoading(false)
        }

    }



    return (
        <>
            {/* <TopHeader title="Settings" description="Manage all your personal settings here" /> */}

            <h2 className="rt-heading mb-4 mt-5">Raise a Ticket</h2>
            <Formik enableReinitialize={true} initialValues={initialState} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                {({ values, errors, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="px-4">

                        <CssTextField
                            id="outlined-number"
                            variant="outlined"
                            className='mb-1'
                            value={values.issue}
                            onChange={handleChange}
                            name="issue"
                            style={{ width: '100%' }}
                            placeholder='Issue'

                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                }
                            }}
                        />
                        {errors.issue && <small className='text-danger mt-0 ms-1'>{errors.issue}</small>}


                        <div className="mt-3">
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <textarea
                                    value={values.comments}
                                    onChange={handleChange}
                                    name="comments"
                                    rows="20"
                                    id="comment_text"
                                    cols="40"
                                    placeholder="comments..."
                                    className="job-textarea"
                                    autoComplete="off"
                                    role="textbox"
                                    aria-autocomplete="list"
                                    aria-haspopup="true"
                                ></textarea>
                            </Box>
                            {errors.comments && <small className='text-danger mt-2 ms-1'>{errors.comments}</small>}

                        </div>

                        <Stack direction="row" justifyContent="center" className="mt-4">
                            <Button className='support-bg' type="submit" size="small" variant="contained" sx={{
                                width: 'auto', fontWeight: '600', padding: '10px 30px', fontSize: '16px',
                                borderRadius: '8px', textTransform: 'capitalize'
                            }} disabled={loading}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default Page
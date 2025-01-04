"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Link from 'next/link'
import InputAdornment from '@mui/material/InputAdornment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useRegistration from '@/hooks/useRegistration';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginUserData } from '@/app/features/user/userSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const initialState = {
    phone_number: '',
}

const OtpInput = ({ length = 6, user, setShowOtp, handleClose, loginUserData }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);
    const { loading, verifyLoginOtp } = useRegistration();

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp]
        //allow only one input
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // submit trigger 
        // const combinedOtp = newOtp.join("");
        // console.log(combinedOtp, "combinedOtp");
        // console.log(combinedOtp.length === length, "combinedOtp.length === length");
        // if (combinedOtp.length === length) onOtpSubmit(combinedOtp)


        // Focus on the next input box if available
        if (value !== '' && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)

        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Moving focus on pressing back space 
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }

    // onOtpSubmit 
    // console.log('Login Successfully', otp.join(""));
    const onOtpSubmit = (e) => {
        e.preventDefault()
        verifyLoginOtp(otp.join(""), loginUserData, setOtp, setShowOtp, handleClose);
    }

    return (
        <div className='otp-input-fields'>
            <form onSubmit={onOtpSubmit}>

                {
                    otp.map((value, index) => {
                        return <input
                            required
                            ref={(input) => (inputRefs.current[index] = input)}
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            onClick={() => handleClick(index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='otp__digit mb-4 me-1'
                        />
                    })
                }
                <Button disabled={loading} variant="contained" type="submit" className='ct-box-btn-catering mb-3' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </div>
    )
}

const LoginModal = ({ detailModal, title }) => {
    const { loading, loginVendor, loginOpen, setLoginOpen, handleClickOpen, handleClose, resendLoginOtp, loginCloseRegModalOpen, onHandleLoginLoseModal } = useRegistration();
    const [showOtp, setShowOtp] = useState(true);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    // const [value, setValue] = useState('1');
    // const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData)
    const loginUserData = useSelector((state) => state.user.loginUserData)
    const loginState = useSelector((state) => state.homepage.loginState);
    // console.log(loginUserData, "00000");
    // console.log(user, "user");

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };


    // validation schema
    const schema = Yup.object().shape({
        phone_number: Yup.string()
            .required('Phone number is required.')
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 digits')
            .max(10, 'Phone number must not exceed 15 digits'),
    });


    // onHandleRegisterSubmit 
    const handleSubmit = async (loginData, resetForm) => {
        dispatch(setLoginUserData(loginData));
        loginVendor(loginData, setShowOtp);
        resetForm(initialState);
    }


    // // onOtpSubmit 
    // const onOtpSubmit = (e, otp) => {
    //     console.log('Login Successfully', otp);
    //     e.preventDefault()
    //     verifyOtp(otp, user, setOtp);
    // }


    // resendOtp 
    const handleResendOtp = async () => {
        try {
            setMinutes(0);
            setSeconds(30);
            await resendLoginOtp(loginUserData);
        } catch (error) {
            console.error('Error while resending OTP:', error);
        }
    }

    // Timer 
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);


    return (
        <React.Fragment>
            {/* {title === "Contact Now" ? <Button variant="contained" className="vc-contact-btn-tiffin" onClick={handleClickOpen}>Contact Now</Button> : <Link href="javascript:void(0)" onClick={handleClickOpen} className="nav-link"
            >Login</Link>} */}
            <Dialog
                open={loginState}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                style={{ zIndex: '9999', borderRadius: '10px' }}
            >
                <div className="register-desktop-modal register-bg">

                    {showOtp ? (
                        <Formik initialValues={initialState} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                            {({ values, errors, handleChange, handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="px-4" autocomplete="off">
                                    <DialogTitle> <h2 className='text-center catering-register-title'>Caterings & Tiffins</h2> </DialogTitle>
                                    <DialogContent style={{ background: "transparent" }}>
                                        <DialogContentText id="alert-dialog-slide-description" style={{ background: "transparent" }}>
                                            <h3 className='register-welcome'>Welcome</h3>
                                            <p className='mb-4 register-para'>Login for a seamless experience</p>

                                            <TextField
                                                id="filled-basic"
                                                placeholder='Mobile Number'
                                                variant="filled"
                                                className='register-input-bg'
                                                name='phone_number'
                                                value={values?.phone_number}
                                                onChange={handleChange}
                                                sx={{
                                                    width: '100%',
                                                    borderBottom: '1px solid #fff',
                                                    '& input': {
                                                        color: 'white',
                                                        '&::placeholder': {
                                                            color: 'white'
                                                        }
                                                    }
                                                }}
                                                inputProps={{ maxLength: 10 }}
                                                InputLabelProps={{
                                                    style: { color: '#ffffff' },
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    startAdornment: (
                                                        <InputAdornment position="start" style={{ color: '#ffffff' }}>
                                                            +91
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {errors.phone_number && <small className='text-white mb-2 ms-1'>{errors.phone_number}</small>}
                                        </DialogContentText>
                                    </DialogContent>
                                    <Stack direction="row" justifyContent='center'>
                                        <Button variant="contained" className='login-otp' type='submit' disabled={loading}>
                                            {loading ? 'Loading...' : 'Login'}
                                        </Button>
                                    </Stack>
                                    <Stack direction="row" justifyContent='center' spacing={2}>
                                        <span className="text-center text-white cursor-pointer reg-later" onClick={handleClose}>Maybe Later</span> 
                                        <span className="text-center text-white cursor-pointer reg-later">/</span>
                                        <span className="text-center text-white cursor-pointer reg-later" onClick={onHandleLoginLoseModal}> Register here</span>
                                    </Stack>


                                </form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <div>
                                <p className='text-center mt-5 mb-2 enter-otp' style={{ color: seconds > 0 || minutes > 0 ? "#e0e3e7" : "#fff" }}>Please enter Your OTP below</p>
                                <div className="otp-input-fields mb-3 my-4">
                                    <OtpInput length={6} user={user} setShowOtp={setShowOtp} handleClose={handleClose} loginUserData={loginUserData} />
                                </div>

                                {/* <Button disabled={loading} variant="contained" className='ct-box-btn-catering mb-3' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                                    {loading ? 'Loading...' : 'Submit'}
                                </Button> */}

                                <div className="countdown-text">
                                    {seconds > 0 || minutes > 0 ? (
                                        <p className='ct-box-both-code text-center mx-auto mb-3 text-white' style={{ color: seconds > 0 || minutes > 0 ? "#e0e3e7" : "#fff" }}>
                                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    ) : (
                                        <p className='ct-box-both-code text-center mx-auto text-white mb-2' style={{ color: seconds > 0 || minutes > 0 ? "#e0e3e7" : "#fff" }}>Didn't Receive code?</p>
                                    )}

                                    <Box style={{ width: '100%', textAlign: 'center' }}>
                                        <button
                                            disabled={seconds > 0 || minutes > 0}
                                            style={{
                                                color: seconds > 0 || minutes > 0 ? "#e0e3e7" : "#fff",
                                                margin: '0px auto', textAlign: 'center', border: 'none',
                                                background: 'transparent', cursor: 'pointer'
                                            }}
                                            onClick={handleResendOtp}
                                        >
                                            Resend OTP
                                        </button>
                                    </Box>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default LoginModal
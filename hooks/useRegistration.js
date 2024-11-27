import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setData, setVendorId } from '@/app/features/user/userSlice';
import { vendor_type } from '@/constant';

const useRegistration = () => {
    const { regData } = useSelector((state) => state.user)
    // console.log(regData, "regData"); 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);


    // const loginUserData = useSelector((state) => state.user.loginUserData)
    // console.log(loginUserData, "00000");

    const [incorrectAttempts, setIncorrectAttempts] = useState(0);


    const handleClickOpen = () => {
        setLoginOpen(true);
    };

    const handleClose = () => {
        setLoginOpen(false);
    };


    const handleRegisterClickOpen = () => {
        setRegisterOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterOpen(false);
    };


    const loginCloseRegModalOpen = () =>{
        setLoginOpen(false);
        setRegisterOpen(true);
    }



    // registerVendor 
    const registerVendor = async (registerData, setShowOtp) => {
        setLoading(true);
        try {
            const response = await api.post('/register-user-send-otp', registerData);
            // console.log(response, "response");
            dispatch(setVendorId(response?.data?.data));
            dispatch(setData(registerData));
            setShowOtp(false);
            setLoading(false);
            toast.success(successToast(response));
        } catch (error) {
            console.log(error, "error");
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };

    // verifyOtp 
    const verifyOtp = async (otp, user, setOtp, setShowOtp, handleClose) => {
        const data = {
            phone_number: user?.phone_number,
            otp_code: otp,
            vendor_type: vendor_type,
            phone_extension: '+91',
            name: regData.name
        };
        setLoading(true);
        try {
            if (incorrectAttempts + 1 >= 3) {
                setShowOtp(true)
                alert('You have reached the maximum number of attempts. Please try again later.')
            }
            const response = await api.post('/register-user-verify-otp', data);
            // console.log(response, "response ****000");
            dispatch(setAccessToken(response?.data?.data?.token));
            // console.log(response, "response"); 
            toast.success(successToast(response));
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
            setShowOtp(true)
            if (response.status === 200) {
                handleClose()
                setShowOtp(true)
            }
            if (response.status === 200) {
                setIncorrectAttempts(0);
            }
        } catch (error) {
            setIncorrectAttempts(prev => prev + 1);
            console.log(error, "Error");
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };


    // Resend otp 
    const resendOtp = async (user) => {
        try {
            const data = {
                phone_number: user?.phone_number,
                vendor_type: vendor_type
            }
            const response = await api.post('register-user-resend-otp', data)
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        }
    }

    // registerVendor 
    const loginVendor = async (loginData, setShowOtp) => {
        setLoading(true);
        try {
            const response = await api.post('/login-send-user-otp', loginData);
            toast.success(successToast(response));
            setShowOtp(false);
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        } finally {
            setLoading(false)
        }
    };

    // verifyOtp 
    const verifyLoginOtp = async (otp, loginUserData, setOtp, setShowOtp, handleClose) => {
        const data = {
            phone_number: loginUserData?.phone_number,
            otp_code: otp,
            // vendor_type: vendor_type
        };
        setLoading(true);
        try {
            if (incorrectAttempts + 1 >= 3) {
                setShowOtp(true)
                alert('You have reached the maximum number of attempts. Please try again later.')
            }
            const response = await api.post('/login-verify-user-otp', data);
            dispatch(setAccessToken(response?.data?.data?.token));
            // console.log(response, "response");
            toast.success(successToast(response));
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
            setShowOtp(true)
            if (response.status === 200) {
                handleClose()
                setShowOtp(true)
            }
            if (response.status === 200) {
                setIncorrectAttempts(0);
            }
        } catch (error) {
            setIncorrectAttempts(prev => prev + 1);
            console.log(error, "Error");
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };

    // Resend otp 
    const resendLoginOtp = async (loginUserData) => {
        try {
            const data = {
                // company_id: loginUserData?.company_id,
                // password: loginUserData?.password
                phone_number: loginUserData?.phone_number
            }
            const response = await api.post('/login-resend-user-otp', data)
            toast.success(response?.data?.message);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }


    return { loading, registerVendor, verifyOtp, resendOtp, loginOpen, setLoginOpen, registerOpen, setRegisterOpen, handleClickOpen, handleClose, loginVendor, verifyLoginOtp, resendLoginOtp, handleRegisterClickOpen, handleRegisterClose, loginCloseRegModalOpen };
};

export default useRegistration;

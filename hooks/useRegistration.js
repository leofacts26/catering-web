import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { useDispatch } from 'react-redux';
import { setAccessToken, setData, setVendorId } from '@/app/features/user/userSlice';
import { vendor_type } from '@/constant';

const useRegistration = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // registerVendor 
    const registerVendor = async (registerData, setShowOtp) => {
        setLoading(true);
        try {
            const response = await api.post('/register-user-send-otp', registerData);
            console.log(response, "response");
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
            vendor_type: vendor_type
        };
        setLoading(true);
        try {
            const response = await api.post('/register-user-verify-otp', data);
            dispatch(setAccessToken(response?.data?.token));
            console.log(response, "response");
            toast.success(successToast(response));
            setLoading(false);  
            setOtp(['', '', '', '', '', '']);
            setShowOtp(true)
            if(response.status === 200){
                handleClose()
            }
        } catch (error) {
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

    return { loading, registerVendor, verifyOtp, resendOtp, open, setOpen, handleClickOpen, handleClose };
};

export default useRegistration;

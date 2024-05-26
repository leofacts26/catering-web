import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';

const useRegistration = () => {
    const [loading, setLoading] = useState(false);

    // registerVendor 
    const registerVendor = async (registerData, setShowOtp) => {
        setLoading(true);
        try {
            const response = await api.post('/register-user-send-otp', registerData);
            setShowOtp(false);
            setLoading(false);
            toast.success(successToast(response));
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };

    // verifyOtp 
    const verifyOtp = async (otp, user, setOtp, setValue) => {
        const data = {
            phone_number: user?.phone_number,
            otp_code: otp,
            vendor_type: user?.vendor_type
        };
        setLoading(true);
        try {
            const response = await api.post('/register-user-verify-otp', data);
            dispatch(setAccessToken(response?.data?.data?.accessToken));
            dispatch(setRefreshToken(response?.data?.data?.refreshToken));
            navigate('/enter-location')
            toast.success(successToast(response));
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };


    // Resend otp 
    const resendOtp = async (user) => {
        try {
            const data = {
                phone_number: user?.phone_number,
                vendor_type: user?.vendor_type
            }
            const response = await api.post('register-vendor-resend-otp', data)
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        }
    }

    return { loading, registerVendor, verifyOtp, resendOtp };
};

export default useRegistration;

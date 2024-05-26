import { api, BASE_URL } from "@/api/apiConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetuser = () => {
    const accessToken = useSelector((state) => state.user.accessToken)
    const [vendorBusinessProfile, setVendorBusinessProfile] = useState(null)

    const fetchVendorData = async () => {
        try {
            const response = await api.post(`${BASE_URL}/get-user-info`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setVendorBusinessProfile(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchVendorData()
    }, [])


    return vendorBusinessProfile
}

export default useGetuser
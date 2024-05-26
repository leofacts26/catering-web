import { api, BASE_URL } from "@/api/apiConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetuser = () => {
    const accessToken = useSelector((state) => state.user.accessToken)
    const [userDetails, setUserDetails] = useState(null)

    const fetchVendorData = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-user-info`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setUserDetails(response?.data?.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchVendorData()
    }, [])


    return userDetails
}

export default useGetuser
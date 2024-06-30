import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


import { api, BASE_URL } from '@/api/apiConfig';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '@/utils';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const options = {
    enableHighAccuracy: true,
    timeout: 10000,
  };
  

const AllowLocation = ( ) => {
    const [openLocModal, setOpenLocModalOpen] = React.useState(false);

    const handleClickLocModalOpen = () => {
        setOpenLocModalOpen(true);
    };
    const handleCloseLocModal = () => {
        setOpenLocModalOpen(false);
    };



    const { accessToken } = useSelector((state) => state.user)
    const [isLoading, setisLoading] = useState()
  
    // Allow location
    const successCallback = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBf22eHEMxKk_9x0XWag-oCFTXkdClnPw8`);
        const results = response.data.results;
        let maxAddressComponentsLength = -1;
        let selectedAddress = null;
  
  
        results.forEach(result => {
          const addressComponentsLength = result.address_components.length;
          if (addressComponentsLength > maxAddressComponentsLength) {
            maxAddressComponentsLength = addressComponentsLength;
            selectedAddress = result;
          }
        });
  
  
        if (selectedAddress) {
          const addressComponents = selectedAddress.address_components;
          const addressData = {
            street_name: getAddressComponent(addressComponents, 'route'),
            area: getAddressComponent(addressComponents, 'sublocality_level_1'),
            pincode: getAddressComponent(addressComponents, 'postal_code'),
            latitude: latitude,
            longitude: longitude,
            address: getAddressComponent(addressComponents, 'administrative_area_level_3'),
            city: getAddressComponent(addressComponents, 'locality'),
            state: getAddressComponent(addressComponents, 'administrative_area_level_1'),
            country: getAddressComponent(addressComponents, 'country'),
            formatted_address: response.data.results[0].formatted_address,
            place_id: response.data.results[0].place_id,
          };
          handleUserLocationSubmit(addressData);
        } else {
          console.log("No suitable address found");
        }
  
      } catch (error) {
        console.log(error);
      }
    };
  
    const errorCallback = (error) => {
      console.log(error);
    };
  
    const getAddressComponent = (addressComponents, type) => {
      const component = addressComponents.find(component => component.types.includes(type));
      return component ? component.long_name : '';
    };
  
    const getCurrentLocation = () => {
      const id = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
      navigator.geolocation.clearWatch(id);
    };
  
  
      // handleUserLocationSubmit 
      const handleUserLocationSubmit = async (addressData) => {
        const data = {
            street_name: addressData?.street_name || addressData?.area || "",
            area: addressData?.area || "",
            pincode: addressData?.pincode || "",
            latitude: addressData?.latitude || "",
            longitude: addressData?.longitude || "",
            address: addressData?.address || "",
            city: addressData?.city || "",
            state: addressData?.state || "",
            country: addressData?.country || "",
            formatted_address: addressData?.formatted_address || "",
            place_id: addressData?.place_id || ''
        }
        setisLoading(true)
        try {
            const response = await api.post(`${BASE_URL}/update-user-location`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            toast.success(successToast(response))
        } catch (error) {
            console.log(error, "error");
            toast.error(datavalidationerror(error))
        } finally {
            setisLoading(false)
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickLocModalOpen}>
                Open dialog
            </Button>
            <BootstrapDialog
                onClose={handleCloseLocModal}
                aria-labelledby="customized-dialog-title"
                open={openLocModal}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
                    Modal title
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseLocModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Button variant="outlined" onClick={() => getCurrentLocation()}>
                        Allow Location
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseLocModal}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    )
}

export default AllowLocation
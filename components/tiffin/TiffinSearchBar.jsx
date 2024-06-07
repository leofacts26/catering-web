"use client"
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import DatePickerSearch from '../search/DatePickerSearch';
import Stack from '@mui/material/Stack';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoaderSpinner from '../LoaderSpinner';
import Card from '@mui/material/Card';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';
import { useDispatch, useSelector } from 'react-redux';
import { setManualLocation, setPeople, setSelectedLocation } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation'
import DatePickerSearchTiffin from '../search/DatePickerSearchTiffin';


const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #d9822b',
        },
        '&:hover fieldset': {
            border: '2px solid #d9822b',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #d9822b',
        },
        '& input::placeholder': {
            fontWeight: '600',
            fontSize: '12px',
        }
    },
    '& input': {
        border: 'none',
        fontSize: '15px',
        padding: '12.9px 0px',
    },
}));

const CssTextFieldRadius = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #d9822b',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
        },
        '&:hover fieldset': {
            border: '2px solid #d9822b',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #d9822b',
        },
        '& input::placeholder': {
            fontWeight: '600',
            fontSize: '12px',
        }
    },
    '& input': {
        border: 'none',
        fontSize: '15px',
        padding: '12.9px 0px'
    },
}));



const TiffinSearchBar = () => {
    const { isPlacePredictionsLoading, placePredictions, getPlacePredictions, selectLocation } = useGetLocationResults()

    const { locationValuesGlobal, manualLocation, selectedLocation } = useSelector((state) => state.cateringFilter);
    // const { startDate, endDate } = useSelector((state) => state.cateringFilter);

    const [isAdornmentClicked, setIsAdornmentClicked] = useState(false);

    const dispatch = useDispatch();
    const people = useSelector(state => state.cateringFilter.people);

    const handlePeopleChange = (e) => {
        dispatch(setPeople(e.target.value));
    };

    const router = useRouter()

    const onHandleSubmit = (event) => {
        event.preventDefault();
        const data = {
            locationValuesGlobal,
            people
        }
        console.log(data, "data");
        router.push('/tiffin-search')
    }


    return (
        <>
            <form onSubmit={onHandleSubmit}>
                <Stack className='search-bg' direction={{ xs: 'column', sm: 'column', md: 'column', lg: "row" }} justifyContent="space-between" spacing={0.2}>
                    <div className='w-100'>
                        <CssTextFieldRadius
                            required
                            id="outlined-number"
                            placeholder="Enter your location..."
                            variant="outlined"
                            className='mt-0'
                            style={{ width: '100%' }}
                            onChange={(evt) => {
                                dispatch(setSelectedLocation(null));
                                dispatch(setManualLocation(evt.target.value));
                                getPlacePredictions({ input: evt.target.value });
                            }}
                            value={manualLocation}
                            loading={isPlacePredictionsLoading}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '14px' },
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '0px',
                                    backgroundColor: '#f4f4fc6b'
                                },
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        onClick={() => setIsAdornmentClicked(true)}
                                    >
                                        <MyLocationIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </div>
                    <div className="w-100">
                    <DatePickerSearchTiffin />
                    </div>
                    <div className="three w-100">
                        <CssTextField
                            required
                            value={people}
                            onChange={handlePeopleChange}
                            id="outlined-number"
                            placeholder="How many people attending?"
                            variant="outlined"
                            // label="How many people attending?"
                            className='mt-0'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '14px' },
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '0px',
                                    backgroundColor: '#f4f4fc6b',
                                },
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                    >
                                        <GroupAddIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        <Button type='submit' className='red-btn' variant="contained" sx={{
                            boxShadow: 'none',
                            width: '100%', fontWeight: '600', padding: '11px 20px', fontSize: '14px', backgroundColor: '#d9822b', textTransform: 'capitalize', '&:hover': {
                                backgroundColor: '#d9822b',
                            },
                        }}>
                            <SearchIcon style={{ marginRight: '5px', fontSize: '18px' }} /> Search
                        </Button>
                    </div>
                </Stack>
            </form >


            {
                placePredictions.length > 0 && !selectedLocation && (
                    <Card className='px-3 py-2'>
                        {isPlacePredictionsLoading ? (
                            <LoaderSpinner />
                        ) : (
                            <>
                                <p className='ct-box-search-loc mb-1'>Search Results</p>
                                {placePredictions?.map((item, index) => (
                                    <h2 className='ct-box-search-results cursor-pointer' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                                ))}
                            </>
                        )}
                    </Card>
                )
            }


        </>
    )
}

export default TiffinSearchBar;

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
import { fetchCateringSearchCards, setManualLocation, setPeople, setSelectedLocation } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation'


const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #C33332',
        },
        '&:hover fieldset': {
            border: '2px solid #C33332',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
        '& input::placeholder': {
            fontWeight: '600',
            fontSize: '12px',
        },
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
            border: '2px solid #C33332',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
        },
        '&:hover fieldset': {
            border: '2px solid #C33332',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
        '& input::placeholder': {
            fontWeight: '600',
            fontSize: '12px',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '15px',
        padding: '12.9px 0px'
    },
}));



const CateringSearchBar = () => {
    const { isPlacePredictionsLoading, placePredictions, getPlacePredictions, selectLocation } = useGetLocationResults()

    const { getOccasionCateringTypes, getCateringServiceTypes, getCateringServingTypes, locationValuesGlobal, manualLocation, selectedLocation, isLoading } = useSelector((state) => state.cateringFilter);
    // const { startDate, endDate } = useSelector((state) => state.cateringFilter);

    const [isAdornmentClicked, setIsAdornmentClicked] = useState(false);

    const dispatch = useDispatch();
    const people = useSelector(state => state.cateringFilter.people);

    const handlePeopleChange = (e) => {
        dispatch(setPeople(e.target.value));
    };

    const router = useRouter()


    const onHandleSubmit = (e) => {
        e.preventDefault();

        // getOccasionCateringTypes
        const occasions_filter = getOccasionCateringTypes.map(occasion => ({
            occasion_id: occasion.occasion_id,
            selected: occasion.selected
        }));

        // getCateringServiceTypes
        const service_filter = getCateringServiceTypes.map(service => ({
            id: service.id,
            selected: service.selected
        }));

        // getCateringServingTypes 
        const serving_filter = getCateringServingTypes.map(serving => ({
            id: serving.id,
            selectedweb: serving.selectedweb
        }))

        const data = {
            locationValuesGlobal,
            people,
            occasions_filter,
            service_filter,
            serving_filter
        }
        dispatch(fetchCateringSearchCards(data))
        router.push('/catering-search')
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
                        <DatePickerSearch />
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
                        <Button disabled={isLoading} type='submit' className='red-btn' variant="contained" sx={{
                            boxShadow: 'none',
                            width: '100%', fontWeight: '600', padding: '11px 20px', fontSize: '14px', backgroundColor: '#C33332', textTransform: 'capitalize', '&:hover': {
                                backgroundColor: '#C33332',
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

export default CateringSearchBar;

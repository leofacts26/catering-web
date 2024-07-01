import React, { memo, useCallback, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringCuisines, fetchCateringMapviewSearchCards, fetchCateringSearchCards, setCuisineTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #e0e3e7',
        },
        '&:hover fieldset': {
            border: '2px solid #e0e3e7',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '16px',
        padding: '10px 20px',
    },
}));

const CaterCuisineFilter = () => {
    const { getCateringCuisines, isLoading } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getCateringCuisines.length) {
            dispatch(fetchCateringCuisines());
        }
    }, [dispatch, getCateringCuisines.length]);


    // onHandleCuisineFilter 
    const onHandleCuisineFilter = useCallback((cuisineId, isParent) => {
        dispatch(setCuisineTypeFilter({ cuisineId, isParent }));
        dispatch(fetchCateringSearchCards());
        dispatch(fetchCateringMapviewSearchCards());
    }, [dispatch])

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCuisines = getCateringCuisines?.filter(cuisine =>
        cuisine?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Check parent name
        cuisine?.children?.some(child => child?.name?.toLowerCase().includes(searchQuery.toLowerCase())) // Check children names
    );


    // console.log(getCateringCuisines, "getCateringCuisines"); 

    return (
        <>
            <CssTextField
                id="outlined-number"
                variant="outlined"
                label="Search here..."
                className='mt-0'
                style={{ width: '100%', marginTop: '10px' }}
                InputLabelProps={{
                    style: { color: '#777777', fontSize: '12px' },
                }}
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    style: {
                        borderRadius: '8px',
                        backgroundColor: '#f4f4fc6b',
                    },
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            onClick={() => setIsAdornmentClicked(true)}
                        >
                            <SearchIcon style={{ fontSize: '14px' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Box sx={{ marginTop: '0px' }}>
                {filteredCuisines?.length > 0 ? (
                    filteredCuisines?.map((getCuisine) => {
                        return (
                            <Accordion className='m-0 shadow-none' key={getCuisine?.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='m-0 p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='m-0 checkbox-color'
                                            checked={getCuisine.selectedweb === 1}
                                            onChange={() => onHandleCuisineFilter(getCuisine.id, true)} />
                                        <span className='checkbox-text'>{getCuisine?.name}</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{ marginLeft: '-20px', padding: '0px 16px' }}>
                                    {getCuisine?.children?.map((child) => {
                                        return (
                                            <Stack className='text-muted' direction="row" alignItems="center" key={child?.id}>
                                                <Checkbox {...label} size="small" className='checkbox-color' checked={child?.selectedweb === 1}
                                                    onChange={() => onHandleCuisineFilter(child.id, false)} />
                                                <span className='checkbox-text'>{child?.name}</span>
                                            </Stack>
                                        )
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                ) : (
                    <FilterSkeleton />
                )
                }
            </Box>
        </>
    )
}

export default memo(CaterCuisineFilter)
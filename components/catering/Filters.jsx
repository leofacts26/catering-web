"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

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

const Filters = () => {
    const prices = [1, 2, 3, 4, 5];

    const [checkedItems, setCheckedItems] = useState(new Array(prices.length).fill(false));

    const handleChange = (index) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems) 
    };
  

    return (
        <>
            <Box sx={{ marginBottom: '10px' }} className="filter-shadow">
                <Card>
                    <CardContent>
                        <h3 className='filter-text'>Filter by:</h3>
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Your Budget (Per Plate Cost):</h3>
                        <p style={{ margin: '10px 0px', fontSize: '16px' }} className='select-price-range'>Select Price Range</p>

                        {prices.map((price, index) => (
                            <Stack className='text-muted' key={index} direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                                <Checkbox
                                    size="small"
                                    checked={checkedItems[index]}
                                    onChange={() => handleChange(index)}
                                    className={checkedItems[index] ? 'text-red' : 'checkbox-color'}
                                    style={{ marginLeft: '0px' }}
                                />
                                <span className='checkbox-text'>{`Rs. ${price * 100} - Rs. ${(price + 1) * 100}`}</span>
                            </Stack>
                        ))}
                    </CardContent>

                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Food Type:</h3>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px', marginTop: '5px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Veg</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Non-Veg</span>
                        </Stack>
                    </CardContent>

                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Cuisine</h3>
                        <CssTextField
                            id="outlined-number"
                            variant="outlined"
                            label="Search here..."
                            className='mt-0'
                            style={{ width: '100%', marginTop: '10px' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
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
                                        <SearchIcon style={{fontSize: '14px'}} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ marginTop: '0px' }}>
                            <Accordion className='m-0 shadow-none'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='m-0 p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='m-0 checkbox-color' />
                                        <span className='checkbox-text'>North Indian</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{marginLeft: '-20px',  padding: '0px 16px' }}>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Divider />

                            <Accordion className='shadow-none'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>South Indian</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{marginLeft: '-20px', padding: '0px 16px' }}>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Divider />

                            <Accordion className='shadow-none'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>East Indian</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{marginLeft: '-20px',  padding: '0px 16px' }}>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Divider />

                            <Accordion className='shadow-none'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>West Indian</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{marginLeft: '-20px',  padding: '0px 16px' }}>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Divider />

                            <Accordion className='shadow-none'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>North East Indian</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{marginLeft: '-20px',  padding: '0px 16px' }}>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Divider />

                            <Accordion className='shadow-none'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='p-0'
                                >
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Other Cuisiens</span>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{marginLeft: '-20px',  padding: '0px 16px' }}>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                    <Stack className='text-muted' direction="row" alignItems="center">
                                        <Checkbox {...label} size="small" className='checkbox-color' />
                                        <span className='checkbox-text'>Awadhi</span>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            

                        </Box>
                    </CardContent>

                    <Divider />
                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Occasions:</h3>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Wedding</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Engagement</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Ring Ceremony</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Baby Shower</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Naming Ceremony</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Birthday</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Cocktail Party</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Freshers Party</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Bachelorette Party</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Farewell Party</span>
                        </Stack>
                        <p className='text-center' style={{color: '#245396', fontSize: '12px', cursor: 'pointer' }}>Show all 15</p>
                    </CardContent>


                    <Divider />
                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Service Type:</h3>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Delivery Service</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Take Away</span>
                        </Stack>
                    </CardContent>

                    <Divider />
                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Cater Service:</h3>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Table Service</span>
                        </Stack>
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{marginLeft: '-10px' }}>
                            <Checkbox {...label} size="small" className='checkbox-color' />
                            <span className='checkbox-text'>Buffet Service</span>
                        </Stack>
                    </CardContent>




                </Card>
            </Box>
        </>
    )
}

export default Filters
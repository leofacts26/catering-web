"use client"
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Link from 'next/link'
import ShareIcon from '@mui/icons-material/Share';


const ListView = ({ catering }) => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <>
            {[1,2,3,4,5,6,7].map((item) => (
                <div className="list-view-card" key={item}>
                    <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">

                        <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} spacing={2}>
                            <div className="list-card-img position-relative">
                                <img src="/img/occasions/03.jpg" alt="" className="img-fluid listview-img" style={{ borderRadius: '8px', height: '100%' }} />
                                <div className="position-absolute list-card-tag">
                                    Branded
                                </div>
                            </div>
                            <div className="list-card-center">
                                <h2 className='list-card-title'>Saravana Catering Service</h2>
                                <p className='list-card-desc'>Perungudi Main Road, Chennai</p>
                                <Stack direction="row" spacing={1} sx={{ marginTop: '15px', marginBottom: '15px' }}>
                                    <Stack direction="row" alignItems="center" spacing={0}>
                                        <img src="/img/icons/list-card-veg.png" className='list-card-veg' alt="" /> <p className='list-card-veg-font'> Veg</p>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={0}>
                                        <img src="/img/icons/list-card-non-veg.png" className='list-card-veg' alt="" /> <p className='list-card-non-veg-font'> Non Veg</p>
                                    </Stack>
                                </Stack>
                                <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={1} className='list-card-dish-loc'>
                                    <span>South Indian | </span>  <span>North Indian | </span>  <span>hyderabadi | </span>  <span>Mughlai | </span>  <span>Kerala </span>
                                </Stack>
                                <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={1} sx={{ marginTop: '15px' }}>
                                    <span className='list-card-chip'>Delivery & Takeaway</span>
                                    <span className='list-card-chip'>Min. Order - 150 plates</span>
                                    <span className='list-card-chip'>No.of Staffs: 15</span>
                                </Stack>
                                <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} className='cat-types' spacing={2}>
                                    <Stack direction="row" alignItems="center">
                                        <img src="/img/icons/Table-srvice.png" alt="" className="img-fluid list-view-icons" />
                                        <span className='list-view-icon-text'>Table Service</span>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1} className='tablet-second'>
                                        <img src="/img/icons/Buffet-Service.png" alt="" className="img-fluid list-view-icons" />
                                        <span className='list-view-icon-text'>Buffet Service</span>
                                    </Stack>
                                </Stack>
                            </div>
                        </Stack>


                        <Stack className="list-card-end" direction="column" justifyContent="space-between">
                            <div>
                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2'>
                                    <ShareIcon className='lse-icons' style={{ marginRight: '10px' }} /> <FavoriteBorderIcon className='lse-icons' />
                                </Stack>
                                <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{marginTop: '8px'}}>
                                    <span className='cat-red' style={{ fontSize: '14px' }}>
                                        <Stack direction="row" alignItems="center">
                                            <LocationOnIcon style={{ fontSize: '15px', marginRight: '5px' }} /> <span className='lse-map-icon'>Show On Map</span>
                                        </Stack>
                                    </span>
                                </Stack>
                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{marginTop: '8px'}}>
                                    <span className='lse-reviews'>658 Reviews</span>
                                </Stack>
                            </div>


                            <div>
                                <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                    <span className='lse-starting-price'>Starting Price - <span className='lse-rupees'>₹ 250/- </span> </span>
                                </Stack>
                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{marginTop: '6px'}}>
                                    <span className='lse-starting-price'>Inclusive All Taxes</span>
                                </Stack>
                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                    <Link href='/catering-view' className='text-decoration-none' variant="contained" style={{
                                        color: '#ffffff', padding: '8px 14px', marginTop: '8px', fontWeight: '500',
                                        backgroundColor: '#C33332', borderRadius: '8px', fontSize: '14px', 
                                        fontFamily: "Readex Pro, sans-serif",
                                        textTransform: 'capitalize', '&:hover': {
                                            backgroundColor:  '#C33332',
                                        }
                                    }}>Enquire Now</Link>
                                </Stack>
                            </div>

                        </Stack>
                    </Stack>
                </div>
            ))}

            <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '20px 0px 0px 0px' }}>
                <h2 className='pagination-heading'>Chennai: 78 Catering service providers found</h2>
                <p className='pagination-showing'>Showing 20 - 30</p>
            </Stack>

            <div className="pagination-box">
                <Pagination count={10} page={page} onChange={handleChange} />
            </div>
        </>
    )
}

export default ListView
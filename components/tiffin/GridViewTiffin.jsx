import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const GridViewTiffin = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Link href="/tiffin-view" className='text-decoration-none'>
                                <div className="vc-similar-card">
                                    <img src="/img/occasions/03.jpg" alt="" className="img-fluid vc-similar-card-img" />
                                    <div className="vc-similar-card-description">
                                        <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                            <div className="text-start">
                                                <h3 className='grid-view-title'>Balaji Catering Service</h3>
                                                <p className='vc-similar-card-small text-left'>Adyar, Chennai</p>
                                            </div>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <img src="/img/icons/list-card-veg.png" className='list-similar-veg' alt="" />
                                            <span className="veg-green-similar" style={{ marginRight: '6px' }}>
                                                Veg</span> &   <img src="/img/icons/list-card-non-veg.png" className='list-similar-veg' alt="" />
                                            <span className="food-type-non-veg-similar font-16">Non-Veg</span> </Stack>

                                        <h2 className="vc-similar-blue">South Indian | North Indian | Hyderabadi | Mughlai | Kerala</h2>

                                        <Stack direction="row" alignItems="center" justifyContent="end" className="mb-4">
                                            <Stack direction="row" alignItems="center" justifyContent="end" spacing={0}>
                                                <CurrencyRupeeIcon className="vc-price-one-similar-tiffin" />
                                                <span className="vc-price-one-similar-tiffin"> 250 / Plate </span>
                                            </Stack>
                                        </Stack>

                                        {/* <div className="text-start" style={{ marginBottom: '5px' }}>
                                        <p className='vc-similar-card-small'>Food Type: Veg | NonVeg</p>
                                    </div>
                                    <div className="text-start">
                                        <p className='vc-similar-card-small vc-card-dishes'>Cuisines - South Indian, North Indian, Hyderabad Mumbai</p>
                                    </div> */}
                                        {/* <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ marginTop: '20px'}}>
                                        <span className='text-orange vc-similar-card-cost'>270 / Plate</span>
                                        <Link href="/view-tiffin" variant="contained" 
                                        className='text-decoration-none'
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: "#D9822B", 
                                            borderRadius: '8px', 
                                            padding: '0px 30px', 
                                            textTransform: 'capitalize',
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            padding: '5px 20px',
                                            '&:hover': {
                                                backgroundColor: '#D9822B',
                                            }
                                            }}>
                                           View</Link>
                                    </Stack> */}
                                    </div>
                                </div>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box >
        </>

    )
}

export default GridViewTiffin
"use client"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWishlist, fetchWishlistTiffin } from '@/app/features/user/settingSlice';
import ExploreCaterersShimmer from '@/components/shimmer/ExploreCaterersShimmer';

const page = () => {

  const { caterWishlist, tiffinWishlist, isLoading } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [])

  useEffect(() => {
    dispatch(fetchWishlistTiffin())
  }, [])

  console.log(caterWishlist, "caterWishlist");
  console.log(tiffinWishlist, "tiffinWishlist");


  return (
    <>

      {caterWishlist?.length > 0 ? (
        <>
          <h2 className="user-profile-title" style={{ marginTop: '30px' }}>Saved Caterers - My Wishlist</h2>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {isLoading ? (
                <ExploreCaterersShimmer count={caterWishlist?.length} />
              ) : (
                <>
                  {caterWishlist?.map((wishlist) => (
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="vc-similar-card">
                        <img src={wishlist["brand_logo"]?.original ? wishlist["brand_logo"]?.original : '/img/no-image.jpg'} alt="" className="img-fluid vc-similar-card-img" />
                        <div className="vc-similar-card-description">
                          <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <div className="text-start">
                              <h3 className='grid-view-title text-ellipse-two'>{wishlist?.catering_service_name}</h3>
                              <p className='vc-similar-card-small text-left'> {wishlist?.area}, {wishlist?.city}, {wishlist?.street_name}, {wishlist?.state} </p>
                            </div>
                          </Stack>
                          {
                            wishlist?.food_types.length > 0 ? (
                              <div className="text-start" style={{ marginBottom: '5px' }}>
                                <p className='vc-similar-card-small'>Food Type: {wishlist?.food_types}</p>
                              </div>
                            ) : (
                              <div className="text-start" style={{ marginBottom: '5px' }}>
                                <p className='vc-similar-card-small'>Food Type: Not Found</p>
                              </div>
                            )
                          }

                          {wishlist?.cuisines.length > 0 ? <div className="text-start">
                            <p className='vc-similar-card-small vc-card-dishes text-ellipse-one'>Cuisines - {wishlist?.cuisines}</p>
                          </div> : <div className="text-start">
                            <p className='vc-similar-card-small vc-card-dishes text-ellipse-one'>Cuisines - Not Found</p>
                          </div>}

                          <Stack direction="row" justifyContent="space-between" alignItems="center" className='w-100' style={{ marginTop: '20px' }}>
                            <span className='text-red vc-similar-card-cost'> {wishlist?.start_price} / Plate</span>
                            <Link href={`/catering-search/${wishlist?.vendor_id}/${wishlist?.id}`} variant="contained"
                              className='text-decoration-none'
                              style={{
                                color: '#ffffff',
                                backgroundColor: `#C33332`,
                                borderRadius: '8px',
                                padding: '0px 30px',
                                textTransform: 'capitalize',
                                fontSize: '12px',
                                fontWeight: '400',
                                padding: '5px 20px',
                                '&:hover': {
                                  backgroundColor: '#C33332',
                                }
                              }}>
                              View</Link>
                          </Stack>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </>
              )
              }
            </Grid>
          </Box>
        </>
      ) : (
        <p>You're Catering Wishlist is Empty</p>
      )}


      {tiffinWishlist?.length > 0 ? (
        <>
          <h2 className="user-profile-title" style={{ marginTop: '30px' }}>Saved Tiffins - My Wishlist</h2>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {isLoading ? (
                <ExploreCaterersShimmer count={tiffinWishlist?.length} />
              ) : (
                <>
                  {tiffinWishlist?.map((wishlist) => (
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="vc-similar-card">
                        <img src={wishlist["brand_logo"]?.original ? wishlist["brand_logo"]?.original : '/img/no-image.jpg'} alt="" className="img-fluid vc-similar-card-img" />
                        <div className="vc-similar-card-description">
                          <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <div className="text-start">
                              <h3 className='grid-view-title text-ellipse-two'>{wishlist?.catering_service_name}</h3>
                              <p className='vc-similar-card-small text-left'> {wishlist?.area}, {wishlist?.city}, {wishlist?.street_name}, {wishlist?.state} </p>
                            </div>
                          </Stack>
                          {
                            wishlist?.food_types.length > 0 ? (
                              <div className="text-start" style={{ marginBottom: '5px' }}>
                                <p className='vc-similar-card-small'>Food Type: {wishlist?.food_types} </p>
                              </div>
                            ) : (
                              <div className="text-start" style={{ marginBottom: '5px' }}>
                                <p className='vc-similar-card-small'>Food Type: Not Found </p>
                              </div>
                            )
                          }

                          {
                            wishlist?.cuisines.length > 0 ? <div className="text-start">
                              <p className='vc-similar-card-small vc-card-dishes text-ellipse-one'>Cuisines - {wishlist?.cuisines}</p>
                            </div> : <div className="text-start">
                              <p className='vc-similar-card-small vc-card-dishes text-ellipse-one'>Cuisines - Not Found</p>
                            </div>
                          }
                          {/* ${item?.vendor_id}/${item?.id} */}
                          <Stack direction="row" justifyContent="space-between" alignItems="center" className='w-100' style={{ marginTop: '20px' }}>
                            <span className='text-red vc-similar-card-cost'> {wishlist?.start_price === null ? '' : `${wishlist?.start_price} / Plate`} </span>
                            <Link href={`/tiffin-search/${wishlist?.vendor_id}/${wishlist?.id}`} variant="contained"
                              className='text-decoration-none'
                              style={{
                                color: '#ffffff',
                                backgroundColor: `#d9822b`,
                                borderRadius: '8px',
                                padding: '0px 30px',
                                textTransform: 'capitalize',
                                fontSize: '12px',
                                fontWeight: '400',
                                padding: '5px 20px',
                                '&:hover': {
                                  backgroundColor: '#d9822b',
                                }
                              }}>
                              View</Link>
                          </Stack>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </>
              )
              }
            </Grid>
          </Box>
        </>
      ) : (
        <p>You Don't have wishlist</p>
      )}


      <br />



    </>
  )
}

export default page
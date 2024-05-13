import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'

const page = () => {
  return (
    <>
      <h2 className="user-profile-title" style={{ marginTop: '30px' }}>Saved Caterers - My Wishlist</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="vc-similar-card">
                <img src="/img/occasions/03.jpg" alt="" className="img-fluid vc-similar-card-img" />
                <div className="vc-similar-card-description">
                  <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <div className="text-start">
                      <h3 className='grid-view-title'>Balaji Catering Service</h3>
                      <p className='vc-similar-card-small text-left'>Adyar, Chennai</p>
                    </div>
                  </Stack>
                  <div className="text-start" style={{ marginBottom: '5px' }}>
                    <p className='vc-similar-card-small'>Food Type: Veg | NonVeg</p>
                  </div>
                  <div className="text-start">
                    <p className='vc-similar-card-small vc-card-dishes'>Cuisines - South Indian, North Indian, Hyderabad Mumbai</p>
                  </div>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
                    <span className='text-red vc-similar-card-cost'>270 / Plate</span>
                    <Link href="/tiffin-view" variant="contained"
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
        </Grid>
      </Box>

    

    </>
  )
}

export default page
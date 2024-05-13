import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className='landing-bg'>
        <div className="landing-container h-100">
          <Stack direction={{ xs: 'column', sm: 'column', md:"row", lg: 'row' }} alignItems="center" justifyContent="center" className='h-100' spacing={5}>
            <Stack direction="row" alignItems="center" flexDirection="column" justifyContent="center" className='landing-left'>
              <div className='landing-mobile'>
                <h1 className='landing-heading'>Caterings & Tiffins</h1>
                <h4 className='landing-para'>Find your best Caterers and Tiffin Service providers in INDIA</h4>
              </div>
            </Stack>

            <Stack className='landing-right' direction="row" alignItems={{ xs: 'center', sm: 'center', lg: 'end' }} flexDirection="column" justifyContent="center" sx={{ marginBottom: '10px' }}>
              <Card style={{ padding: '15px 35px', borderRadius: '10px' }}>
                <CardContent style={{ marginTop: '10px', padding: '0px' }}>
                  <h2 className='service-text'>Choose your service below</h2>
                </CardContent>
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ margin: '40px 0px 10px 0px' }}>
                  <Link href="/catering" variant="contained" className='landing-btn-one'>Catering Service</Link>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ margin: '40px 0px 10px 0px', paddingBottom: '20px' }}>
                  <Link href="/tiffin" variant="contained" className='landing-btn-two'>Tiffin Service</Link>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        </div>
      </section>
    </>
  );
}

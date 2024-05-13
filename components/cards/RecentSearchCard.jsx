import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import recentSearches from '../../data/recentSearches.json'
import Container from '@mui/material/Container';

const RecentSearchCard = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'center', lg: 'start' }} spacing={0}>
                    {
                        recentSearches.map((recentSearch) => (
                            <CardContent key={recentSearch.id} style={{ padding: '0px', margin: '0px 10px 10px 0px' }}>
                                <Stack direction="row" alignItems="center" spacing={1} className='recent-search-card'>
                                    <Box>
                                        <img src={recentSearch.image} alt="" className="img-fluid recent-search-img" />
                                    </Box>
                                    <Box>
                                        <h3 className='recent-search-title'>{recentSearch.name}</h3>
                                        <p className='recent-search-desc'>{recentSearch.date}</p>
                                    </Box>
                                </Stack>
                            </CardContent>
                        ))
                    }
                </Stack>
            </Container >
        </>
    )
}

export default RecentSearchCard
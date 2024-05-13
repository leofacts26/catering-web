import Container from '@mui/material/Container';

const Heading = ({ title, center, subHeading }) => {
  return (
    <Container maxWidth="lg">
    <h2 className={center ? 'main-heading text-center' : `${subHeading ? 'main-sub-heading' : 'main-heading'}`}>{title}</h2>
    </Container >

  )
}

export default Heading
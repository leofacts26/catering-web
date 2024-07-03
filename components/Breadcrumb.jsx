"use client"
import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from 'next/link'


const Breadcrumb = ({ homeLink, serviceLink, service, city, results, title, onBreadcrumbLocationSearch }) => {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }


    return (
        <Container maxWidth="lg">
            <div role="presentation" onClick={handleClick} className='breadcrumb'>
                <Breadcrumbs separator=">" aria-label="breadcrumb">
                    <Link
                        className="breadcrumb-link"
                        underline="hover" href={homeLink}>
                        Home
                    </Link>

                    {service && serviceLink && <Link
                        className="breadcrumb-link"
                        underline="hover"
                        href={serviceLink}
                    >
                        {service}
                    </Link>}

                    {city && <div
                        onClick={onBreadcrumbLocationSearch}
                        className="breadcrumb-link cityHover"
                        underline="hover"
                        color="inherit" 
                        style={{cursor: 'pointer'}}
                    >
                        {city}
                    </div>}

                    {results && <Link
                        className="breadcrumb-link"
                        underline="hover"
                        color="inherit"
                        href="#"
                    >
                        {results}
                    </Link>}

                    <Typography sx={{ color: '#C33332', fontSize: '12px', marginTop: '4px', fontFamily: "Readex Pro, sans-serif" }}>{title}</Typography>
                </Breadcrumbs>
            </div>
        </Container>
    )
}

export default Breadcrumb




// "use client"
// import React from 'react'
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import Container from '@mui/material/Container';


// function handleClick(event) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }


// const Breadcrumb = ({ title, service, catering }) => {
//     return (
//         <Container maxWidth="lg">
//             <div role="presentation" onClick={handleClick} className='breadcrumb'>
//                 <Breadcrumbs separator=">" aria-label="breadcrumb">
//                     <Link
//                         className="breadcrumb-link"
//                         underline="hover" color="inherit" href="/">
//                         Home
//                     </Link>
//                     <Link
//                         className="breadcrumb-link"
//                         underline="hover"
//                         color="inherit"
//                         href="#"
//                     >
//                         {service}
//                     </Link>
//                     <Link
//                         className="breadcrumb-link"
//                         underline="hover"
//                         color="inherit"
//                         href="#"
//                     >
//                         Chennai
//                     </Link>
//                     <Typography sx={{ color: '#C33332', fontSize: '12px', marginTop: '4px', fontFamily: "Readex Pro, sans-serif" }}>{title}</Typography>
//                 </Breadcrumbs>
//             </div>
//         </Container>
//     )
// }

// export default Breadcrumb
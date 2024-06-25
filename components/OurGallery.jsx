"use client";
import Container from '@mui/material/Container';
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Share from "yet-another-react-lightbox/plugins/share";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";

const OurGallery = ({ galleryImages, bennerMenuMixGalleryImages }) => {
    const [open, setOpen] = useState(false);
    const combinedImages = [...(galleryImages || []), ...(bennerMenuMixGalleryImages || [])];

    const slides = combinedImages.map(image => {
        const originalImage = image.image_names[0].original || '/img/no-image.jpg';
        return {
            src: originalImage,
            alt: `image ${image.id}`,
            width: '100%',
        }
    });

    console.log(bennerMenuMixGalleryImages, "bennerMenuMixGalleryImages");

    return (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                plugins={[Thumbnails, Slideshow, Share, Fullscreen, Download, Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0 } } }}
                slides={slides}
            />
            <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
                <div className='cursor-pointer'>
                    <h2 className="text-center mx-auto vc-gallery">Our Gallery</h2>
                    <Grid container spacing={2} onClick={() => setOpen(true)}>
                        {combinedImages.map((image, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <img
                                    src={image.image_names[0].original || '/img/no-image.jpg'}
                                    alt={`image ${image.id}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    className={index === 0 ? 'occasion-top-left-radius' : index === combinedImages.length - 1 ? 'occasion-bottom-right-radius' : ''}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
        </>
    );
};

export default OurGallery;

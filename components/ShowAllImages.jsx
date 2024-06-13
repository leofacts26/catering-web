"use client"
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


const ShowAllImages = ({ galleryImages, bennerMenuMixGalleryImages }) => {
    const [open, setOpen] = useState(false);

    const combinedImages = [...(galleryImages || []), ...(bennerMenuMixGalleryImages || [])];

    const slides = combinedImages.map(image => {
        const originalImage = image.image_names[0].original || '/img/no-image.jpg';
        return {
            src: originalImage,
            alt: `image ${image.id}`,
            width: '100%',
        }
    })

    // console.log(slides, "slides");

    return (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                plugins={[Thumbnails, Slideshow, Share, Fullscreen, Download, Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0 } } }}
                slides={slides}
            />
            <Box sx={{ flexGrow: 1 }} className="mb-4 cursor-pointer" onClick={() => setOpen(true)}>
                <Grid container spacing={0.5}>
                    {slides.slice(0, 1).map((slide, index) => (
                        <Grid item xs={12} sm={12} lg={5} key={index}>
                            <img src={slide.src} alt={slide.alt} className="img-fluid vc-img-left" />
                        </Grid>
                    ))}
                    {slides.slice(1, 2).map((slide, index) => (
                        <Grid item xs={12} sm={12} lg={3.5} key={index}>
                            <img src={slide.src} alt={slide.alt} className="img-fluid vc-img-left" />
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={12} lg={3.5}>
                        <Grid container spacing={0.5}>
                            {slides.slice(2, 5).map((slide, index) => (
                                <Grid item xs={12} sm={12} lg={6} key={index}>
                                    <img src={slide.src} alt={slide.alt} className="img-fluid vc-img-right" />
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={12} lg={6}>
                                <div className="view-all-photos">
                                    <span className="view-all-dark-overlay"></span>
                                    <span className="view-show-vc">+ {Math.max(0, slides.length - 4)} Show All</span>
                                    {slides[4] && (
                                        <img src={slides[4].src} alt={slides[4].alt} className="img-fluid vc-img-right" />
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ShowAllImages
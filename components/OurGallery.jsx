"use client"
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
    })

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
                <div>
                    <h2 className="text-center mx-auto vc-gallery"> Our Gallery </h2>
                    <div className="vc-row" onClick={() => setOpen(true)}>
                        <div className="vc-column">
                            <img src="/img/occasions/03.jpg" className='occasion-top-left-radius' />
                            <img src="/img/occasions/04.jpg" />
                            <img src="/img/occasions/05.jpg" />
                            <img src="/img/occasions/06.jpg" className='occasion-bottom-left-radius' />
                        </div>
                        <div className="vc-column">
                            <img src="/img/occasions/01.jpg" />
                            <img src="/img/occasions/09.jpg" />
                            <img src="/img/occasions/02.jpg" />
                            <img src="/img/occasions/07.jpg" />
                        </div>
                        <div className="vc-column">
                            <img src="/img/occasions/03.jpg" />
                            <img src="/img/occasions/04.jpg" />
                            <img src="/img/occasions/05.jpg" />
                            <img src="/img/occasions/06.jpg" />
                        </div>
                        <div className="vc-column">
                            <img src="/img/occasions/10.jpg" className='occasion-top-right-radius' />
                            <img src="/img/occasions/09.jpg" />
                            <img src="/img/occasions/11.jpg" />
                            <img src="/img/occasions/07.jpg" className='occasion-bottom-right-radius' />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default OurGallery
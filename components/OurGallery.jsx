"use client";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
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
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"



const OurGallery = ({ galleryImages }) => {
    const [open, setOpen] = useState(false);
    const slides = galleryImages?.map(image => {
        const originalImage = image?.image_names[0].original || '/img/no-image.jpg';
        return {
            src: originalImage,
            alt: `image ${image.id}`,
            width: '100%',
        }
    });

    const [columnsCount, setColumnsCount] = useState(4); // Initial columns count

    const handleResize = () => {
        // Example logic to determine columns based on window width
        if (window.innerWidth < 600) {
            setColumnsCount(1);
        } else if (window.innerWidth < 900) {
            setColumnsCount(2);
        } else {
            setColumnsCount(4);
        }
    };

    // Attach resize event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                {/* <div className='cursor-pointer'>
                    {galleryImages?.length > 0 && <h2 className="text-center mx-auto vc-gallery">Our Gallery</h2>}
                    <Grid container spacing={2} onClick={() => setOpen(true)}>
                        {galleryImages?.map((image, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <img
                                    src={image.image_names[0].original || '/img/no-image.jpg'}
                                    alt={`image ${image.id}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    className={index === 0 ? 'occasion-top-left-radius' : index === galleryImages?.length - 1 ? 'occasion-bottom-right-radius' : ''}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div> */}
                {galleryImages?.length > 0 && <h2 className="text-center mx-auto vc-gallery">Our Gallery</h2>}
                <ResponsiveMasonry columnsCountBreakPoints={{ 600: 1, 900: 4 }}>
                    <Masonry columnsCount={columnsCount} gutter="10px">
                        {galleryImages?.map((image, index) => (
                            <div className="item cursor-pointer" key={index} onClick={() => setOpen(true)}>
                                <img
                                    src={image.image_names[0].original || '/img/no-image.jpg'}
                                    alt={`image ${image.id}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    className={index === 0 ? 'occasion-top-left-radius' : index === galleryImages?.length - 1 ? 'occasion-bottom-right-radius' : ''}
                                />
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>

            </Container>
        </>
    );
};

export default OurGallery;

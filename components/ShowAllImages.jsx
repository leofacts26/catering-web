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


const ShowAllImages = ({ galleryImages }) => {
    const [open, setOpen] = useState(false);

    console.log(galleryImages, "galleryImages");

    const firstVendorBanner = galleryImages?.["vendor-banner"]?.[0]?.image_name?.[0]?.original || '/img/Search-Result-View-Page-Images/2.webp';
    const firstVendorMenuImage = galleryImages?.["vendor-menu"]?.[0]?.image_name?.[0]?.original || '/img/Search-Result-View-Page-Images/2.webp';
    const firstVendorOther = galleryImages?.["vendor-other"]?.[0]?.image_name?.[0]?.original || '/img/Search-Result-View-Page-Images/2.webp';
    const firstVendorOtherOne = galleryImages?.["vendor-other"]?.[1]?.image_name?.[0]?.original || '/img/Search-Result-View-Page-Images/2.webp';
    const firstVendorService = galleryImages?.["vendor-service"]?.[0]?.image_name?.[0]?.original || '/img/Search-Result-View-Page-Images/2.webp';
    const firstVendorBrandLogo = galleryImages?.["vendor-brand-logo"]?.[0]?.image_name?.[0]?.original || '/img/Search-Result-View-Page-Images/2.webp';
    

    return (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                plugins={[Thumbnails, Slideshow, Share, Fullscreen, Download, Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0 } } }}
                slides={[
                    {
                        src: "/img/occasions/05.jpg",
                        alt: "image 1",
                        width: '100%',

                    },
                    {
                        src: "/img/occasions/06.jpg",
                        alt: "image 1",
                        width: '100%',

                    },
                    {
                        src: "/img/Search-Result-View-Page-Images/2.webp",
                        alt: "image 1",
                        width: '100%',
                    },
                    {
                        src: "/img/occasions/01.jpg",
                        alt: "image 1",
                        width: '100%',
                    },
                    {
                        src: "/img/Search-Result-View-Page-Images/1.png",
                        alt: "image 1",
                        width: '100%',
                    },
                ]}
            />
            <Box sx={{ flexGrow: 1 }} className="mb-4 cursor-pointer" onClick={() => setOpen(true)}>
                <Grid container spacing={0.5}>
                    <Grid item xs={12} sm={12} lg={5}>
                     <img src={firstVendorBanner} alt="" className="img-fluid vc-img-left" />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3.5}>
                         <img src={firstVendorMenuImage} alt="" className="img-fluid vc-img-left" />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3.5}>
                        <Grid container spacing={0.5} >
                            <Grid item xs={12} sm={12} lg={6}>
                                <img src={firstVendorOther} alt="" className="img-fluid vc-img-right" />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <img src={firstVendorService} alt="" className="img-fluid vc-img-right" />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <img src={firstVendorBrandLogo} alt="" className="img-fluid vc-img-right" />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <div className="view-all-photos">
                                    <span className="view-all-dark-overlay"></span>
                                    <span className="view-show-vc">+ 13 Show All</span>
                                    <img src={firstVendorOtherOne} alt="" className="img-fluid vc-img-right" />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}



export default ShowAllImages
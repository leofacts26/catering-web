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


const ShowAllImages = () => {
    const [open, setOpen] = useState(false);
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
                        height: 2560,
                       
                    },
                    {
                        src: "/img/occasions/06.jpg",
                        alt: "image 1",
                        width: '100%',
                        height: 2560,
                        
                    },
                    {
                        src: "/img/Search-Result-View-Page-Images/2.webp",
                        alt: "image 1",
                        width: '100%',
                        height: 2560,
                    },
                    {
                        src: "/img/occasions/01.jpg",
                        alt: "image 1",
                        width: '100%',
                        height: 2560,
                    },
                    {
                        src: "/img/Search-Result-View-Page-Images/1.png",
                        alt: "image 1",
                        width: '100%',
                        height: 2560,
                    },
                ]}
            />
            <Box sx={{ flexGrow: 1 }} className="mb-4 cursor-pointer" onClick={() => setOpen(true)}>
                <Grid container spacing={0.5}>
                    <Grid item xs={12} sm={12} lg={5}>
                        <img src="/img/Search-Result-View-Page-Images/1.png" alt="" className="img-fluid vc-img-left" />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3.5}>
                        <img src="/img/Search-Result-View-Page-Images/2.webp" alt="" className="img-fluid vc-img-left" />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3.5}>
                        <Grid container spacing={0.5} >
                            <Grid item xs={12} sm={12} lg={6}>
                                <img src="/img/Search-Result-View-Page-Images/1.png" alt="" className="img-fluid vc-img-right" />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <img src="/img/Search-Result-View-Page-Images/1.png" alt="" className="img-fluid vc-img-right" />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <img src="/img/Search-Result-View-Page-Images/1.png" alt="" className="img-fluid vc-img-right" />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <div className="view-all-photos">
                                    <span className="view-all-dark-overlay"></span>
                                    <span className="view-show-vc">+ 13 Show All</span>
                                    <img src="/img/Search-Result-View-Page-Images/1.png" alt="" className="img-fluid vc-img-right" />
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
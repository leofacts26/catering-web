"use client"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import faqquestions from '../data/faqquestions.json'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFaq } from '@/app/features/user/homeSlice';


const Faq = ({ tiffin }) => {
    const dispatch = useDispatch()
    const { faqs } = useSelector((state) => state.homepage);
    // console.log(faqs, "faq");



    useEffect(() => {
        dispatch(fetchFaq())
    }, [dispatch])

    return (
        <>
            <Container maxWidth="sm">
                {
                    faqs.map((faq) => (
                        <Accordion className={tiffin ? 'faq-bg-tiffin' : 'faq-bg'} key={faq?.question_id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p style={{ fontSize: '14px', fontWeight: '500' }}> {faq.question_text} </p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p style={{ fontSize: '12px' }}> {faq.answer_text} </p>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Container>
            <br />
            <br />
        </>
    )
}

export default Faq
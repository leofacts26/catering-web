import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import faqquestions from '../data/faqquestions.json'


const Faq = ({tiffin}) => {
    return (
        <>
            <Container maxWidth="sm">
                {
                    faqquestions.map((faq) => (
                        <Accordion className={tiffin ? 'faq-bg-tiffin' : 'faq-bg'}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                               <p style={{fontSize: '14px', fontWeight: '500'}}> {faq.title} </p>
                            </AccordionSummary>
                            <AccordionDetails>
                            <p style={{fontSize: '12px'}}> {faq.description} </p> 
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
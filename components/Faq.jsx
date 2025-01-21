"use client";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFaq } from "@/app/features/user/homeSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Faq = ({ tiffin }) => {
  const dispatch = useDispatch();
  const { faqs } = useSelector((state) => state.homepage);

  useEffect(() => {
    dispatch(fetchFaq());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        {faqs.map((faq) => (
          <Accordion
            key={faq?.question_id}
            className={tiffin ? "faq-bg-tiffin" : "faq-bg"}
            style={{
              marginBottom: "10px",
              marginTop: "10px",
            }}
            TransitionProps={{
              timeout: 300, // Smooth toggle animation
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} // Custom Icon for expansion
              aria-controls={`panel-content-${faq?.question_id}`}
              id={`panel-header-${faq?.question_id}`}
            >
              <p style={{ fontSize: "14px", fontWeight: "500" }}>
                {faq.question_text}
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <p style={{ fontSize: "12px" }}>{faq.answer_text}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
      <br />
      <br />
    </>
  );
};

export default Faq;
